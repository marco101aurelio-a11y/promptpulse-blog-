# fetch_pexels_image.py
import urllib.request
import urllib.parse
import json
import os
from config import PEXELS_API_KEY

# Banco de imagens genéricas do Unsplash de alta qualidade (nicho de tecnologia/produtividade) para fallback grátis
TECH_FALLBACK_IMAGES = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&h=630&q=80",  # Laptop e café
    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&h=630&q=80",  # Workspace moderno
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&h=630&q=80",  # Código na tela
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&h=630&q=80",  # Gadgets e planejamento
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&h=630&q=80"   # Pessoas trabalhando com tecnologia
]

def get_pexels_image(query, api_key=PEXELS_API_KEY):
    """
    Busca uma imagem horizontal (landscape) no Pexels correspondente à query.
    Se a chave da API não estiver configurada ou a busca falhar, retorna um fallback de qualidade do Unsplash.
    """
    if not api_key:
        print("Aviso: PEXELS_API_KEY não configurada. Usando imagem de fallback (Unsplash)...")
        # Seleciona uma imagem de fallback com base no hash simples da query para manter consistência
        index = sum(ord(c) for c in query) % len(TECH_FALLBACK_IMAGES)
        return TECH_FALLBACK_IMAGES[index]
        
    encoded_query = urllib.parse.quote(query)
    # Busca por imagens horizontais de alta qualidade
    url = f"https://api.pexels.com/v1/search?query={encoded_query}&per_page=1&orientation=landscape"
    
    headers = {
        "Authorization": api_key,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
    }
    
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode('utf-8'))
            if data.get("photos"):
                # Retorna o link da imagem no formato "large" ou "landscape"
                photo = data["photos"][0]
                image_url = photo.get("src", {}).get("large") or photo.get("src", {}).get("original")
                if image_url:
                    print(f"Imagem encontrada no Pexels para '{query}': {image_url}")
                    return image_url
            print(f"Nenhuma imagem encontrada no Pexels para '{query}'. Usando fallback...")
    except Exception as e:
        print(f"Erro na requisição da API do Pexels: {e}. Usando fallback...")
        
    # Fallback caso dê erro na API ou a busca retorne vazia
    index = sum(ord(c) for c in query) % len(TECH_FALLBACK_IMAGES)
    return TECH_FALLBACK_IMAGES[index]

def download_image(url, save_path):
    """
    Faz o download da imagem a partir da URL e a salva no caminho especificado.
    Retorna True se bem sucedido, False caso contrário.
    """
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
    }
    req = urllib.request.Request(url, headers=headers)
    try:
        # Garante que o diretório de destino existe
        os.makedirs(os.path.dirname(save_path), exist_ok=True)
        with urllib.request.urlopen(req) as response:
            with open(save_path, 'wb') as out_file:
                out_file.write(response.read())
        print(f"Download da imagem concluído com sucesso em: {save_path}")
        return True
    except Exception as e:
        print(f"Erro ao baixar imagem da URL '{url}': {e}")
        return False

if __name__ == "__main__":
    # Teste rápido do script
    print("=== TESTE BUSCA E DOWNLOAD DE IMAGEM ===")
    test_query = "iphone macbook office workspace"
    img_url = get_pexels_image(test_query)
    print(f"URL selecionada: {img_url}")
    
    # Baixa localmente para testar
    local_path = os.path.join("temp_images", "test_image.jpg")
    download_image(img_url, local_path)
