# fetch_pexels_image.py
import urllib.request
import urllib.parse
import json
import os
import glob
import re
from config import PEXELS_API_KEY

TECH_FALLBACK_IMAGES = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&h=630&q=80",  # Laptop e cafe
    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&h=630&q=80",  # Workspace moderno
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&h=630&q=80",  # Codigo na tela
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&h=630&q=80",  # Gadgets e planejamento
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&h=630&q=80",  # Pessoas trabalhando com tecnologia
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=630&q=80"   # Arte abstrata digital
]

def get_used_images():
    """
    Escaneia todos os posts existentes no blog e retorna um conjunto
    com as URLs e IDs de imagens ja utilizadas, evitando repeticoes.
    """
    posts_dir = os.path.join(os.path.dirname(__file__), "blog-web", "content", "posts")
    used = set()
    if not os.path.exists(posts_dir):
        return used
        
    for md_file in glob.glob(os.path.join(posts_dir, "*.md")):
        try:
            with open(md_file, "r", encoding="utf-8") as f:
                content = f.read()
            match = re.search(r'coverImage:\s*["\']([^"\']+)["\']', content)
            if match:
                url = match.group(1).strip()
                used.add(url)
                # Extrair ID do Pexels se presente (ex: /photos/30869081/)
                id_match = re.search(r'/photos/(\d+)/', url)
                if id_match:
                    used.add(id_match.group(1))
        except Exception:
            pass
    return used

def get_search_terms_for_topic(query, keywords=None):
    """
    Gera termos de busca variados em ingles para garantir fotos relevantes e unicas no Pexels.
    """
    terms = []
    q_lower = query.lower()
    
    # Categorizacao inteligente por intencao
    if "tarefas" in q_lower or "tasks" in q_lower or "conversa" in q_lower or "automacao" in q_lower:
        terms.extend(["automation workflow technology", "digital robot software cloud", "smart software system"])
    elif "keep" in q_lower or "segundo cérebro" in q_lower or "segundo cerebro" in q_lower or "notas" in q_lower:
        terms.extend(["digital notes computer desk", "workspace sticky notes laptop", "mind mapping productivity"])
    elif "planilha" in q_lower or "excel" in q_lower or "sheets" in q_lower or "dados" in q_lower:
        terms.extend(["data analysis dashboard computer", "financial spreadsheet laptop", "business charts analytics"])
    elif "agenda" in q_lower or "calendário" in q_lower or "calendario" in q_lower or "tempo" in q_lower:
        terms.extend(["calendar scheduling clock office", "weekly planner computer", "time management workspace"])
    elif "gemini" in q_lower or "ia" in q_lower or "inteligência artificial" in q_lower:
        terms.extend(["artificial intelligence laptop desk", "future technology work computer", "neural network digital"])
        
    # Adicionar termos baseados em keywords
    if keywords:
        for kw in keywords[:3]:
            cleaned_kw = re.sub(r'[^a-zA-Z0-9\s]', '', kw)
            if len(cleaned_kw) > 3:
                terms.append(f"{cleaned_kw} workspace")
                
    # Termos coringa de alta qualidade
    terms.extend([
        "modern office computer desk",
        "creative workspace technology",
        "minimalist productivity desk",
        "laptop analytics dashboard"
    ])
    
    return terms

def get_pexels_image(query, keywords=None, api_key=PEXELS_API_KEY):
    """
    Busca uma imagem horizontal no Pexels garantindo 100% de exclusividade (sem repeticao).
    """
    used_images = get_used_images()
    
    if not api_key:
        print("Aviso: PEXELS_API_KEY nao configurada. Usando fallback...")
        for fb in TECH_FALLBACK_IMAGES:
            if fb not in used_images:
                return fb
        return TECH_FALLBACK_IMAGES[0]

    search_terms = get_search_terms_for_topic(query, keywords)
    headers = {
        "Authorization": api_key,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
    }

    for term in search_terms:
        try:
            encoded_term = urllib.parse.quote(term)
            url = f"https://api.pexels.com/v1/search?query={encoded_term}&per_page=15&orientation=landscape"
            req = urllib.request.Request(url, headers=headers)
            
            with urllib.request.urlopen(req, timeout=8) as response:
                data = json.loads(response.read().decode('utf-8'))
                photos = data.get("photos", [])
                
                for photo in photos:
                    photo_id = str(photo.get("id", ""))
                    photo_url = photo.get("src", {}).get("large") or photo.get("src", {}).get("original")
                    
                    # Checagem de unicidade: foto NUNCA pode ter sido usada em posts anteriores
                    if photo_url and photo_url not in used_images and photo_id not in used_images:
                        print(f"Foto unica selecionada no Pexels (termo '{term}'): ID {photo_id}")
                        return photo_url
        except Exception as e:
            print(f"[Pexels Warning] Erro ao buscar termo '{term}': {e}")
            continue

    # Fallback caso todas as buscas falhem ou todas estejam repetidas
    print("Buscando imagem nao utilizada no banco de fallback...")
    for fb in TECH_FALLBACK_IMAGES:
        if fb not in used_images:
            return fb

    return TECH_FALLBACK_IMAGES[0]

def download_image(url, save_path):
    """
    Faz o download da imagem a partir da URL e a salva no caminho especificado.
    """
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
    }
    req = urllib.request.Request(url, headers=headers)
    try:
        os.makedirs(os.path.dirname(save_path), exist_ok=True)
        with urllib.request.urlopen(req, timeout=10) as response:
            with open(save_path, 'wb') as out_file:
                out_file.write(response.read())
        print(f"Download da imagem concluido com sucesso em: {save_path}")
        return True
    except Exception as e:
        print(f"Erro ao baixar imagem da URL '{url}': {e}")
        return False

if __name__ == "__main__":
    used = get_used_images()
    print(f"Total de imagens ja utilizadas no blog: {len(used)}")
    test_img = get_pexels_image("Do Google Keep ao Drive com Spark", keywords=["automacao", "spark"])
    print(f"Nova imagem inedita: {test_img}")
