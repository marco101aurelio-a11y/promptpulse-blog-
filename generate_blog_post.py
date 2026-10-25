# generate_blog_post.py
from config import OPENROUTER_API_KEY, OPENROUTER_MODEL, DEFAULT_LANGUAGE
from prompts import get_random_seo_blog_post_prompt
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

def generate_blog_post(topic, keywords, language=DEFAULT_LANGUAGE, enable_internal_linking=True):
    prompt_template = get_random_seo_blog_post_prompt()
    prompt = prompt_template.format(topic=topic, keywords=", ".join(keywords))
    
    if enable_internal_linking:
        existing_posts = get_existing_posts()
        linking_instructions = build_internal_linking_instructions(existing_posts, current_topic=topic)
        if linking_instructions:
            prompt += f"\n{linking_instructions}"
            
    lang_name = LANG_MAP.get(language, "English")
    
    system_prompt = (
        f"Você é Marco Aurélio, especialista prático em produtividade e inteligência artificial do blog PromptPulse. "
        f"Seu tom é conversacional, direto ao ponto, empolgante, inovador e focado em alta aplicabilidade empresarial (evite introduções genéricas ou clichês corporativos). "
        f"DIRETRIZ EDITORIAL PRINCIPAL: Explore a fundo a integração do ecossistema Google (Keep, Tarefas, Calendário, Drive, Docs e Planilhas com Gemini) "
        f"e a grande revolução do momento: o MCP (Model Context Protocol). Explique com clareza didática e visão estratégica como o MCP permite que a IA "
        f"ultrapasse as barreiras do Google e controle em tempo real ferramentas externas (bancos de dados, sistemas de gestão ERP, WhatsApp, CRMs, Notion, GitHub, ferramentas locais), "
        f"transformando a IA de um simples gerador de texto em um verdadeiro operador autônomo de negócios. "
        f"Traga o impacto disso tanto no cenário nacional quanto regional (como o ecossistema de empresas e agronegócio em Campo Grande - MS), mostrando "
        f"como pequenos e médios empresários podem ter superpoderes operacionais. "
        f"Escreva em {lang_name} com formatação rica em Markdown (H2, H3, bullet points e destaques em negrito)."
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
    for item in KEYWORDS_LIST[:1]:  # Apenas o primeiro para teste
        topic = item['topic']
        keywords = item['keywords']
        blog_post = generate_blog_post(topic, keywords, language="en")
        print(f"Generated Blog Post for '{topic}' (EN):")
        print(blog_post)
        print("\n" + "="*50 + "\n")

