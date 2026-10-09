# publish_wordpress.py
import urllib.request
import urllib.parse
import json
import base64
import os
import mimetypes
from config import WORDPRESS_URL, WORDPRESS_USER, WORDPRESS_APP_PASSWORD

def get_auth_header(user, password):
    """
    Gera o cabeçalho de autorização básica codificado em Base64.
    """
    auth_str = f"{user}:{password}"
    auth_b64 = base64.b64encode(auth_str.encode('utf-8')).decode('utf-8')
    return f"Basic {auth_b64}"

def upload_media_to_wordpress(image_path):
    """
    Faz o upload de um arquivo de imagem local para a biblioteca de mídia do WordPress.
    Retorna o ID da mídia se bem-sucedido, None caso contrário.
    """
    if not WORDPRESS_URL or not WORDPRESS_USER or not WORDPRESS_APP_PASSWORD:
        print("WordPress não configurado. Pulando upload de imagem destacada...")
        return None
        
    if not os.path.exists(image_path):
        print(f"Erro: Arquivo de imagem não encontrado em '{image_path}'")
        return None

    filename = os.path.basename(image_path)
    mime_type, _ = mimetypes.guess_type(image_path)
    if not mime_type:
        mime_type = "image/jpeg"
        
    url = f"{WORDPRESS_URL.rstrip('/')}/wp-json/wp/v2/media"
    
    try:
        with open(image_path, 'rb') as f:
            image_data = f.read()
            
        headers = {
            "Authorization": get_auth_header(WORDPRESS_USER, WORDPRESS_APP_PASSWORD),
            "Content-Disposition": f'attachment; filename="{filename}"',
            "Content-Type": mime_type,
            "User-Agent": "WordPress Auto-Publisher"
        }
        
        req = urllib.request.Request(url, data=image_data, headers=headers, method="POST")
        with urllib.request.urlopen(req) as response:
            res_data = json.loads(response.read().decode('utf-8'))
            media_id = res_data.get("id")
            print(f"Imagem destacada enviada com sucesso! Media ID: {media_id}")
            return media_id
            
    except Exception as e:
        print(f"Erro ao enviar mídia para o WordPress: {e}")
        return None

def publish_to_wordpress(title, content, excerpt="", status="draft", featured_image_id=None, tags=[], categories=[]):
    """
    Publica um post no WordPress via REST API.
    Parâmetros:
      - title: Título do post
      - content: Conteúdo em HTML
      - excerpt: Resumo do post
      - status: 'draft' (rascunho) ou 'publish' (publicado imediatamente)
      - featured_image_id: ID da imagem destacada (opcional)
      - tags: Lista de IDs de tags (opcional)
      - categories: Lista de IDs de categorias (opcional)
    Retorna o link do post criado ou None.
    """
    if not WORDPRESS_URL or not WORDPRESS_USER or not WORDPRESS_APP_PASSWORD:
        print("\n=== MODO SIMULAÇÃO (Wordpress não configurado) ===")
        print(f"Título: {title}")
        print(f"Status pretendido: {status}")
        print(f"Tamanho do conteúdo: {len(content)} caracteres")
        print(f"ID da Imagem Destacada: {featured_image_id}")
        print("==================================================\n")
        return "https://seublog.com/draft-preview-simulation"
        
    url = f"{WORDPRESS_URL.rstrip('/')}/wp-json/wp/v2/posts"
    
    post_data = {
        "title": title,
        "content": content,
        "excerpt": excerpt,
        "status": status
    }
    
    if featured_image_id:
        post_data["featured_media"] = featured_image_id
        
    if tags:
        post_data["tags"] = tags
        
    if categories:
        post_data["categories"] = categories
        
    data_payload = json.dumps(post_data).encode('utf-8')
    
    headers = {
        "Authorization": get_auth_header(WORDPRESS_USER, WORDPRESS_APP_PASSWORD),
        "Content-Type": "application/json",
        "User-Agent": "WordPress Auto-Publisher"
    }
    
    req = urllib.request.Request(url, data=data_payload, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req) as response:
            res_data = json.loads(response.read().decode('utf-8'))
            post_link = res_data.get("link")
            print(f"Post publicado com sucesso! Link: {post_link}")
            return post_link
    except Exception as e:
        print(f"Erro ao publicar post no WordPress: {e}")
        return None

if __name__ == "__main__":
    # Teste rápido do publicador (em modo simulação por padrão)
    print("=== TESTE DE PUBLICAÇÃO WORDPRESS ===")
    test_title = "Melhores Práticas para Automatizar seu Blog de Tecnologia"
    test_content = """
    <h2>Introdução</h2>
    <p>Ter um fluxo automatizado economiza tempo e permite focar na estratégia.</p>
    <h2>Conclusão</h2>
    <p>O AdSense premia a consistência.</p>
    """
    publish_to_wordpress(test_title, test_content, excerpt="Como automatizar blogs de tecnologia.", status="draft")
