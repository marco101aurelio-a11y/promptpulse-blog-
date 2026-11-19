# prompts.py
"""
Templates de Geração SEO + GEO (Generative Engine Optimization) v2.0 — PromptPulse.
Baseado nas melhores práticas de agências de SEO + GEO para citação por LLMs
(ChatGPT Search, Perplexity, Claude, Google AI Overviews) e ranqueamento orgânico:
- Regra Answer-First (40 a 80 palavras diretas logo abaixo de cada H2)
- Tabelas Comparativas Markdown GFM (altíssima taxa de extração por RAGs)
- Linguagem "Idioma do Bolso" (lucro real no caixa, margem líquida e vendas)
- Bloco prático copiável (Prompt Operacional, Agent Skill ou Checklist)
- Seção FAQ estruturada (extraída automaticamente para FAQPage JSON-LD)
"""

import random

BASE_GEO_RULES = """
DIRETRIZES OBRIGATÓRIAS DE SEO + GEO (OTIMIZAÇÃO PARA GOOGLE E LLMs):
1. IDIOMA: 100% Português do Brasil (pt-BR), tom conversacional, técnico-prático e direto ao ponto (zero clichês como "no mundo acelerado de hoje").
2. TÍTULO: NÃO inclua H1 (# Título) no topo do texto (o frontmatter do Next.js já renderiza o H1).
3. REGRA ANSWER-FIRST (OURO DE GEO): Logo abaixo de cada subtítulo `##`, abra com uma resposta direta e declarativa de 40 a 75 palavras respondendo exatamente ao título da seção antes de aprofundar.
4. IDIOMA DO BOLSO: Ao tratar de finanças e retorno de anúncios, priorize termos claros que o dono de negócio entende no caixa (lucro real, margem líquida, custo por venda, verba queimada), usando termos contábeis apenas como explicação complementar quando necessário.
5. TABELAS MARKDOWN GFM: Inclua pelo menos 1 a 2 tabelas comparativas ricas (`| Coluna 1 | Coluna 2 | Coluna 3 |`) — formato #1 extraído por ChatGPT e Perplexity.
6. BLOCO PRÁTICO COPIÁVEL: Inclua 1 bloco em fenced code (```text ou ```markdown) com um Prompt Operacional, Agent Skill (`SKILL.md`) ou Checklist pronto para o leitor copiar e aplicar hoje.
7. SEÇÃO FAQ ESTRUTURADA (OBRIGATÓRIA NO FINAL ANTES DA CONCLUSÃO): Crie exatamente uma seção `## Perguntas Frequentes (FAQ)` com 3 a 4 perguntas reais em `### Pergunta completa?` seguidas de respostas objetivas de 2 a 3 linhas. Isso gera o Schema FAQPage JSON-LD automaticamente no blog.
8. PROFUNDIDADE REAL: Escreva entre 1.400 e 1.900 palavras com cenários concretos, números realistas e aplicabilidade imediata (público-alvo/ICP: {icp}).
"""

