# config.py
import os
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

# Chaves de API para geração de texto e imagens (carregadas a partir do .env)
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
# DeepSeek V3 via OpenRouter (Modelo recomendado por custo-benefício)
OPENROUTER_MODEL = os.getenv("OPENROUTER_MODEL", "deepseek/deepseek-chat")

# Chave da API do Pexels para imagens gratuitas de alta qualidade
PEXELS_API_KEY = os.getenv("PEXELS_API_KEY", "")

# Configurações do WordPress REST API para postagem automática
WORDPRESS_URL = os.getenv("WORDPRESS_URL", "")
WORDPRESS_USER = os.getenv("WORDPRESS_USER", "")
WORDPRESS_APP_PASSWORD = os.getenv("WORDPRESS_APP_PASSWORD", "")

# Idiomas padrão
DEFAULT_LANGUAGE = os.getenv("DEFAULT_LANGUAGE", "pt")
SUPPORTED_LANGUAGES = ["en", "pt", "es"]
