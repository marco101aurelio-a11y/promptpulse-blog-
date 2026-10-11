# internal_linking.py
import os
import glob
import re

def get_existing_posts(posts_dir=None):
    """
    Varre a pasta de posts do Next.js e retorna uma lista de artigos existentes
    com título e URL relativa (/posts/slug) para link building interno.
    """
    if posts_dir is None:
        posts_dir = os.path.join(os.path.dirname(__file__), "blog-web", "content", "posts")
        
    posts = []
    if not os.path.exists(posts_dir):
        return posts
        
    for md_file in glob.glob(os.path.join(posts_dir, "*.md")):
        slug = os.path.splitext(os.path.basename(md_file))[0]
        try:
            with open(md_file, "r", encoding="utf-8") as f:
                content = f.read()
                
            # Extrair título do frontmatter
            title_match = re.search(r'^title:\s*["\']?(.*?)["\']?$', content, re.MULTILINE)
            title = title_match.group(1).strip() if title_match else slug.replace("-", " ").title()
            
            posts.append({
                "slug": slug,
                "title": title,
                "url": f"/posts/{slug}"
            })
        except Exception as e:
            print(f"[Aviso Linkagem Interna] Erro ao ler {md_file}: {e}")
            
    return posts

def build_internal_linking_instructions(existing_posts, current_topic=""):
    """
    Gera instruções personalizadas para o prompt da IA inserir links internos contextuais.
    """
    # Filtrar posts relevantes, excluindo eventual post com o mesmo slug/tema
    candidates = [p for p in existing_posts if p["title"].lower() not in current_topic.lower()]
    
    if not candidates:
        return ""
        
    posts_list_text = "\n".join([f'- Artigo: "{p["title"]}" | Link: {p["url"]}' for p in candidates[:8]])
    
    return f"""
---
DIRETRIZ DE SEO (LINK BUILDING INTERNO & TOPIC CLUSTER):
Para fortalecer a autoridade do blog no Googlebot e criar uma teia de links internos, você DEVE inserir de 1 a 2 links contextuais no meio do artigo (no formato markdown `[texto âncora natural](/posts/slug)`).

Aqui estão os artigos já publicados no blog que você pode citar quando fizer sentido:
{posts_list_text}

Regras para os links:
1. O texto âncora deve ser fluido e natural (Ex: "...como explicamos em nosso [comparativo entre DeepSeek e ChatGPT](/posts/deepseek-v3-vs-chatgpt-comparativo)...").
2. Não crie uma lista de links no final; integre-os diretamente no corpo dos parágrafos onde o assunto for relevante.
---
"""

if __name__ == "__main__":
    posts = get_existing_posts()
    print(f"Posts encontrados para linkagem: {len(posts)}")
    for p in posts:
        print(f"- {p['title']} ({p['url']})")
    print(build_internal_linking_instructions(posts, "Novo Artigo"))