FORMAT_PROMPTS = {
    "A_GUIA_ANSWER_FIRST": """
Escreva um **Guia Definitivo no formato Answer-First** sobre: "{topic}".
Público-alvo (ICP): {icp}
Palavras-chave obrigatórias distribuídas naturalmente: {keywords}

ESTRUTURA EXATA:
- Introdução direta na dor real (sem enrolação) + um bloco de destaque (`>`) resumindo a resposta central.
- `##` Contexto real do problema e por que o método tradicional faz o empresário perder dinheiro ou tempo.
- `##` Como resolver na prática (passo a passo numerado, claro e sem código complexo, conectando IA + MCP).
- `##` Tabela Comparativa: Antes (Amador / Caixa-Preta) vs. Depois (Automação com IA + MCP).
- `##` Prompt ou Skill Operacional Pronto para Copiar (bloco de código prático).
- `##` 3 Cuidados de Governança e Segurança (Human-in-the-Loop e LGPD).
- `## Perguntas Frequentes (FAQ)` (3 a 4 perguntas em `###`).
- `## Conclusão` com próximo passo prático imediato.
""" + BASE_GEO_RULES,

    "B_COMPARATIVO_MATRICIAL": """
Escreva um **Artigo Comparativo Matricial (X vs. Y ou Melhores Ferramentas/Abordagens)** sobre: "{topic}".
Público-alvo (ICP): {icp}
Palavras-chave obrigatórias: {keywords}

ESTRUTURA EXATA:
- Introdução indo direto ao veredito rápido (para quem serve cada opção).
- `##` Tabela Comparativa Principal (critérios técnicos, custo, autonomia, integração MCP e ideal para qual porte).
- `##` Análise Aprofundada de Cada Alternativa (pontos fortes, limitações reais e quando NÃO usar).
- `##` Matriz de Decisão Prática (segunda tabela: "Se o seu cenário é X -> Escolha Y").
- `##` Prompt/Checklist de Avaliação para decidir em 5 minutos na sua empresa.
- `## Perguntas Frequentes (FAQ)` (3 a 4 perguntas em `###`).
- `## Conclusão` com recomendação prática honesta.
""" + BASE_GEO_RULES,

    "C_GLOSSARIO_TECNICO": """
Escreva um **Guia Técnico / Glossário Definitivo** explicando de forma cristalina e aplicável: "{topic}".
Público-alvo (ICP): {icp}
Palavras-chave obrigatórias: {keywords}

ESTRUTURA EXATA:
- Definição direta e citável logo no 1º parágrafo (3 linhas perfeitas para citação por Google AI Overviews e Perplexity).
- `##` Como funciona nos bastidores (fluxo técnico explicado em português simples, do clique/evento até o resultado no caixa).
- `##` Tabela de Componentes Técnicos (Termo | O que faz na prática | Erro comum ao configurar).
- `##` Passo a Passo de Implementação Segura (conectando API Oficial, CRM/Planilhas e MCP).
- `##` Exemplo Estruturado / Prompt de Auditoria Técnica (bloco de código).
- `## Perguntas Frequentes (FAQ)` (3 a 4 perguntas em `###`).
- `## Conclusão` resumindo o ganho de controle e previsibilidade.
""" + BASE_GEO_RULES,

    "D_PLAYBOOK_VERTICAL": """
Escreva um **Playbook Vertical Especializado** aplicando IA, MCP, WhatsApp e controle de lucro real ao nicho específico de: "{topic}".
Público-alvo (ICP): {icp}
Palavras-chave obrigatórias: {keywords}

ESTRUTURA EXATA:
- Abertura falando diretamente a língua e os gargalos reais do dia a dia de {icp}.
- `##` Os 3 Maiores Ralos de Dinheiro e Tempo nesse Setor Hoje.
- `##` Arquitetura Prática (Anúncios + Qualificação no WhatsApp + Controle de Lucro Real via MCP).
- `##` Tabela de Fluxos Automatizados para {icp} (Etapa | Ação da IA via MCP | Aprovação Humana | Ganho Estimado).
- `##` Prompt / Agent Skill Personalizado para {icp} (bloco de código pronto para copiar).
- `##` Roteiro de Implementação em 7 Dias (sem parar a operação).
- `## Perguntas Frequentes (FAQ)` (3 a 4 perguntas em `###`).
- `## Conclusão` com chamada prática para o gestor do setor.
""" + BASE_GEO_RULES,

    "E_PROMPTS_E_SKILLS": """
Escreva uma **Biblioteca Prática de Prompts Operacionais & Agent Skills de Negócio** sobre: "{topic}".
Público-alvo (ICP): {icp}
Palavras-chave obrigatórias: {keywords}

ESTRUTURA EXATA:
- Introdução explicando a diferença entre "prompts genéricos de internet" e **Prompts/Agent Skills estruturados com contexto e ferramentas MCP**.
- `##` Tabela Resumo dos Prompts & Skills deste Guia (Nome | Objetivo no Negócio | Ferramenta Recomendada | Tempo Economizado).
- `##` 3 a 5 Prompts / Skills Completos Prontos para Copiar (cada um em `###`, explicando quando usar, o bloco completo em ```text ou ```markdown, e qual resultado esperar).
- `##` Como Transformar Esses Prompts em Rotinas Automáticas (Claude Projects, Gemini ou MCP).
- `## Perguntas Frequentes (FAQ)` (3 a 4 perguntas em `###`).
- `## Conclusão` incentivando o leitor a testar o primeiro prompt hoje.
""" + BASE_GEO_RULES,

    "F_BENCHMARK_E_METODO": """
Escreva um **Artigo de Metodologia Proprietária / Simulação Numérica & Benchmarks** sobre: "{topic}".
Público-alvo (ICP): {icp}
Palavras-chave obrigatórias: {keywords}

ESTRUTURA EXATA:
- Introdução com uma tese contraintuitiva ou dado prático que quebra uma crença comum do mercado.
- `##` Os Números na Ponta do Lápis (Tabela de Simulação Realista / Benchmarks comparando cenário amador vs. cenário governado).
- `##` Os Pilares do Método Passo a Passo (explicação clara, escaneável e citável por LLMs).
- `##` Tabela de Indicadores de Controle (KPI | Zona de Alerta | Meta Saudável | Ação Corretiva).
- `##` Prompt de Auditoria Executiva para rodar essa análise na própria empresa (bloco de código).
- `## Perguntas Frequentes (FAQ)` (3 a 4 perguntas em `###`).
- `## Conclusão` reforçando a visão de previsibilidade e lucro real no caixa.
""" + BASE_GEO_RULES,
}

