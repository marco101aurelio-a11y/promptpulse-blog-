# google_growth_mcp.py
"""
Servidor MCP (Model Context Protocol - Stdio JSON-RPC 2.0) para:
- Google Search Console (GSC)
- Google Analytics 4 (GA4)
- Google Tag Manager (GTM)
"""

import sys
import json
import traceback
import google_growth_suite as suite

if sys.platform == "win32":
    try:
        sys.stdin.reconfigure(encoding="utf-8", errors="replace")
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

TOOLS = [
    {
        "name": "gsc_listar_sites",
        "description": "Lista todas as propriedades/sites verificados e acessíveis no Google Search Console.",
        "inputSchema": {"type": "object", "properties": {}},
    },
    {
        "name": "gsc_consultar_palavras_chave_e_paginas",
        "description": "Consulta cliques, impressões, CTR (%) e posição média no Google Search Console por palavra-chave ('query') ou página ('page').",
        "inputSchema": {
            "type": "object",
            "properties": {
                "site_url": {
                    "type": "string",
                    "default": "sc-domain:promptpulse.com.br",
                    "description": "URL da propriedade no Search Console (ex: sc-domain:promptpulse.com.br ou https://www.promptpulse.com.br/)",
                },
                "days": {"type": "integer", "default": 28, "description": "Período em dias para análise (ex: 7, 28, 90)"},
                "dimension": {
                    "type": "string",
                    "default": "query",
                    "enum": ["query", "page", "device", "country"],
                    "description": "Dimensão principal: 'query' (palavras-chave) ou 'page' (URLs dos artigos)",
                },
                "row_limit": {"type": "integer", "default": 25},
            },
        },
    },
    {
        "name": "gsc_enviar_sitemap",
        "description": "Envia ou atualiza o sitemap.xml no Google Search Console para acelerar a indexação de novos artigos.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "site_url": {"type": "string", "default": "sc-domain:promptpulse.com.br"},
                "sitemap_url": {"type": "string", "default": "https://www.promptpulse.com.br/sitemap.xml"},
            },
        },
    },
    {
        "name": "gsc_inspecionar_url",
        "description": "Inspeciona no Google Search Console se uma URL específica do blog já foi rastreada e indexada pelo Googlebot.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "inspection_url": {"type": "string", "description": "URL completa do artigo para inspecionar"},
                "site_url": {"type": "string", "default": "sc-domain:promptpulse.com.br"},
            },
            "required": ["inspection_url"],
        },
    },
    {
        "name": "ga4_visao_geral_trafego",
        "description": "Obtém métricas reais do Google Analytics 4 (usuários ativos em tempo real, sessões, visualizações de página e top artigos mais lidos).",
        "inputSchema": {
            "type": "object",
            "properties": {
                "days": {"type": "integer", "default": 28},
                "property_id": {"type": "string", "description": "Opcional. Usa GA_PROPERTY_ID do .env por padrão."},
            },
        },
    },
    {
        "name": "ga4_origens_trafego",
        "description": "Lista os canais e origens de tráfego do site no Google Analytics 4 (Organic Search, Direct, Social, Referral).",
        "inputSchema": {
            "type": "object",
            "properties": {
                "days": {"type": "integer", "default": 28},
                "property_id": {"type": "string"},
            },
        },
    },
    {
        "name": "gtm_listar_containers",
        "description": "Lista todas as contas e containers do Google Tag Manager (GTM-XXXXXXX) disponíveis.",
        "inputSchema": {"type": "object", "properties": {}},
    },
    {
        "name": "gtm_listar_tags",
        "description": "Lista os workspaces e todas as tags configuradas dentro de um container do Google Tag Manager.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "container_path": {
                    "type": "string",
                    "description": "Caminho do container (ex: accounts/123456/containers/789012)",
                }
            },
            "required": ["container_path"],
        },
    },
    {
        "name": "gtm_criar_tag_html",
        "description": "Cria uma nova Tag de HTML/Script personalizado no Google Tag Manager (ex: Pixel, script de rastreamento ou evento).",
        "inputSchema": {
            "type": "object",
            "properties": {
                "workspace_path": {
                    "type": "string",
                    "description": "Caminho do workspace (ex: accounts/123/containers/456/workspaces/789)",
                },
                "tag_name": {"type": "string", "description": "Nome identificador da Tag no GTM"},
                "html_script": {"type": "string", "description": "Código HTML/JavaScript (<script>...</script>) da Tag"},
            },
            "required": ["workspace_path", "tag_name", "html_script"],
        },
    },
]


