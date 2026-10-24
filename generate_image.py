import os
import requests
from config import OPENROUTER_API_KEY, OPENROUTER_MODEL, OPENAI_API_KEY
from prompts import IMAGE_PROMPT
from openai import OpenAI

# Cliente para o OpenRouter (Geração do Prompt em Inglês)
openrouter_client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_API_KEY
)

def generate_image_description(topic, keywords=None):
    kw_str = f" Keywords: {', '.join(keywords)}" if keywords else ""
    prompt = (
        f"Create an ultra-detailed, artistic, and modern prompt in English for DALL-E 3. "
        f"The image will be the hero cover for a high-traffic tech/productivity blog article titled: '{topic}'.{kw_str}\n\n"
        f"Aesthetic guidelines:\n"
        f"- Modern, futuristic workspace, elegant minimalist lighting, 3D digital illustration or sleek editorial photography.\n"
        f"- Warm glowing neon or clean daylight, subtle glassmorphism or holographic UI accents showing automation/AI connectivity.\n"
        f"- ABSOLUTELY NO TEXT, NO WORDS, NO LETTERS, NO LOGOS, NO WATERMARKS in the generated image.\n"
        f"- Output ONLY the prompt itself, nothing else."
    )
    
    response = openrouter_client.chat.completions.create(
        model=OPENROUTER_MODEL,
        messages=[
            {"role": "system", "content": "You are an elite art director specialized in generating prompt descriptions for DALL-E 3 hero images for technology blogs."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=250
    )
    return response.choices[0].message.content.strip()


def generate_dalle_image(prompt_text, dest_filename=None):
    """Gera uma imagem moderna na OpenAI e salva diretamente no blog."""
    import base64
    openai_client = OpenAI(api_key=OPENAI_API_KEY)
    
    clean_prompt = prompt_text[:950]
    clean_prompt += ", ultra high quality, clean composition, artistic lighting, no text, no words"
    
    # Modelos disponíveis na sua conta (gpt-image-2 / gpt-image-1)
    models_to_try = ["gpt-image-2", "gpt-image-1", "chatgpt-image-latest"]
    
    response = None
    last_err = None
    for model_name in models_to_try:
        try:
            print(f"Tentando gerar imagem com modelo '{model_name}'...")
            response = openai_client.images.generate(
                model=model_name,
                prompt=clean_prompt,
                n=1,
                size="1024x1024"
            )
            break
        except Exception as err:
            last_err = err
            print(f"Aviso: Modelo {model_name} indisponível ({err}). Tentando próximo...")

    if not response or not response.data:
        raise Exception(f"Não foi possível gerar imagem na OpenAI: {last_err}")

    item = response.data[0]
    
    # Salvar a imagem no blog
    blog_public_covers = os.path.join(os.path.dirname(__file__), "blog-web", "public", "covers")
    os.makedirs(blog_public_covers, exist_ok=True)
    
    if not dest_filename:
        import uuid
        dest_filename = f"ai_cover_{uuid.uuid4().hex[:8]}.png"
        
    dest_path = os.path.join(blog_public_covers, dest_filename)

    # Caso a API retorne em base64 (padrão dos novos modelos gpt-image-2)
    if hasattr(item, "b64_json") and item.b64_json:
        img_bytes = base64.b64decode(item.b64_json)
        with open(dest_path, "wb") as f:
            f.write(img_bytes)
        return f"/covers/{dest_filename}"
    
    # Caso retorne URL
    if hasattr(item, "url") and item.url:
        resp = requests.get(item.url, timeout=30)
        if resp.status_code == 200:
            with open(dest_path, "wb") as f:
                f.write(resp.content)
            return f"/covers/{dest_filename}"
            
    return f"/covers/{dest_filename}"


def save_ai_image_locally(image_url, dest_filename):
    """Baixa a imagem gerada e salva na pasta pública do blog para persistência permanente"""
    blog_public_covers = os.path.join(os.path.dirname(__file__), "blog-web", "public", "covers")
    os.makedirs(blog_public_covers, exist_ok=True)
    
    dest_path = os.path.join(blog_public_covers, dest_filename)
    resp = requests.get(image_url, timeout=30)
    if resp.status_code == 200:
        with open(dest_path, "wb") as f:
            f.write(resp.content)
        # Retorna o caminho relativo que o Next.js serve direto
        return f"/covers/{dest_filename}"
    return image_url


if __name__ == "__main__":
    test_topic = "Como Usar o Google Gemini para Automatizar Tarefas, Google Keep e Agenda em 2026"
    print(f"Testando geração de descrição para: {test_topic}")
    desc = generate_image_description(test_topic)
    print("\nPrompt gerado:\n", desc)
    print("\nChamando DALL-E 3 na OpenAI...")
    url = generate_dalle_image(desc)
    print("\nURL da imagem gerada pelo DALL-E 3:\n", url)