# Compatibilidade com chamadas legadas
SEO_BLOG_POST_PROMPTS = list(FORMAT_PROMPTS.values())

AUDIT_BLOG_POST_PROMPT = """
Você é um Editor Sênior de SEO e GEO (Generative Engine Optimization) do portal PromptPulse.
Revise e aprimore o artigo em Português do Brasil (pt-BR) abaixo seguindo regras estritas:

REGRAS OBRIGATÓRIAS:
1. NUNCA resuma, encurte ou corte profundidade do artigo — mantenha ou melhore a riqueza técnica e os exemplos práticos.
2. PRESERVE intactos: todas as tabelas Markdown GFM (`| ... |`), todos os blocos de código (```), todos os links internos (`/posts/...`) e a seção `## Perguntas Frequentes (FAQ)` com suas perguntas em `###`.
3. Verifique se NÃO há título H1 (`# `) no início do artigo (remova apenas se existir um H1 no topo).
4. Garanta que o texto seja 100% natural em Português do Brasil (zero traduções literais ou clichês robóticos) e que o primeiro parágrafo abaixo de cada `##` seja direto e objetivo (*Answer-First*).

ARTIGO PARA REVISÃO:
{blog_post}
---
SAÍDA OBRIGATÓRIA: Retorne estritamente o artigo revisado em Markdown (pt-BR), sem comentários antes ou depois.
"""

IMAGE_PROMPT = """
Create an ultra-detailed, cinematic 16:9 dark-mode editorial hero illustration for a technology and business automation article titled "{topic}". Modern glassmorphism, electric cyan (#38bdf8), royal indigo and warm amber highlights on dark obsidian background (#09090b). STRICT RULE: ABSOLUTELY NO TEXT, NO WORDS, NO LETTERS, NO NUMBERS, NO LOGOS.
"""


def get_seo_geo_prompt(format_type: str = None) -> str:
    """Retorna o template exato para o formato GEO (A a F) ou escolhe um padrão."""
    if format_type and format_type in FORMAT_PROMPTS:
        return FORMAT_PROMPTS[format_type]
    return FORMAT_PROMPTS["A_GUIA_ANSWER_FIRST"]


def get_random_seo_blog_post_prompt() -> str:
    return random.choice(SEO_BLOG_POST_PROMPTS)
