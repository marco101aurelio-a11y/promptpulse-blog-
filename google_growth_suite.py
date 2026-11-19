# google_growth_suite.py
"""
Suíte Unificada Google Growth (Search Console + Google Analytics 4 + Google Tag Manager).
Utiliza a Conta de Serviço (Service Account) do projeto para autenticar e manipular:
1. Google Search Console (GSC): Listar propriedades, consultar cliques/impressões/CTR/posição por palavra-chave e página, enviar sitemaps e inspecionar indexação de URLs.
2. Google Analytics 4 (GA4): Métricas gerais, usuários em tempo real, páginas mais lidas e canais/origens de tráfego.
3. Google Tag Manager (GTM): Listar contas, containers, workspaces, tags, criar tags HTML/scripts e publicar versões do container.
"""

import os
import sys
import json
import urllib.parse
from datetime import datetime, timedelta

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

from google.oauth2 import service_account
from google.auth.transport.requests import AuthorizedSession
import config
import google_analytics

ALL_SCOPES = [
    "https://www.googleapis.com/auth/webmasters",
    "https://www.googleapis.com/auth/analytics.readonly",
    "https://www.googleapis.com/auth/tagmanager.edit.containers",
    "https://www.googleapis.com/auth/tagmanager.edit.containerversions",
    "https://www.googleapis.com/auth/tagmanager.publish",
    "https://www.googleapis.com/auth/tagmanager.readonly",
]


def get_authorized_session(scopes=None) -> AuthorizedSession:
    """Retorna uma sessão HTTP autenticada com OAuth2 Service Account."""
    creds_path = config.GA_CREDENTIALS_PATH
    if not os.path.exists(creds_path):
        raise FileNotFoundError(f"Arquivo de credenciais não encontrado: {creds_path}")
    creds = service_account.Credentials.from_service_account_file(
        creds_path, scopes=scopes or ALL_SCOPES
    )
    return AuthorizedSession(creds)


# ==============================================================================
# 1. GOOGLE SEARCH CONSOLE (GSC)
# ==============================================================================

def gsc_list_sites():
    """Lista todos os sites/propriedades visíveis no Google Search Console."""
    session = get_authorized_session(["https://www.googleapis.com/auth/webmasters.readonly"])
    resp = session.get("https://www.googleapis.com/webmasters/v3/sites", timeout=20)
    if resp.status_code != 200:
        return {"success": False, "status_code": resp.status_code, "error": resp.text}
    data = resp.json()
    return {"success": True, "sites": data.get("siteEntry", [])}


def gsc_query_search_analytics(
    site_url: str = "sc-domain:promptpulse.com.br",
    days: int = 28,
    dimensions: list = None,
    row_limit: int = 25,
):
    """
    Consulta métricas reais de SEO no Google Search Console (cliques, impressões, CTR, posição média).
    Suporta tanto 'sc-domain:promptpulse.com.br' quanto 'https://www.promptpulse.com.br/'.
    """
    if dimensions is None:
        dimensions = ["query"]

    session = get_authorized_session(["https://www.googleapis.com/auth/webmasters.readonly"])

    # Se o usuário não souber o formato exato da propriedade, descobre automaticamente a primeira compatível
    candidates = [site_url]
    if "promptpulse.com.br" in site_url:
        for alt in [
            "sc-domain:promptpulse.com.br",
            "https://www.promptpulse.com.br/",
            "https://promptpulse.com.br/",
        ]:
            if alt not in candidates:
                candidates.append(alt)

    end_date = datetime.today().strftime("%Y-%m-%d")
    start_date = (datetime.today() - timedelta(days=days)).strftime("%Y-%m-%d")

    payload = {
        "startDate": start_date,
        "endDate": end_date,
        "dimensions": dimensions,
        "rowLimit": row_limit,
    }

    last_err = None
    for candidate in candidates:
        encoded_site = urllib.parse.quote(candidate, safe="")
        url = f"https://www.googleapis.com/webmasters/v3/sites/{encoded_site}/searchAnalytics/query"
        resp = session.post(url, json=payload, timeout=25)
        if resp.status_code == 200:
            rows = resp.json().get("rows", [])
            formatted_rows = []
            for r in rows:
                formatted_rows.append({
                    "keys": r.get("keys", []),
                    "clicks": r.get("clicks", 0),
                    "impressions": r.get("impressions", 0),
                    "ctr_percent": round(r.get("ctr", 0) * 100, 2),
                    "position": round(r.get("position", 0), 1),
                })
            return {
                "success": True,
                "site_url": candidate,
                "period": f"{start_date} a {end_date}",
                "dimensions": dimensions,
                "total_rows": len(formatted_rows),
                "rows": formatted_rows,
            }
        last_err = {"site_tested": candidate, "status_code": resp.status_code, "error": resp.text}

    return {"success": False, "details": last_err}


