# keyword_engine.py
import urllib.request
import urllib.parse
import json
import string
import time

def get_google_suggestions(query, language="pt-BR"):
    """
    Busca sugestões do Google Autocomplete para uma determinada query e idioma.
    Retorna uma lista de strings recomendadas.
    """
    encoded_query = urllib.parse.quote(query)
    # hl define o idioma (ex: pt-BR, en, es)
    url = f"https://suggestqueries.google.com/complete/search?client=chrome&q={encoded_query}&hl={language}"
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
    }
    
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode('utf-8'))
            # A estrutura retornada é: [query_original, [sugestoes], [metadados], ...]
            if len(data) > 1:
                return data[1]
    except Exception as e:
        print(f"Erro ao buscar autocomplete para '{query}': {e}")
    return []

def extract_long_tail_keywords(seed_keyword, language="pt-BR", depth_a_to_z=False):
    """
    Extrai termos de cauda longa a partir de uma palavra-chave semente.
    Se depth_a_to_z for True, busca a palavra semente + cada letra do alfabeto (a-z).
    """
    suggestions = set()
    
    # 1. Busca as sugestões da palavra-chave semente pura
    print(f"Buscando sugestões principais para: '{seed_keyword}'...")
    main_sug = get_google_suggestions(seed_keyword, language)
    for sug in main_sug:
        suggestions.add(sug.lower().strip())
        
    # 2. Busca combinando a palavra-chave semente com letras de A a Z
    if depth_a_to_z:
        print(f"Iniciando busca aprofundada (A a Z) para: '{seed_keyword}'...")
        for letter in string.ascii_lowercase:
            search_query = f"{seed_keyword} {letter}"
            letter_sug = get_google_suggestions(search_query, language)
            for sug in letter_sug:
                # Filtrar sugestões para garantir que contêm a semente principal para manter a relevância
                if seed_keyword.lower() in sug.lower():
                    suggestions.add(sug.lower().strip())
            time.sleep(0.2) # Pausa amigável para evitar rate-limiting
            
    # Retorna uma lista ordenada e única
    return sorted(list(suggestions))

def format_suggestions_for_generation(suggestions, max_results=10):
    """
    Formata as sugestões obtidas na estrutura necessária para a lista de palavras-chave do gerador:
    [{'topic': '...', 'keywords': [...]}, ...]
    """
    formatted_list = []
    for sug in suggestions[:max_results]:
        # Para cada sugestão principal, geramos palavras-chave secundárias
        # buscando no autocomplete novamente o termo secundário completo
        print(f"Obtendo palavras-chave de apoio para: '{sug}'...")
        sec_suggestions = get_google_suggestions(sug)
        # Filtra e limpa as palavras-chave secundárias
        keywords = [k for k in sec_suggestions if k.lower() != sug.lower()][:4]
        
        # Se não houver palavras secundárias suficientes, coloca termos gerais
        if not keywords:
            keywords = [sug, "tutorial", "passo a passo", "dicas de produtividade"]
            
        formatted_list.append({
            "topic": sug.title(),
            "keywords": keywords
        })
        time.sleep(0.2)
        
    return formatted_list

if __name__ == "__main__":
    # Teste rápido do Keyword Engine
    seed = "best productivity apps"
    print(f"=== TESTE DO KEYWORD ENGINE ===")
    results = extract_long_tail_keywords(seed, language="en", depth_a_to_z=False)
    print(f"\nEncontradas {len(results)} sugestões de cauda longa:")
    for r in results:
        print(f"- {r}")
        
    print("\nFormatando para o pipeline do gerador...")
    pipeline_data = format_suggestions_for_generation(results, max_results=3)
    print("\nEstrutura gerada:")
    print(json.dumps(pipeline_data, indent=4, ensure_ascii=False))
