# config.py
import os
import tempfile

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

# Chaves de API para geração de texto e imagens (carregadas a partir do .env ou GitHub Secrets)
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")

# Modelo de texto
OPENROUTER_MODEL = os.getenv("OPENROUTER_MODEL", "deepseek/deepseek-chat")

# Provedor de imagem ('dalle' ou 'pexels')
IMAGE_PROVIDER = os.getenv("IMAGE_PROVIDER", "dalle")

# Chave da API do Pexels para imagens gratuitas de alta qualidade
PEXELS_API_KEY = os.getenv("PEXELS_API_KEY", "")

# Configurações do WordPress REST API para postagem automática
WORDPRESS_URL = os.getenv("WORDPRESS_URL", "")
WORDPRESS_USER = os.getenv("WORDPRESS_USER", "")
WORDPRESS_APP_PASSWORD = os.getenv("WORDPRESS_APP_PASSWORD", "")

# Idiomas padrão
DEFAULT_LANGUAGE = os.getenv("DEFAULT_LANGUAGE", "pt")
SUPPORTED_LANGUAGES = ["en", "pt", "es"]

# Configurações do Google Cloud / GA4 / Search Console / Tag Manager
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
GA_CREDENTIALS_FILE = os.getenv("GOOGLE_APPLICATION_CREDENTIALS", "projeto-blog-automatico-494221-a5d1909a3d90.json")
if not os.path.isabs(GA_CREDENTIALS_FILE):
    GA_CREDENTIALS_PATH = os.path.join(BASE_DIR, GA_CREDENTIALS_FILE)
else:
    GA_CREDENTIALS_PATH = GA_CREDENTIALS_FILE

# Suporte para nuvem (GitHub Actions / Docker): materializa o JSON a partir do Secret GOOGLE_CREDENTIALS_JSON
_raw_google_json = os.getenv("GOOGLE_CREDENTIALS_JSON", "").strip()
if _raw_google_json and not os.path.exists(GA_CREDENTIALS_PATH):
    _tmp_sa_path = os.path.join(tempfile.gettempdir(), "promptpulse_google_sa.json")
    with open(_tmp_sa_path, "w", encoding="utf-8") as _f:
        _f.write(_raw_google_json)
    GA_CREDENTIALS_PATH = _tmp_sa_path

GA_PROPERTY_ID = os.getenv("GA_PROPERTY_ID", "558342687")
