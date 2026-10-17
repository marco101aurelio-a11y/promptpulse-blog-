# google_analytics.py
"""
Módulo de integração com a API do Google Analytics 4 (Google Analytics Data API v1beta).
Permite consultar métricas reais do blog (visualizações, usuários ativos, páginas mais acessadas e engajamento)
usando a Conta de Serviço (Service Account) configurada no Google Cloud.
"""

import os
import sys
import json
from datetime import datetime

# Garantir compatibilidade de saída UTF-8 no terminal Windows
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

from google.oauth2 import service_account
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    DateRange,
    Dimension,
    Metric,
    RunReportRequest,
    RunRealtimeReportRequest,
    FilterExpression,
    Filter
)

import config

SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"]

def get_credentials():
    """
    Carrega as credenciais da Conta de Serviço a partir do arquivo JSON configurado.
    """
    creds_path = config.GA_CREDENTIALS_PATH
    if not os.path.exists(creds_path):
        raise FileNotFoundError(
            f"Arquivo de credenciais do Google Analytics não encontrado em: {creds_path}\n"
            f"Certifique-se de que o arquivo JSON da Conta de Serviço está presente na raiz do projeto."
        )
    return service_account.Credentials.from_service_account_file(creds_path, scopes=SCOPES)

def get_analytics_client():
    """
    Inicializa e retorna o cliente oficial BetaAnalyticsDataClient.
    """
    credentials = get_credentials()
    return BetaAnalyticsDataClient(credentials=credentials)

def get_clean_property_id(property_id=None):
    """
    Garante que o Property ID esteja no formato correto (apenas números ou 'properties/NUMERO').
    """
    prop_id = str(property_id or config.GA_PROPERTY_ID).strip()
    if not prop_id:
        return ""
    # Se já tiver o prefixo properties/, remove para padronizar
    if prop_id.startswith("properties/"):
        prop_id = prop_id.replace("properties/", "")
    return prop_id

def test_connection(property_id=None):
    """
    Testa se a conexão com a API do Google Analytics está funcionando:
    1. Valida o arquivo JSON de credenciais.
    2. Testa a consulta com o GA_PROPERTY_ID.
    """
    prop_id = get_clean_property_id(property_id)
    print("=" * 60)
    print("🔍 DIAGNÓSTICO DE CONEXÃO: GOOGLE ANALYTICS 4 DATA API")
    print("=" * 60)

    # 1. Validar Credenciais
    print(f"\n[1/3] Verificando credenciais...")
    try:
        creds = get_credentials()
        print(f"  ✓ Arquivo de credenciais encontrado: {config.GA_CREDENTIALS_FILE}")
        print(f"  ✓ Conta de Serviço: {creds.service_account_email}")
        print(f"  ✓ ID do Projeto: {creds.project_id}")
    except Exception as e:
        print(f"  ❌ Erro ao ler credenciais: {e}")
        return False

    # 2. Validar Property ID
    print(f"\n[2/3] Verificando Property ID do GA4...")
    if not prop_id:
        print(f"  ⚠️ AVISO: GA_PROPERTY_ID não configurado no arquivo .env!")
        print(f"  ℹ️ Para encontrar seu ID de Propriedade do GA4:")
        print(f"     1. Acesse https://analytics.google.com/")
        print(f"     2. Vá em 'Administrador' (ícone de engrenagem no canto inferior esquerdo)")
        print(f"     3. Clique em 'Detalhes da propriedade'")
        print(f"     4. Copie o 'ID DA PROPRIEDADE' (número de 9 ou 10 dígitos, ex: 471234567)")
        print(f"     5. Cole no seu arquivo .env: GA_PROPERTY_ID=SEU_NUMERO_AQUI")
        print(f"\n  ℹ️ NÃO ESQUEÇA: Você também deve dar permissão à Conta de Serviço:")
        print(f"     No GA4 > Administrador > Gerenciamento de acesso à propriedade > Adicionar Usuário:")
        print(f"     E-mail: {creds.service_account_email}")
        print(f"     Função: Leitor (Viewer)")
        return False

    print(f"  ✓ GA_PROPERTY_ID identificado: {prop_id}")

    # 3. Teste de consulta à API
    print(f"\n[3/3] Consultando métricas reais via API...")
    try:
        client = get_analytics_client()
        request = RunReportRequest(
            property=f"properties/{prop_id}",
            date_ranges=[DateRange(start_date="7daysAgo", end_date="today")],
            metrics=[
                Metric(name="activeUsers"),
                Metric(name="screenPageViews"),
                Metric(name="sessions")
            ]
        )
        response = client.run_report(request)
        print("  ✓ Conexão realizada com sucesso com o Google Analytics 4!")
        
        if response.rows:
            row = response.rows[0]
            users = row.metric_values[0].value
            views = row.metric_values[1].value
            sessions = row.metric_values[2].value
            print(f"\n📊 Métricas dos últimos 7 dias:")
            print(f"   • Usuários Ativos: {users}")
            print(f"   • Visualizações de Página: {views}")
            print(f"   • Sessões Totais: {sessions}")
        else:
            print("  ℹ️ Conexão estabelecida, mas ainda não há dados registrados nos últimos 7 dias.")
        return True

    except Exception as e:
        error_msg = str(e)
        print(f"  ❌ Erro ao consultar a API: {error_msg}")
        if "PERMISSION_DENIED" in error_msg or "User does not have sufficient permissions" in error_msg:
            print("\n  👉 MOTIVO: A Conta de Serviço ainda não foi adicionada à sua propriedade no GA4.")
            print("  COMO RESOLVER:")
            print(f"  1. Acesse o Google Analytics da sua conta.")
            print(f"  2. Vá em Administrador > Gerenciamento de acesso à propriedade.")
            print(f"  3. Clique no botão '+' > Adicionar usuários.")
            print(f"  4. Insira: {creds.service_account_email}")
            print(f"  5. Defina a função como 'Leitor' (Viewer) e salve.")
        elif "API has not been used in project" in error_msg or "disabled" in error_msg:
            print("\n  👉 MOTIVO: A 'Google Analytics Data API' precisa ser ativada no seu Google Cloud.")
            print("  COMO RESOLVER:")
            print(f"  Acesse o link para ativar: https://console.cloud.google.com/apis/library/analyticsdata.googleapis.com?project={creds.project_id}")
        return False

