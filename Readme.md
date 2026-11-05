# 📝 PromptPulse Blog — Fábrica Automatizada de Conteúdo & SEO

Plataforma e pipeline de **Content Martech & SEO Programático** que automatiza a pesquisa de palavras-chave, geração de artigos otimizados com IA, auditoria semântica, criação de mídia visual, *internal linking* e publicação automática (Web Next.js / Markdown e WordPress), integrada ao **Antigravity Central Hub (MCP)**.

---

## 🚀 Funcionalidades Principais

- **Motor de Palavras-Chave (`keyword_engine.py` & `keywords.py`):** Descoberta e estruturação de tópicos orientados a intenção de busca e tráfego orgânico.
- **Geração & Auditoria SEO (`generate_blog_post.py` & `audit_blog_post.py`):** Redação automatizada de artigos profundos com revisão de legibilidade, escaneabilidade, meta-tags e estrutura de headings (`H1`–`H3`).
- **Internal Linking Inteligente (`internal_linking.py`):** Conexão semântica automática entre artigos do cluster para fortalecimento de autoridade de domínio.
- **Mídia Visual Automatizada (`generate_image.py` & `fetch_pexels_image.py`):** Geração de capas com IA e curadoria de imagens de alta resolução via API Pexels.
- **Publicação Multi-Canal (`publish_markdown.py` & `publish_wordpress.py`):** Exportação direta para o portal web (`blog-web/`) e integração via REST API com WordPress.
- **Telemetria & Analytics (`google_analytics.py`):** Acompanhamento de métricas de tráfego e performance de conteúdo.

---

## 📂 Estrutura do Projeto

```
blog automatico v2/
├── blog-web/                # Aplicação Web do Blog (Artigos em Markdown e Frontend)
├── blog_posts/              # Repositório local de artigos gerados e auditados
├── main.py                  # Orquestrador principal do pipeline de conteúdo
├── generate_blog_post.py    # Geração de artigos otimizados para SEO
├── audit_blog_post.py       # Auditoria e refinamento editorial via IA
├── internal_linking.py      # Motor de linkagem interna automática
├── keyword_engine.py        # Inteligência e expansão de palavras-chave
├── publish_markdown.py      # Publicação no portal web em Markdown
└── publish_wordpress.py     # Integração automática com WordPress
```

---

## ⚙️ Como Executar

1. **Instale as dependências no ambiente virtual:**
   ```bash
   python -m venv .venv
   .venv\Scripts\activate
   pip install openai requests python-dotenv
   ```

2. **Configure o arquivo `.env`** (baseado em `.env.example`):
   ```env
   OPENAI_API_KEY=sua_chave_aqui
   PEXELS_API_KEY=sua_chave_pexels_aqui
   ```

3. **Dispare a geração de conteúdo:**
   ```bash
   python main.py
   ```
   *(Ou acione remotamente via ferramenta `blog_disparar_geracao` pelo servidor MCP).*
