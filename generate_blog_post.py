# generate_blog_post.py
from config import OPENROUTER_API_KEY, OPENROUTER_MODEL, DEFAULT_LANGUAGE
from prompts import get_seo_geo_prompt
from keywords import KEYWORDS_LIST
from internal_linking import get_existing_posts, build_internal_linking_instructions
from openai import OpenAI

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_API_KEY
)

LANG_MAP = {
    "en": "English",
    "pt": "Portuguese (Brazil)",
    "es": "Spanish"
}


def generate_blog_post(
    topic,
    keywords,
    language=DEFAULT_LANGUAGE,
    enable_internal_linking=True,
    format_type="A_GUIA_ANSWER_FIRST",
    icp="Pequenos e Médios Empresários (Brasil)",
):
    prompt_template = get_seo_geo_prompt(format_type)
    prompt = prompt_template.format(
        topic=topic,
        keywords=", ".join(keywords),
        icp=icp,
    )

    if enable_internal_linking:
        existing_posts = get_existing_posts()
        linking_instructions = build_internal_linking_instructions(existing_posts, current_topic=topic)
        if linking_instructions:
            prompt += f"\n{linking_instructions}"

    lang_name = LANG_MAP.get(language, "Portuguese (Brazil)")

    system_prompt = (
        f"Você é Marco Aurélio, fundador do portal PromptPulse e especialista prático em Inteligência Artificial aplicada a negócios, "
        f"MCP (Model Context Protocol), Engenharia de Prompts & Agent Skills, Automação Comercial no WhatsApp e Performance/Lucro Real em Anúncios. "
        f"Seu tom é conversacional, direto, analítico e sem clichês de marketing ('no mundo atual', 'nos dias de hoje'). "
        f"LINHA EDITORIAL OFICIAL DO PROMPTPULSE (HUB & SPOKE): "
        f"1. O eixo central (Hub) de todo conteúdo é conectar IA (Claude, Google Gemini) + Prompts/Skills + MCP a sistemas reais da empresa "
        f"(Meta Ads, Google Ads, WhatsApp API Oficial, Google Workspace, CRMs e controle de caixa) para gerar autonomia e lucro líquido real. "
        f"2. Adapte os exemplos práticos ao público-alvo ({icp}) usando o 'Idioma do Bolso' (lucro real no caixa, margem líquida, custo por venda, "
        f"tempo economizado), evitando jargão contábil pesado que possa confundir o leitor. "
        f"3. Estruture o texto para SEO e GEO (citação por ChatGPT, Perplexity, Claude e Google AI Overviews): respostas diretas de 40-75 palavras "
        f"logo abaixo de cada H2, tabelas Markdown GFM ricas, blocos copiáveis de Prompts/Skills e seção FAQ estruturada no final. "
        f"Escreva 100% em {lang_name}."
    )

    response = client.chat.completions.create(
        model=OPENROUTER_MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
        ],
        max_tokens=4096
    )
    return response.choices[0].message.content


if __name__ == "__main__":
    for item in KEYWORDS_LIST[:1]:
        topic = item['topic']
        keywords = item['keywords']
        blog_post = generate_blog_post(
            topic,
            keywords,
            language="pt",
            format_type=item.get("format", "A_GUIA_ANSWER_FIRST"),
            icp=item.get("icp", "Pequenos e Médios Empresários (Brasil)"),
        )
        print(f"Generated Blog Post for '{topic}':")
        print(blog_post[:1000])