def gsc_submit_sitemap(
    site_url: str = "sc-domain:promptpulse.com.br",
    sitemap_url: str = "https://www.promptpulse.com.br/sitemap.xml",
):
    """Envia ou atualiza o sitemap.xml no Google Search Console."""
    session = get_authorized_session(["https://www.googleapis.com/auth/webmasters"])
    encoded_site = urllib.parse.quote(site_url, safe="")
    encoded_feed = urllib.parse.quote(sitemap_url, safe="")
    url = f"https://www.googleapis.com/webmasters/v3/sites/{encoded_site}/sitemaps/{encoded_feed}"
    resp = session.put(url, timeout=20)
    if resp.status_code in (200, 204):
        return {"success": True, "site_url": site_url, "sitemap_submitted": sitemap_url}
    return {"success": False, "status_code": resp.status_code, "error": resp.text}


def gsc_inspect_url(
    inspection_url: str,
    site_url: str = "sc-domain:promptpulse.com.br",
):
    """Inspeciona o status de indexação de uma URL específica no Google Search Console."""
    session = get_authorized_session(["https://www.googleapis.com/auth/webmasters.readonly"])
    url = "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect"
    payload = {
        "inspectionUrl": inspection_url,
        "siteUrl": site_url,
        "languageCode": "pt-BR",
    }
    resp = session.post(url, json=payload, timeout=25)
    if resp.status_code == 200:
        return {"success": True, "result": resp.json().get("inspectionResult", {})}
    return {"success": False, "status_code": resp.status_code, "error": resp.text}


# ==============================================================================
# 2. GOOGLE ANALYTICS 4 (GA4)
# ==============================================================================

def ga4_discover_properties():
    """Descobre automaticamente todas as contas e propriedades GA4 visíveis para a Conta de Serviço."""
    session = get_authorized_session(["https://www.googleapis.com/auth/analytics.readonly"])
    resp = session.get("https://analyticsadmin.googleapis.com/v1beta/accountSummaries", timeout=20)
    if resp.status_code != 200:
        return {"success": False, "status_code": resp.status_code, "error": resp.text}
    summaries = resp.json().get("accountSummaries", [])
    properties = []
    for acc in summaries:
        for prop in acc.get("propertySummaries", []):
            prop_id = prop.get("property", "").replace("properties/", "")
            properties.append({
                "account_name": acc.get("displayName"),
                "property_name": prop.get("displayName"),
                "property_id": prop_id,
            })
    return {"success": True, "properties": properties}


def ga4_get_overview(days: int = 28, property_id: str = None):
    """Retorna visão geral de tráfego (usuários ativos, sessões, visualizações, canais e top páginas) no GA4."""
    from google.analytics.data_v1beta.types import DateRange, Dimension, Metric, RunReportRequest

    prop_id = google_analytics.get_clean_property_id(property_id)
    if not prop_id:
        return {"success": False, "error": "GA_PROPERTY_ID não configurado no .env"}

    try:
        client = google_analytics.get_analytics_client()
        req = RunReportRequest(
            property=f"properties/{prop_id}",
            date_ranges=[DateRange(start_date=f"{days}daysAgo", end_date="today")],
            metrics=[
                Metric(name="activeUsers"),
                Metric(name="newUsers"),
                Metric(name="sessions"),
                Metric(name="screenPageViews"),
                Metric(name="averageSessionDuration"),
            ],
        )
        resp = client.run_report(req)
        totals = {
            "activeUsers": 0,
            "newUsers": 0,
            "sessions": 0,
            "screenPageViews": 0,
            "averageSessionDurationSec": 0.0,
        }
        if resp.rows:
            vals = resp.rows[0].metric_values
            totals = {
                "activeUsers": int(vals[0].value),
                "newUsers": int(vals[1].value),
                "sessions": int(vals[2].value),
                "screenPageViews": int(vals[3].value),
                "averageSessionDurationSec": round(float(vals[4].value), 1),
            }

        top_pages = google_analytics.get_top_pages(days=days, limit=10, property_id=prop_id)
        realtime_users = google_analytics.get_realtime_active_users(property_id=prop_id)

        return {
            "success": True,
            "property_id": prop_id,
            "days": days,
            "realtime_active_users": realtime_users,
            "totals": totals,
            "top_pages": top_pages,
        }
    except Exception as e:
        err_str = str(e)
        if "403" in err_str and not property_id:
            disc = ga4_discover_properties()
            if disc.get("success") and disc.get("properties"):
                real_prop_id = disc["properties"][0]["property_id"]
                if real_prop_id and real_prop_id != prop_id:
                    return ga4_get_overview(days=days, property_id=real_prop_id)
            return {
                "success": False,
                "property_id": prop_id,
                "error": err_str,
                "discovered_properties": disc,
            }
        return {"success": False, "property_id": prop_id, "error": err_str}


