import os
import uuid
import json
from config import DEFAULT_LANGUAGE, WORDPRESS_URL
from generate_blog_post import generate_blog_post
from audit_blog_post import audit_blog_post
from keyword_engine import extract_long_tail_keywords, format_suggestions_for_generation
from fetch_pexels_image import get_pexels_image, download_image
from publish_wordpress import publish_to_wordpress, upload_media_to_wordpress
from publish_markdown import save_to_nextjs_blog
from keywords import KEYWORDS_LIST

def save_to_file(directory, filename, content):
    with open(os.path.join(directory, filename), 'w', encoding='utf-8') as file:
        file.write(content)

def main():
    base_directory = "blog_posts"
    temp_img_directory = "temp_images"
    
    if not os.path.exists(base_directory):
        os.makedirs(base_directory)
    if not os.path.exists(temp_img_directory):
        os.makedirs(temp_img_directory)

    # 1. Obter a lista de tópicos e palavras-chave.
    # Podemos usar uma palavra semente piloto para gerar dinamicamente, ou usar a lista estática keywords.py
    seed_keyword = os.getenv("SEED_KEYWORD", "") # Defina no ambiente ou config se desejar usar o Keyword Engine
    language = DEFAULT_LANGUAGE  # en, pt ou es

    if seed_keyword:
        print(f"=== Iniciando Keyword Engine com a semente: '{seed_keyword}' (Idioma: {language}) ===")
        raw_suggestions = extract_long_tail_keywords(seed_keyword, language=language, depth_a_to_z=False)
        # Limitamos a 3 artigos por execução do piloto para não estourar tempo/tokens de teste
        active_keywords_list = format_suggestions_for_generation(raw_suggestions, max_results=3)
    else:
        print("=== Usando a lista de palavras-chave estática do keywords.py ===")
        active_keywords_list = KEYWORDS_LIST[:2] # Limita aos 2 primeiros para teste piloto seguro

    print(f"Total de tópicos a processar: {len(active_keywords_list)}")
    print("="*60)

    for item in active_keywords_list:
        topic = item['topic']
        keywords = item['keywords']
        print(f"\n[Processando Tópico]: {topic}")
        print(f"[Keywords de Apoio]: {', '.join(keywords)}")

        # Criar diretório único para guardar o backup local dos arquivos gerados
        random_hash = uuid.uuid4().hex[:8]
        topic_directory = os.path.join(
            base_directory, f"{topic.replace(' ', '_').replace('/', '_')}_{random_hash}")
        if not os.path.exists(topic_directory):
            os.makedirs(topic_directory)

        # 2. Geração do Blog Post Original (DeepSeek V3 / Custo Baixíssimo)
        print("Gerando o texto original do blog...")
        original_post = generate_blog_post(topic, keywords, language=language)
        save_to_file(topic_directory, "original_post.txt", original_post)

        # 3. Auditoria e Otimização de SEO / Legibilidade
        print("Auditando e otimizando o post para AdSense...")
        optimized_post = audit_blog_post(original_post)
        save_to_file(topic_directory, "optimized_post.txt", optimized_post)

        # 4. Obter Imagem Temática Relacionada (Pexels / Unsplash Fallback)
        print("Buscando imagem correspondente...")
        image_url = get_pexels_image(topic)
        save_to_file(topic_directory, "image_url.txt", image_url)
        
        # Faz download da imagem localmente para subir para o WordPress
        local_img_path = os.path.join(temp_img_directory, f"{random_hash}.jpg")
        image_downloaded = download_image(image_url, local_img_path)

        # 5. Publicação no Blog Next.js (Vercel)
        print("Salvando artigo no Blog Next.js...")
        post_slug = save_to_nextjs_blog(
            title=topic,
            content=optimized_post,
            image_url=image_url,
            tags=keywords
        )
        save_to_file(topic_directory, "blog_slug.txt", post_slug)

        # 6. Publicação Automática no WordPress (Opcional se configurado)
        featured_image_id = None
        if image_downloaded:
            featured_image_id = upload_media_to_wordpress(local_img_path)
            try:
                os.remove(local_img_path)
            except Exception:
                pass

        if WORDPRESS_URL:
            print("Publicando o artigo no WordPress...")
            wp_status = "draft"
            post_link = publish_to_wordpress(
                title=topic,
                content=optimized_post,
                excerpt=f"Learn everything about {topic}.",
                status=wp_status,
                featured_image_id=featured_image_id
            )
            if post_link:
                save_to_file(topic_directory, "wp_published_link.txt", post_link)
        
        print("\n" + "="*60 + "\n")

    print("=== Processo Finalizado com Sucesso! ===")

if __name__ == "__main__":
    main()

