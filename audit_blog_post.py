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
    prompt = AUDIT_BLOG_POST_PROMPT.format(blog_post=blog_post)
    response = client.chat.completions.create(
        model=OPENROUTER_MODEL,
        messages=[{"role": "system", "content": "Você é um editor especialista em SEO e clareza. REGRA OBRIGATÓRIA: Mantenha rigorosamente o mesmo idioma do texto fornecido (Português do Brasil se o texto estiver em português). NUNCA traduza o texto para inglês ou outro idioma."},
                  {"role": "user", "content": prompt}],
        max_tokens=4096
    )
    return response.choices[0].message.content


if __name__ == "__main__":
    for item in KEYWORDS_LIST:
        topic = item['topic']
        keywords = item['keywords']
        blog_post = generate_blog_post(topic, keywords)
        optimized_post = audit_blog_post(blog_post)
        print(f"Optimized Blog Post for '{topic}':")
        print(optimized_post)
        print("\n" + "="*50 + "\n")