def ga4_get_traffic_sources(days: int = 28, property_id: str = None):
    """Retorna a origem do tráfego (Google Organic, Direct, Referral, Social) no GA4."""
    from google.analytics.data_v1beta.types import DateRange, Dimension, Metric, RunReportRequest

    prop_id = google_analytics.get_clean_property_id(property_id)
    try:
        client = google_analytics.get_analytics_client()
        req = RunReportRequest(
            property=f"properties/{prop_id}",
            date_ranges=[DateRange(start_date=f"{days}daysAgo", end_date="today")],
            dimensions=[
                Dimension(name="sessionDefaultChannelGroup"),
                Dimension(name="sessionSourceMedium"),
            ],
            metrics=[
                Metric(name="sessions"),
                Metric(name="activeUsers"),
                Metric(name="screenPageViews"),
            ],
            limit=15,
        )
        resp = client.run_report(req)
        sources = []
        for row in resp.rows:
            sources.append({
                "channel": row.dimension_values[0].value,
                "source_medium": row.dimension_values[1].value,
                "sessions": int(row.metric_values[0].value),
                "activeUsers": int(row.metric_values[1].value),
                "pageViews": int(row.metric_values[2].value),
            })
        return {"success": True, "property_id": prop_id, "sources": sources}
    except Exception as e:
        return {"success": False, "property_id": prop_id, "error": str(e)}


# ==============================================================================
# 3. GOOGLE TAG MANAGER (GTM)
# ==============================================================================

def gtm_list_accounts_and_containers():
    """Lista todas as contas e containers do Google Tag Manager acessíveis pela Service Account."""
    session = get_authorized_session(["https://www.googleapis.com/auth/tagmanager.readonly"])
    resp = session.get("https://tagmanager.googleapis.com/tagmanager/v2/accounts", timeout=20)
    if resp.status_code != 200:
        return {"success": False, "status_code": resp.status_code, "error": resp.text}

    accounts = resp.json().get("account", [])
    result = []
    for acc in accounts:
        acc_path = acc.get("path")  # ex: accounts/123456
        c_resp = session.get(
            f"https://tagmanager.googleapis.com/tagmanager/v2/{acc_path}/containers",
            timeout=20,
        )
        containers = c_resp.json().get("container", []) if c_resp.status_code == 200 else []
        result.append({
            "accountId": acc.get("accountId"),
            "name": acc.get("name"),
            "path": acc_path,
            "containers": [
                {
                    "containerId": c.get("containerId"),
                    "name": c.get("name"),
                    "publicId": c.get("publicId"),  # ex: GTM-XXXXXXX
                    "path": c.get("path"),
                }
                for c in containers
            ],
        })
    return {"success": True, "accounts": result}


def gtm_list_workspace_tags(container_path: str):
    """
    Lista workspaces, tags e acionadores (triggers) de um container GTM.
    container_path: ex 'accounts/123456/containers/789012'
    """
    session = get_authorized_session(["https://www.googleapis.com/auth/tagmanager.readonly"])
    ws_resp = session.get(
        f"https://tagmanager.googleapis.com/tagmanager/v2/{container_path}/workspaces",
        timeout=20,
    )
    if ws_resp.status_code != 200:
        return {"success": False, "status_code": ws_resp.status_code, "error": ws_resp.text}

    workspaces = ws_resp.json().get("workspace", [])
    if not workspaces:
        return {"success": True, "workspaces": [], "tags": []}

    ws_path = workspaces[0].get("path")
    tags_resp = session.get(
        f"https://tagmanager.googleapis.com/tagmanager/v2/{ws_path}/tags",
        timeout=20,
    )
    tags = tags_resp.json().get("tag", []) if tags_resp.status_code == 200 else []

    return {
        "success": True,
        "workspace_path": ws_path,
        "workspace_name": workspaces[0].get("name"),
        "tags": [
            {
                "tagId": t.get("tagId"),
                "name": t.get("name"),
                "type": t.get("type"),
                "firingTriggerId": t.get("firingTriggerId", []),
                "paused": t.get("paused", False),
            }
            for t in tags
        ],
    }