def get_top_pages(days=30, limit=10, property_id=None):
    """
    Retorna as páginas mais acessadas do blog no período especificado.
    """
    prop_id = get_clean_property_id(property_id)
    if not prop_id:
        raise ValueError("GA_PROPERTY_ID não configurado no .env")

    client = get_analytics_client()
    request = RunReportRequest(
        property=f"properties/{prop_id}",
        date_ranges=[DateRange(start_date=f"{days}daysAgo", end_date="today")],
        dimensions=[
            Dimension(name="pagePath"),
            Dimension(name="pageTitle")
        ],
        metrics=[
            Metric(name="screenPageViews"),
            Metric(name="activeUsers"),
            Metric(name="userEngagementDuration")
        ],
        limit=limit
    )
    response = client.run_report(request)
    
    pages = []
    for row in response.rows:
        path = row.dimension_values[0].value
        title = row.dimension_values[1].value
        views = int(row.metric_values[0].value)
        users = int(row.metric_values[1].value)
        duration_sec = float(row.metric_values[2].value)
        avg_duration = round(duration_sec / max(users, 1), 1)

        pages.append({
            "path": path,
            "title": title,
            "views": views,
            "users": users,
            "avg_engagement_seconds": avg_duration
        })
    return pages

def get_realtime_active_users(property_id=None):
    """
    Retorna o número de usuários ativos em tempo real (últimos 30 minutos).
    """
    prop_id = get_clean_property_id(property_id)
    if not prop_id:
        raise ValueError("GA_PROPERTY_ID não configurado no .env")

    client = get_analytics_client()
    request = RunRealtimeReportRequest(
        property=f"properties/{prop_id}",
        metrics=[Metric(name="activeUsers")]
    )
    response = client.run_realtime_report(request)
    
    if response.rows:
        return int(response.rows[0].metric_values[0].value)
    return 0

def get_post_performance(slug, days=30, property_id=None):
    """
    Retorna métricas específicas de um artigo do blog pelo slug.
    """
    prop_id = get_clean_property_id(property_id)
    if not prop_id:
        raise ValueError("GA_PROPERTY_ID não configurado no .env")

    client = get_analytics_client()
    request = RunReportRequest(
        property=f"properties/{prop_id}",
        date_ranges=[DateRange(start_date=f"{days}daysAgo", end_date="today")],
        dimension_filter=FilterExpression(
            filter=Filter(
                field_name="pagePath",
                string_filter=Filter.StringFilter(
                    match_type=Filter.StringFilter.MatchType.CONTAINS,
                    value=slug
                )
            )
        ),
        metrics=[
            Metric(name="screenPageViews"),
            Metric(name="activeUsers"),
            Metric(name="userEngagementDuration")
        ]
    )
    response = client.run_report(request)
    if response.rows:
        row = response.rows[0]
        views = int(row.metric_values[0].value)
        users = int(row.metric_values[1].value)
        duration = float(row.metric_values[2].value)
        return {
            "slug": slug,
            "views": views,
            "users": users,
            "avg_duration_seconds": round(duration / max(users, 1), 1)
        }
    return {
        "slug": slug,
        "views": 0,
        "users": 0,
        "avg_duration_seconds": 0
    }

if __name__ == "__main__":
    # Execução via linha de comando para teste rápido
    test_connection()