def execute_tool(name: str, args: dict):
    if name == "gsc_listar_sites":
        return suite.gsc_list_sites()
    elif name == "gsc_consultar_palavras_chave_e_paginas":
        dim = args.get("dimension", "query")
        return suite.gsc_query_search_analytics(
            site_url=args.get("site_url", "sc-domain:promptpulse.com.br"),
            days=int(args.get("days", 28)),
            dimensions=[dim],
            row_limit=int(args.get("row_limit", 25)),
        )
    elif name == "gsc_enviar_sitemap":
        return suite.gsc_submit_sitemap(
            site_url=args.get("site_url", "sc-domain:promptpulse.com.br"),
            sitemap_url=args.get("sitemap_url", "https://www.promptpulse.com.br/sitemap.xml"),
        )
    elif name == "gsc_inspecionar_url":
        return suite.gsc_inspect_url(
            inspection_url=args["inspection_url"],
            site_url=args.get("site_url", "sc-domain:promptpulse.com.br"),
        )
    elif name == "ga4_visao_geral_trafego":
        return suite.ga4_get_overview(
            days=int(args.get("days", 28)),
            property_id=args.get("property_id"),
        )
    elif name == "ga4_origens_trafego":
        return suite.ga4_get_traffic_sources(
            days=int(args.get("days", 28)),
            property_id=args.get("property_id"),
        )
    elif name == "gtm_listar_containers":
        return suite.gtm_list_accounts_and_containers()
    elif name == "gtm_listar_tags":
        return suite.gtm_list_workspace_tags(container_path=args["container_path"])
    elif name == "gtm_criar_tag_html":
        return suite.gtm_create_custom_html_tag(
            workspace_path=args["workspace_path"],
            tag_name=args["tag_name"],
            html_script=args["html_script"],
        )
    else:
        raise ValueError(f"Ferramenta desconhecida: {name}")


def send_response(msg: dict):
    sys.stdout.write(json.dumps(msg, ensure_ascii=False) + "\n")
    sys.stdout.flush()


def main():
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        try:
            req = json.loads(line)
        except Exception:
            continue

        method = req.get("method")
        req_id = req.get("id")

        if method == "initialize":
            send_response({
                "jsonrpc": "2.0",
                "id": req_id,
                "result": {
                    "protocolVersion": "2024-11-05",
                    "capabilities": {"tools": {}},
                    "serverInfo": {"name": "google-growth-suite", "version": "1.0.0"},
                },
            })
        elif method == "notifications/initialized":
            continue
        elif method == "tools/list":
            send_response({
                "jsonrpc": "2.0",
                "id": req_id,
                "result": {"tools": TOOLS},
            })
        elif method == "tools/call":
            params = req.get("params", {})
            tool_name = params.get("name")
            tool_args = params.get("arguments") or {}
            try:
                result_data = execute_tool(tool_name, tool_args)
                send_response({
                    "jsonrpc": "2.0",
                    "id": req_id,
                    "result": {
                        "content": [
                            {
                                "type": "text",
                                "text": json.dumps(result_data, indent=2, ensure_ascii=False),
                            }
                        ],
                        "isError": False,
                    },
                })
            except Exception as err:
                send_response({
                    "jsonrpc": "2.0",
                    "id": req_id,
                    "result": {
                        "content": [
                            {
                                "type": "text",
                                "text": f"Erro ao executar {tool_name}: {err}\n{traceback.format_exc()}",
                            }
                        ],
                        "isError": True,
                    },
                })
        elif req_id is not None:
            send_response({
                "jsonrpc": "2.0",
                "id": req_id,
                "error": {"code": -32601, "message": f"Método não suportado: {method}"},
            })


if __name__ == "__main__":
    main()
