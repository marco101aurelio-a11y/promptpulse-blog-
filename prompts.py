# prompts.py

import random

# Templates otimizados para geração de artigos de blog em Português (pt-BR) com foco em SEO e legibilidade
SEO_BLOG_POST_PROMPTS = [
    """
    Escreva um artigo completo, aprofundado e altamente prático sobre o tema "{topic}" em Português do Brasil (pt-BR), totalmente otimizado para SEO.
    O artigo deve incorporar estrategicamente as seguintes palavras-chave: {keywords}.

    Diretrizes essenciais:
    - IDIOMA: Escreva 100% em Português do Brasil (pt-BR).
    - TÍTULO: NÃO inclua o título H1 (# Título) no topo do texto, pois o sistema de publicação já o insere automaticamente. Comece diretamente pela introdução envolvente.
    - ESTRUTURA:
      1. Introdução cativante que destaque a importância real do tema para o dia a dia de trabalho.
      2. Contexto e evolução da ferramenta ou técnica.
      3. Principais benefícios práticos e ganhos de produtividade.
      4. Guia passo a passo com exemplos práticos acionáveis (sem termos vagos).
      5. Tendências futuras e visão de longo prazo.
      6. Conclusão motivadora com chamada para ação clara.
    - FORMATAÇÃO: Use subtítulos claros (## e ###), listas com marcadores, formatação em negrito para termos-chave e blocos de destaque (dicas práticas).
    """,
    """
    Crie um artigo detalhado e direto ao ponto sobre "{topic}" em Português do Brasil (pt-BR), com foco em alta retenção e SEO.
    Integre com naturalidade as palavras-chave: {keywords}.

    Diretrizes essenciais:
    - IDIOMA: Escreva 100% em Português do Brasil (pt-BR).
    - TÍTULO: NÃO insira a tag H1 (# Título) no início. Inicie diretamente com uma introdução marcante.
    - ESTRUTURA:
      1. Introdução: Apresente o problema que o leitor enfrenta e a solução proposta.
      2. Análise Detalhada: Explique como a tecnologia funciona e por que é superior às alternativas manuais.
      3. Estratégias Práticas de Implementação: Tutoriais acionáveis, dicas e melhores práticas.
      4. Vantagens e Cuidados: Benefícios claros e como evitar erros comuns.
      5. Conclusão: Resumo dos pontos principais e convite para reflexão/comentários.
    - FORMATAÇÃO: Parágrafos curtos, subtítulos escaneáveis (## e ###) e listas com marcadores para máxima legibilidade.
    """,
    """
    Gere um guia completo e especializado sobre "{topic}" em Português do Brasil (pt-BR), posicionado para ranquear nas primeiras posições do Google.
    Distribua as seguintes palavras-chave de maneira fluida: {keywords}.

    Diretrizes essenciais:
    - IDIOMA: Escreva 100% em Português do Brasil (pt-BR).
    - TÍTULO: Não adicione o título (#) no início do conteúdo. Comece pelo texto introdutório.
    - ESTRUTURA:
      1. Introdução: Gancho inicial destacando o ganho de tempo e produtividade.
      2. Como Funciona na Prática: Detalhamento com cenários reais de uso no dia a dia profissional.
      3. Casos de Uso e Tutoriais: Passo a passo claro para configurar e rodar automações sem código.
      4. O Futuro da Ferramenta: O que esperar das próximas atualizações e evolução do ecossistema.
      5. Conclusão e Próximos Passos: Síntese e direcionamento prático para o leitor.
    - FORMATAÇÃO: Estilo moderno, dinâmico, com tópicos diretos e destaque para conceitos essenciais.
    """
]

# Template para revisão e auditoria de legibilidade
AUDIT_BLOG_POST_PROMPT = """
Revise e otimize o artigo a seguir para garantir máxima clareza, tom profissional e natural em Português do Brasil (pt-BR).
Mantenha a formatação Markdown, melhore a fluidez e certifique-se de que a leitura seja simples e envolvente.

{blog_post}
---
Saída obrigatória: Retorne estritamente o texto revisado em Português do Brasil, sem comentários adicionais ou introduções.
"""

# Template para geração de descrições visuais de imagens
IMAGE_PROMPT = """
Gere uma descrição detalhada em inglês (prompt para busca/geração de imagem) para uma imagem conceitual e profissional que represente o artigo sobre "{topic}". A imagem deve ser moderna, corporativa e visualmente atraente.
"""

def get_random_seo_blog_post_prompt():
    return random.choice(SEO_BLOG_POST_PROMPTS)
