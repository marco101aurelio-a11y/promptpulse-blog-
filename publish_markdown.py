# publish_markdown.py
import os
import re
import glob
import math
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


def build_seo_title(title: str, seo_title: str = None) -> str:
    """Garante um título SEO de até 60 caracteres para não truncar na SERP do Google."""
    if seo_title and len(seo_title.strip()) <= 62:
        return seo_title.strip()
    clean = title.strip()
    if len(clean) <= 60:
        return clean
    truncated = clean[:57].rsplit(" ", 1)[0].rstrip(" :,-")
    return f"{truncated}..."


def extract_faq_from_markdown(markdown_text: str):
    """
    Extrai automaticamente pares de Pergunta (### ...) e Resposta da seção
    '## Perguntas Frequentes' para popular o campo `faq:` no frontmatter (FAQPage JSON-LD).
    """
    faq_section_match = re.search(
        r'^##\s+Perguntas Frequentes[^\n]*\n(.*?)(?=^##\s+|\Z)',
        markdown_text,
        flags=re.MULTILINE | re.DOTALL | re.IGNORECASE,
    )
    if not faq_section_match:
        return []

    section_body = faq_section_match.group(1)
    q_blocks = re.split(r'^###\s+', section_body, flags=re.MULTILINE)
    faqs = []
    for block in q_blocks[1:]:
        lines = block.strip().splitlines()
        if not lines:
            continue
        question = re.sub(r'[*_`#]', '', lines[0]).strip()
        answer_raw = " ".join(l.strip() for l in lines[1:] if l.strip() and not l.strip().startswith("---"))
        answer = re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', answer_raw)
        answer = re.sub(r'[*_`]', '', answer)
        answer = re.sub(r'\s+', ' ', answer).strip()
        if question and answer:
            faqs.append({"question": question, "answer": answer})
    return faqs[:6]


def _yaml_escape(text: str) -> str:
    return text.replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ').strip()


def sync_llms_full_txt():
    """Mantém o índice de URLs canônicas em blog-web/public/llms-full.txt sincronizado com os posts."""
    base_dir = os.path.dirname(__file__)
    posts_dir = os.path.join(base_dir, "blog-web", "content", "posts")
    llms_full_path = os.path.join(base_dir, "blog-web", "public", "llms-full.txt")

    if not os.path.exists(posts_dir) or not os.path.exists(llms_full_path):
        return

    posts_meta = []
    for md_path in glob.glob(os.path.join(posts_dir, "*.md")):
        slug = os.path.splitext(os.path.basename(md_path))[0]
        try:
            with open(md_path, "r", encoding="utf-8") as f:
                head = f.read(600)
            date_m = re.search(r'^date:\s*["\']?([^"\'\n]+)', head, re.MULTILINE)
            date_str = date_m.group(1).strip() if date_m else "2026-10-08"
            posts_meta.append((date_str, slug))
        except Exception:
            posts_meta.append(("2026-10-08", slug))

    posts_meta.sort(key=lambda x: (x[0], x[1]), reverse=True)
    url_lines = "\n".join(
        f"{idx}. https://www.promptpulse.com.br/posts/{slug}"
        for idx, (_, slug) in enumerate(posts_meta, 1)
    )

    with open(llms_full_path, "r", encoding="utf-8") as f:
        current = f.read()

    new_section = f"## Índice Completo de Guias Publicados (URLs Canônicas)\n{url_lines}\n\n## Contato"
    updated = re.sub(
        r'## Índice Completo de Guias Publicados \(URLs Canônicas\).*?## Contato',
        new_section,
        current,
        flags=re.DOTALL,
    )
    if updated != current:
        with open(llms_full_path, "w", encoding="utf-8") as f:
            f.write(updated)
        print(f"[OK] llms-full.txt atualizado com {len(posts_meta)} URLs canônicas.")


def save_to_nextjs_blog(
    title,
    content,
    image_url,
    category="IA para Empresas & Negócios",
    tags=None,
    author_name="Marco Aurélio",
    seo_title=None,
    faq_items=None,
    featured=True,
):
    """
    Salva o artigo gerado diretamente na pasta content/posts do blog Next.js
    com seoTitle (<= 60c), readTime dinâmico, FAQPage frontmatter e sincronização de llms-full.txt.
    """
    if tags is None:
        tags = ["Inteligência Artificial", "MCP", "Produtividade", "Automação"]

    blog_posts_dir = os.path.join(os.path.dirname(__file__), "blog-web", "content", "posts")
    if not os.path.exists(blog_posts_dir):
        os.makedirs(blog_posts_dir, exist_ok=True)

    slug = slugify(title)
    filename = f"{slug}.md"
    file_path = os.path.join(blog_posts_dir, filename)

    today = datetime.today().strftime('%Y-%m-%d')

    # Remover eventual título repetido no início (# Título)
    content_clean = re.sub(r'^\s*#\s+[^\n]+\n+', '', content.strip())

    # Extrair resumo limpo (até 160 chars)
    clean_text = re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', content_clean)
    clean_text = re.sub(r'[#*`>_\n|]', ' ', clean_text)
    clean_text = re.sub(r'\s+', ' ', clean_text).strip()
    excerpt = clean_text[:157].rsplit(" ", 1)[0] + "..." if len(clean_text) > 160 else clean_text

    # Calcular tempo de leitura real (~190 palavras/min)
    word_count = len(clean_text.split())
    read_minutes = max(4, math.ceil(word_count / 190))
    read_time = f"{read_minutes} min de leitura"

    final_seo_title = build_seo_title(title, seo_title)
    tags_formatted = "\n".join([f'  - "{_yaml_escape(t)}"' for t in tags])

    # Extrair FAQs automaticamente se não forem passadas explicitamente
    extracted_faqs = faq_items if faq_items is not None else extract_faq_from_markdown(content_clean)
    faq_yaml = ""
    if extracted_faqs:
        faq_lines = ["faq:"]
        for item in extracted_faqs:
            faq_lines.append(f'  - question: "{_yaml_escape(item["question"])}"')
            faq_lines.append(f'    answer: "{_yaml_escape(item["answer"])}"')
        faq_yaml = "\n" + "\n".join(faq_lines)

    featured_str = "true" if featured else "false"

    frontmatter = f"""---
title: "{_yaml_escape(title)}"
seoTitle: "{_yaml_escape(final_seo_title)}"
date: "{today}"
excerpt: "{_yaml_escape(excerpt)}"
coverImage: "{image_url}"
category: "{_yaml_escape(category)}"
tags:
{tags_formatted}
author:
  name: "{_yaml_escape(author_name)}"
  avatar: "/marco-aurelio.jpg"
  role: "Especialista em IA & Produtividade"
readTime: "{read_time}"
featured: {featured_str}{faq_yaml}
---

"""
    full_post_content = frontmatter + content_clean.strip() + "\n"

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(full_post_content)

    sync_llms_full_txt()

    print(f"[OK] Artigo salvo com sucesso no Blog Next.js (SEO + GEO v2.0)!")
    print(f"[Arquivo]: {file_path}")
    print(f"[SEO Title ({len(final_seo_title)}c)]: {final_seo_title}")
    print(f"[FAQs JSON-LD extraídas]: {len(extracted_faqs)}")
    print(f"[Slug]: /posts/{slug}")
    return slug
