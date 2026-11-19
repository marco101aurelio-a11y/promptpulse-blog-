# auto_topic_planner.py
"""
Módulo de Auto-Pauta Infinita (SEO + GEO) para o PromptPulse.
Quando a fila estática do keywords.py termina, este módulo:
1. Lê todos os posts já publicados para evitar 100% qualquer canibalização.
2. Opcionalmente consulta o Google Search Console (termos emergentes reais).
3. Rotaciona os 6 formatos GEO (A a F), as verticais Hub & Spoke (Empresários, Agências,
   Clínicas, Contadores) e a proporção 80% Nacional / 20% Campo Grande - MS.
4. Gera 1 tema inédito pronto em JSON (com seo_title <= 60 chars e Idioma do Bolso).
"""

import json
import re
from openai import OpenAI
from config import OPENROUTER_API_KEY, OPENROUTER_MODEL
from internal_linking import get_existing_posts

FORMATS_ROTATION = [
    "A_GUIA_ANSWER_FIRST",
    "C_GLOSSARIO_TECNICO",
    "D_PLAYBOOK_VERTICAL",
    "E_PROMPTS_E_SKILLS",
    "F_BENCHMARK_E_METODO",
    "B_COMPARATIVO_MATRICIAL",
]

ICPS_ROTATION = [
    "Pequenos e Médios Empresários (Brasil)",
    "Donos de Agência de Tráfego e Gestores de Mídia",
    "Médicos, Dentistas e Donos de Clínicas",
    "Contadores e Escritórios Contábeis",
    "Empresários e Gestores — Campo Grande MS",
]


def _get_gsc_signals():
    try:
        import google_growth_suite as suite
        res = suite.gsc_query_search_analytics(days=28, dimensions=["query"], row_limit=15)
        if res.get("success") and res.get("rows"):
            return [r["keys"][0] for r in res["rows"] if r.get("keys")]
    except Exception:
        pass
    return []


def generate_next_autonomous_topic(existing_slugs: set):
    """Cria automaticamente a próxima pauta inédita de alto valor SEO + GEO."""
    existing_posts = get_existing_posts()
    existing_titles = [p["title"] for p in existing_posts]
    total_count = len(existing_slugs)

    target_format = FORMATS_ROTATION[total_count % len(FORMATS_ROTATION)]
    target_icp = ICPS_ROTATION[total_count % len(ICPS_ROTATION)]
    target_category = (
        "Prompts & Agent Skills"
        if target_format == "E_PROMPTS_E_SKILLS"
        else "IA para Empresas & Negócios"
    )

    gsc_queries = _get_gsc_signals()
    gsc_block = (
        f"\nTermos que já estão gerando impressões reais no Google Search Console do site: {', '.join(gsc_queries)}\n"
        if gsc_queries
        else ""
    )

    client = OpenAI(base_url="https://openrouter.ai/api/v1", api_key=OPENROUTER_API_KEY)
    prompt = f"""
Você é o Diretor de SEO e GEO (Generative Engine Optimization) do portal PromptPulse (promptpulse.com.br).
Crie EXATAMENTE 1 pauta inédita de artigo em Português do Brasil (pt-BR) seguindo estas regras rígidas:

1. HUB CENTRAL OBRIGATÓRIO: IA aplicada a negócios + MCP (Model Context Protocol) + Prompts & Agent Skills + Meta Ads/Google Ads + WhatsApp comercial + Lucro Real no Caixa (Idioma do Bolso — EVITE a sigla "DRE" no título para não parecer aula de contabilidade).
2. FORMATO DESTE ARTIGO: {target_format}
3. PÚBLICO-ALVO (ICP) DESTE ARTIGO: {target_icp}
4. CATEGORIA: {target_category}
5. TAMANHO DO TÍTULO (`topic`): Entre 55 e 85 caracteres (claro, específico, sem canibalizar os existentes).
6. TAMANHO DO `seo_title`: ESTRITAMENTE até 58 caracteres (ideal para não cortar no Google).
7. NÃO REPETIR NENHUM TEMA JÁ PUBLICADO ABAIXO:
{chr(10).join('- ' + t for t in existing_titles)}
{gsc_block}
Retorne APENAS um JSON válido neste formato exato (sem markdown, sem comentários):
{{
  "topic": "Título completo em português",
  "seo_title": "Título SEO curto até 58 chars",
  "format": "{target_format}",
  "icp": "{target_icp}",
  "category": "{target_category}",
  "keywords": ["kw 1", "kw 2", "kw 3", "kw 4", "kw 5"]
}}
"""

    resp = client.chat.completions.create(
        model=OPENROUTER_MODEL,
        messages=[
            {"role": "system", "content": "Responda exclusivamente com JSON válido em UTF-8."},
            {"role": "user", "content": prompt},
        ],
        max_tokens=500,
    )
    raw = resp.choices[0].message.content.strip()
    raw = re.sub(r'^```(?:json)?\s*|\s*```$', '', raw, flags=re.MULTILINE).strip()
    data = json.loads(raw)

    # Garantir seo_title <= 60 chars
    if len(data.get("seo_title", "")) > 60:
        data["seo_title"] = data["seo_title"][:57].rsplit(" ", 1)[0]
    return data
