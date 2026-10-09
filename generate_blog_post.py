# generate_blog_post.py
from config import OPENROUTER_API_KEY, OPENROUTER_MODEL, DEFAULT_LANGUAGE
from prompts import get_random_seo_blog_post_prompt
from keywords import KEYWORDS_LIST
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

def generate_blog_post(topic, keywords, language=DEFAULT_LANGUAGE):
    prompt_template = get_random_seo_blog_post_prompt()
    prompt = prompt_template.format(topic=topic, keywords=", ".join(keywords))
    
    lang_name = LANG_MAP.get(language, "English")
    
    response = client.chat.completions.create(
        model=OPENROUTER_MODEL,
        messages=[
            {"role": "system", "content": f"You are a professional blog writer. You must write the entire blog post in {lang_name} using an engaging, persuasive and conversational tone suitable for high CTR (Click-Through Rate). Avoid generic corporate introductions and conclusions."},
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

