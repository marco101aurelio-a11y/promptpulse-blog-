# Regra: Pipeline de Criação e Entrega de Artigos

Sempre que um novo artigo for solicitado ou gerado para o blog PromptPulse:

1. **Padrão de Autoria e Identidade:**
   - Autor: **Marco Aurélio**
   - Avatar: `/marco-aurelio.jpg`
   - Categoria bem definida no nicho de IA, Produtividade ou Ferramentas Google.

2. **Link Building Interno Obrigatório (Topic Cluster):**
   - Rastrear os artigos já publicados usando `internal_linking.py`.
   - Garantir que a IA insira de 1 a 2 links contextuais naturais apontando para posts existentes (formato `[texto âncora](/posts/slug)`).

3. **Deploy Automático:**
   - Salvar o markdown diretamente em `blog-web/content/posts/`.
   - Fazer commit e push automático para a branch `main` do GitHub com o usuário `marco101aurelio-a11y`.

4. **Destaque Dinâmico no Hero da Home:**
   - O artigo mais recente publicado (ordenado por data) assume AUTOMATICAMENTE o banner principal (Hero) na Home do blog.
   - Os artigos anteriores são deslocados para o grid de "Últimas Publicações".

5. **Entrega Imediata no Chat:**
   Assim que o artigo for gerado e publicado, SEMPRE entregar no chat um relatório contendo:
   - 📌 **Título e Categoria**
   - ⏱️ **Tempo Estimado de Leitura**
   - 💡 **Resumo do Conteúdo (Pontos-chave abordados)**
   - 🔗 **Links Internos Conectados (Quais posts foram linkados)**
   - 🖼️ **Imagem de Capa Utilizada**
   - 🌐 **Link Direto do Artigo em Produção**