def gtm_create_custom_html_tag(
    workspace_path: str,
    tag_name: str,
    html_script: str,
    firing_trigger_ids: list = None,
):
    """
    Cria uma Tag de HTML/Script personalizado no Google Tag Manager.
    Por padrão dispara em 'All Pages' (Trigger ID '2147479553').
    """
    if firing_trigger_ids is None:
        firing_trigger_ids = ["2147479553"]

    session = get_authorized_session(["https://www.googleapis.com/auth/tagmanager.edit.containers"])
    url = f"https://tagmanager.googleapis.com/tagmanager/v2/{workspace_path}/tags"
    payload = {
        "name": tag_name,
        "type": "html",
        "parameter": [
            {"type": "template", "key": "html", "value": html_script},
            {"type": "boolean", "key": "supportDocumentWrite", "value": "false"},
        ],
        "firingTriggerId": firing_trigger_ids,
    }
    resp = session.post(url, json=payload, timeout=25)
    if resp.status_code in (200, 201):
        return {"success": True, "created_tag": resp.json()}
    return {"success": False, "status_code": resp.status_code, "error": resp.text}


def run_full_diagnostic():
    print("=" * 70)
    print("🚀 DIAGNÓSTICO COMPLETO: GOOGLE SEARCH CONSOLE + GA4 + TAG MANAGER")
    print("=" * 70)

    # 1. Search Console
    print("\n[1/3] 🔎 Testando GOOGLE SEARCH CONSOLE...")
    gsc_sites = gsc_list_sites()
    if gsc_sites.get("success"):
        sites = gsc_sites.get("sites", [])
        print(f"  ✅ Conectado ao Search Console! Propriedades visíveis ({len(sites)}):")
        for s in sites:
            print(f"     • {s.get('siteUrl')} (Permissão: {s.get('permissionLevel')})")
        if sites:
            first_site = sites[0].get("siteUrl")
            queries = gsc_query_search_analytics(site_url=first_site, days=28, dimensions=["query"], row_limit=10)
            if queries.get("success"):
                print(f"  📊 Top consultas nos últimos 28 dias em {first_site}: {queries.get('total_rows')} termos encontrados")
                for row in queries.get("rows", [])[:5]:
                    print(f"     - '{row['keys'][0]}': {row['clicks']} cliques | {row['impressions']} impr. | pos: {row['position']}")
    else:
        print(f"  ❌ Falha no Search Console ({gsc_sites.get('status_code')}): {gsc_sites.get('error')}")

    # 2. Google Analytics 4
    print("\n[2/3] 📈 Testando GOOGLE ANALYTICS 4 (GA4)...")
    ga4_data = ga4_get_overview(days=28)
    if ga4_data.get("success"):
        totals = ga4_data.get("totals", {})
        print(f"  ✅ Conectado ao GA4 (Property ID: {ga4_data.get('property_id')})!")
        print(f"     • Usuários ativos em Tempo Real (últimos 30 min): {ga4_data.get('realtime_active_users')}")
        print(f"     • Últimos 28 dias: {totals.get('activeUsers')} usuários | {totals.get('sessions')} sessões | {totals.get('screenPageViews')} views")
        top_pages = ga4_data.get("top_pages", [])
        if top_pages:
            print("     • Top 3 páginas mais acessadas:")
            for p in top_pages[:3]:
                print(f"       - {p['path']} ({p['views']} views | {p['users']} usuários)")
    else:
        print(f"  ❌ Falha no GA4: {ga4_data.get('error')}")

    # 3. Google Tag Manager
    print("\n[3/3] 🏷️ Testando GOOGLE TAG MANAGER (GTM)...")
    gtm_data = gtm_list_accounts_and_containers()
    if gtm_data.get("success"):
        accounts = gtm_data.get("accounts", [])
        print(f"  ✅ Conectado ao Google Tag Manager! Contas visíveis ({len(accounts)}):")
        for acc in accounts:
            print(f"     • Conta: {acc.get('name')} (ID: {acc.get('accountId')})")
            for c in acc.get("containers", []):
                print(f"       └─ Container: {c.get('name')} | Código Público: {c.get('publicId')} | Path: {c.get('path')}")
                ws_tags = gtm_list_workspace_tags(c.get("path"))
                if ws_tags.get("success"):
                    print(f"          Tags configuradas ({len(ws_tags.get('tags', []))}): {[t['name'] for t in ws_tags.get('tags', [])]}")
    else:
        print(f"  ❌ Falha no GTM ({gtm_data.get('status_code')}): {gtm_data.get('error')}")

    print("\n" + "=" * 70)


if __name__ == "__main__":
    run_full_diagnostic()
