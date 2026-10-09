# config.py
import os
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

# Chaves de API para geração de texto e imagens
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "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")
# DeepSeek V3 via OpenRouter (Modelo recomendado por custo-benefício)
OPENROUTER_MODEL = os.getenv("OPENROUTER_MODEL", "deepseek/deepseek-chat")

# Chave da API do Pexels para imagens gratuitas de alta qualidade
PEXELS_API_KEY = os.getenv("PEXELS_API_KEY", "qEgmZfIJNpFvvuiygDzilSwxZsUpE7A8OMjoLA9wTQ6Z19WBxLqI8y8k")

# Configurações do WordPress REST API para postagem automática
WORDPRESS_URL = os.getenv("WORDPRESS_URL", "")
WORDPRESS_USER = os.getenv("WORDPRESS_USER", "")
WORDPRESS_APP_PASSWORD = os.getenv("WORDPRESS_APP_PASSWORD", "")

# Idiomas padrão
DEFAULT_LANGUAGE = os.getenv("DEFAULT_LANGUAGE", "pt")
SUPPORTED_LANGUAGES = ["en", "pt", "es"]
