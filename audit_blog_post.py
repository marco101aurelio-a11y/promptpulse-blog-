# audit_blog_post.py
from config import OPENROUTER_API_KEY, OPENROUTER_MODEL
from prompts import AUDIT_BLOG_POST_PROMPT
from keywords import KEYWORDS_LIST
from generate_blog_post import generate_blog_post
from openai import OpenAI

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_API_KEY
)


def audit_blog_post(blog_post):
    """
    Revisa qualidade editorial, clareza Answer-First e formatação SEO/GEO
    sem jamais resumir ou cortar tabelas, prompts e FAQs do artigo original.
    """
    prompt = AUDIT_BLOG_POST_PROMPT.format(blog_post=blog_post)
    response = client.chat.completions.create(
        model=OPENROUTER_MODEL,
        messages=[
            {
                "role": "system",
                "content": (
                    "Você é um editor sênior de SEO e GEO em Português do Brasil. "
                    "REGRAS INEGOCIÁVEIS: (1) Nunca traduza o texto; (2) Nunca encurte ou resuma o artigo; "
                    "(3) Preserve todas as tabelas Markdown, blocos de código, links internos (/posts/...) e a seção FAQ."
                ),
            },
            {"role": "user", "content": prompt},
        ],
        max_tokens=4096,
    )
    audited = response.choices[0].message.content
    # Trava de segurança: se o revisor acidentalmente encurtar mais de 25% do texto, mantém o original
    if len(audited.strip()) < len(blog_post.strip()) * 0.75:
        print("[AVISO Auditoria] Texto revisado ficou curto demais; preservando o original completo.")
        return blog_post
    return audited


if __name__ == "__main__":
    for item in KEYWORDS_LIST[:1]:
        topic = item['topic']
        keywords = item['keywords']
        blog_post = generate_blog_post(topic, keywords)
        optimized_post = audit_blog_post(blog_post)
        print(f"Optimized Blog Post for '{topic}': {len(optimized_post)} chars")
