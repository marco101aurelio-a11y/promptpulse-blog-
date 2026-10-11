# publish_markdown.py
import os
import re
import unicodedata
from datetime import datetime

def slugify(text):
    """
    Converte um título em um slug de URL limpo e amigável para SEO.
    Ex: 'Como Usar IA em 2026!' -> 'como-usar-ia-em-2026'
    """
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('utf-8')
    text = re.sub(r'[^\w\s-]', '', text).strip().lower()
    return re.sub(r'[-\s]+', '-', text)

def save_to_nextjs_blog(title, content, image_url, category="Inteligência Artificial", tags=None, author_name="Marco Aurélio"):
    """
    Salva o artigo gerado diretamente na pasta content/posts do blog Next.js.
    """
    if tags is None:
        tags = ["Inteligência Artificial", "Produtividade", "Automação", "Tecnologia"]

    # Diretório de posts do frontend Next.js
    blog_posts_dir = os.path.join(os.path.dirname(__file__), "blog-web", "content", "posts")
    if not os.path.exists(blog_posts_dir):
        os.makedirs(blog_posts_dir, exist_ok=True)

    slug = slugify(title)
    filename = f"{slug}.md"
    file_path = os.path.join(blog_posts_dir, filename)

    today = datetime.today().strftime('%Y-%m-%d')
    
    # Extrair um resumo curto dos primeiros 150 caracteres do texto
    clean_text = re.sub(r'[#*`\n]', ' ', content).strip()
    excerpt = clean_text[:160] + "..." if len(clean_text) > 160 else clean_text

    # Formatar tags para YAML
    tags_formatted = "\n".join([f'  - "{t}"' for t in tags])

    frontmatter = f"""---
title: "{title}"
date: "{today}"
excerpt: "{excerpt}"
coverImage: "{image_url}"
category: "{category}"
tags:
{tags_formatted}
author:
  name: "{author_name}"
  avatar: "/marco-aurelio.jpg"
  role: "Especialista em IA & Produtividade"
readTime: "5 min de leitura"
featured: false
---

"""
    full_post_content = frontmatter + content.strip() + "\n"

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(full_post_content)

    print(f"[OK] Artigo salvo com sucesso no Blog Next.js!")
    print(f"[Arquivo]: {file_path}")
    print(f"[Slug]: /posts/{slug}")
    return slug
