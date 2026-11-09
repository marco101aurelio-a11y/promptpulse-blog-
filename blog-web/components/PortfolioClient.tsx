'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  Cpu,
  TrendingUp,
  GitBranch,
  Terminal,
  Calculator,
  CheckCircle2,
  ArrowUpRight,
  Download,
  Zap,
  Workflow,
  Play,
  Pause,
  RotateCcw,
  PhoneCall,
  Activity,
  ShieldAlert,
  Layers,
  Radio,
  Sliders,
  AlertTriangle,
} from 'lucide-react';

// ============================================================================
// 1. DADOS REAIS AUDITADOS — CUSTO 2024 - NOVA TRAFEGO.xlsx (19 Semanas)
// ============================================================================
interface WeeklyMetric {
  week: string;
  period: string;
  spend: number;
  impressions: number;
  clicks: number;
  cpc: number;
  leads: number;
  cpl: number;
  sales: number;
  cac: number;
  revenue: number;
  ticket: number;
  roas: number;
  marginPct: number;
  roi: number;
}

const PDV_WEEKLY_DATA: WeeklyMetric[] = [
  { week: 'S1', period: '02–07 Jan', spend: 248.52, impressions: 10162, clicks: 518, cpc: 0.48, leads: 307, cpl: 0.81, sales: 23, cac: 10.81, revenue: 63548.07, ticket: 2762.96, roas: 255.71, marginPct: 0.70, roi: 178.99 },
  { week: 'S2', period: '08–11 Jan', spend: 246.64, impressions: 197150, clicks: 468, cpc: 0.53, leads: 316, cpl: 0.78, sales: 82, cac: 3.01, revenue: 124747.97, ticket: 1521.32, roas: 505.79, marginPct: 0.70, roi: 354.05 },
  { week: 'S3', period: '14–20 Jan', spend: 198.35, impressions: 10797, clicks: 351, cpc: 0.57, leads: 221, cpl: 0.90, sales: 81, cac: 2.45, revenue: 99579.92, ticket: 1229.38, roas: 502.04, marginPct: 0.70, roi: 351.43 },
  { week: 'S4', period: '21–31 Jan', spend: 959.44, impressions: 114594, clicks: 1054, cpc: 0.91, leads: 548, cpl: 1.75, sales: 76, cac: 12.62, revenue: 119193.15, ticket: 1568.33, roas: 124.23, marginPct: 0.70, roi: 86.96 },
  { week: 'S5', period: '02–07 Fev', spend: 13.00, impressions: 531, clicks: 14, cpc: 0.93, leads: 49, cpl: 0.27, sales: 49, cac: 0.27, revenue: 37663.39, ticket: 768.64, roas: 2897.18, marginPct: 0.45, roi: 1303.73 },
  { week: 'S6', period: '08–13 Fev', spend: 759.19, impressions: 96144, clicks: 2056, cpc: 0.37, leads: 747, cpl: 1.02, sales: 35, cac: 21.69, revenue: 27498.32, ticket: 785.67, roas: 36.22, marginPct: 0.45, roi: 16.30 },
  { week: 'S7', period: '14–20 Fev', spend: 255.60, impressions: 16891, clicks: 492, cpc: 0.52, leads: 73, cpl: 3.50, sales: 19, cac: 13.45, revenue: 27686.64, ticket: 1457.19, roas: 108.32, marginPct: 0.45, roi: 48.74 },
  { week: 'S8', period: '21–29 Fev', spend: 851.21, impressions: 92937, clicks: 2576, cpc: 0.33, leads: 168, cpl: 5.07, sales: 24, cac: 35.47, revenue: 20304.96, ticket: 846.04, roas: 23.85, marginPct: 0.49, roi: 11.69 },
  { week: 'S9', period: 'Mar Sem 1', spend: 222.11, impressions: 28004, clicks: 725, cpc: 0.31, leads: 160, cpl: 1.39, sales: 34, cac: 6.53, revenue: 60018.32, ticket: 1765.24, roas: 270.22, marginPct: 0.49, roi: 132.41 },
  { week: 'S10', period: 'Mar Sem 2', spend: 647.02, impressions: 47578, clicks: 1747, cpc: 0.37, leads: 295, cpl: 2.19, sales: 39, cac: 16.59, revenue: 52586.40, ticket: 1348.37, roas: 81.27, marginPct: 0.49, roi: 39.82 },
  { week: 'S11', period: 'Mar Sem 3', spend: 347.56, impressions: 16359, clicks: 1203, cpc: 0.29, leads: 346, cpl: 1.00, sales: 28, cac: 12.41, revenue: 25901.27, ticket: 925.05, roas: 74.52, marginPct: 0.49, roi: 36.52 },
  { week: 'S12', period: 'Mar Sem 4', spend: 284.72, impressions: 12622, clicks: 840, cpc: 0.34, leads: 219, cpl: 1.30, sales: 12, cac: 23.73, revenue: 18500.00, ticket: 1541.67, roas: 64.98, marginPct: 0.49, roi: 31.84 },
  { week: 'S13', period: '01–07 Abr', spend: 261.00, impressions: 21335, clicks: 709, cpc: 0.37, leads: 122, cpl: 2.14, sales: 10, cac: 26.10, revenue: 27072.61, ticket: 2707.26, roas: 103.73, marginPct: 0.49, roi: 50.83 },
  { week: 'S14', period: '08–14 Abr', spend: 457.10, impressions: 53241, clicks: 948, cpc: 0.48, leads: 212, cpl: 2.16, sales: 12, cac: 38.09, revenue: 22633.55, ticket: 1886.13, roas: 49.52, marginPct: 0.49, roi: 24.26 },
  { week: 'S15', period: '15–21 Abr', spend: 400.00, impressions: 35487, clicks: 835, cpc: 0.48, leads: 239, cpl: 1.67, sales: 23, cac: 17.39, revenue: 53202.18, ticket: 2313.14, roas: 133.01, marginPct: 0.49, roi: 65.17 },
  { week: 'S16', period: '22–30 Abr', spend: 237.00, impressions: 15337, clicks: 336, cpc: 0.71, leads: 129, cpl: 1.84, sales: 31, cac: 7.65, revenue: 49099.82, ticket: 1583.87, roas: 207.17, marginPct: 0.49, roi: 101.51 },
  { week: 'S17', period: '01–07 Mai', spend: 267.00, impressions: 25788, clicks: 337, cpc: 0.79, leads: 52, cpl: 5.13, sales: 18, cac: 14.83, revenue: 10955.00, ticket: 608.61, roas: 41.03, marginPct: 0.49, roi: 20.10 },
  { week: 'S18', period: '08–14 Mai', spend: 1751.00, impressions: 72171, clicks: 1757, cpc: 1.00, leads: 239, cpl: 7.33, sales: 41, cac: 42.71, revenue: 28800.32, ticket: 702.45, roas: 16.45, marginPct: 0.49, roi: 8.06 },
  { week: 'S19', period: '15–21 Mai', spend: 716.00, impressions: 50183, clicks: 669, cpc: 1.07, leads: 18, cpl: 39.78, sales: 25, cac: 28.64, revenue: 28815.00, ticket: 1152.60, roas: 40.24, marginPct: 0.49, roi: 19.72 },
];

// ============================================================================
// 2. NÓS INTERATIVOS DO GRAFO BPMN 2.0 (WE_CRM_GoogleAds_BPMN_V3)
// ============================================================================
const BPMN_NODES = [
  {
    id: 0,
    step: '01',
    layer: 'Landing Page',
    title: 'Captura GCLID & Cookie 1st-Party',
    kpi: '100% Sessões',
    accent: 'from-cyan-400 to-sky-500',
    shortDesc: 'JS/GTM intercepta gclid, wbraid, UTMs e session_id antes do wa.me.',
    logLine: '⚡ [LP-EDGE] gclid="Cj0KCQiA5..." capturado -> session_id="sess_9f8a" persistido.',
    code: `POST /track/landing
{
  "session_id": "sess_9f8a7d6c",
  "gclid": "Cj0KCQiA5-uuBhDzARIs...",
  "utm_campaign": "we_psiquiatria_search"
}`,
    rule: 'Como o WhatsApp perde o GCLID nativo, a rota /track/whatsapp gera um código curto (lead_ref) injetado na mensagem inicial.',
  },
  {
    id: 1,
    step: '02',
    layer: 'Ponte WhatsApp',
    title: 'Webhook WABA & Match lead_ref',
    kpi: '98.4% Match Rate',
    accent: 'from-sky-400 to-indigo-500',
    shortDesc: 'Vincula o telefone do paciente ao clique original ou aciona fallback temporal.',
    logLine: '🔗 [WABA-WEBHOOK] Mensagem de +55679**** | lead_ref="WE-7492" -> Match Determinístico!',
    code: `{
  "event": "whatsapp.message.received",
  "lead_ref": "WE-7492",
  "match_type": "DETERMINISTIC_GCLID",
  "confidence": 1.00
}`,
    rule: 'Se o paciente apagar o código da mensagem, o motor cruza DDD + janela temporal de 15 min + sessão ativa.',
  },
  {
    id: 2,
    step: '03',
    layer: 'CRM & Governança',
    title: 'Filtro de Qualificação Clínica',
    kpi: 'Zero Sinal Sujo',
    accent: 'from-indigo-400 to-violet-500',
    shortDesc: 'Bloqueia curiosos e só libera Pacientes Qualificados e Consultas Agendadas.',
    logLine: '🛡️ [CRM-ENGINE] Lead #WE-7492 classificado: CONSULTA_AGENDADA (Valor: R$ 450,00).',
    code: `INSERT INTO conversion_outbox (lead_id, action, val, status)
SELECT id, 'CONSULTA_AGENDADA', 450.00, 'PENDING'
FROM leads WHERE status = 'AGENDADO';`,
    rule: 'Curiosos desqualificados por convênio ou preço são barrados no CRM para não contaminar o aprendizado do Google Ads.',
  },
  {
    id: 3,
    step: '04',
    layer: 'Worker Outbox',
    title: 'Hash SHA-256 & Fila Tolerante',
    kpi: 'LGPD & Idempotente',
    accent: 'from-violet-400 to-fuchsia-500',
    shortDesc: 'Deduplica por order_id, aplica SHA-256 e controla partial_failure.',
    logLine: '🔒 [OUTBOX-WORKER] Payload assinado | orderId="WE-7492-AG" | SHA-256 Enhanced Lead pronto.',
    code: `{
  "orderId": "WE-7492-AGENDADO",
  "gclid": "Cj0KCQiA5-uuBhDzARIs...",
  "conversionValue": 450.00,
  "hashedPhoneNumber": "e3b0c44298fc1c..."
}`,
    rule: 'Garante que nenhuma conversão seja perdida ou duplicada mesmo se a API do Google oscilar.',
  },
  {
    id: 4,
    step: '05',
    layer: 'Google Ads API',
    title: 'Smart Bidding por Receita Real',
    kpi: '38 Clínicas Ativas',
    accent: 'from-emerald-400 to-teal-500',
    shortDesc: 'ConversionUploadService retroalimenta o leilão com pacientes reais.',
    logLine: '🚀 [GOOGLE-ADS-API] HTTP 200 OK | Sinal de Consulta Agendada (R$ 450) enviado ao Smart Bidding!',
    code: `if (qualifiedLeads30d >= 30 && matchRate >= 0.85) {
  promotePrimaryGoal("CONSULTA_AGENDADA_OFFLINE");
  enableTargetROAS();
}`,
    rule: 'Transforma +R$ 85.000/mês de verba médica em agendamentos previsíveis, otimizando para lucro real.',
  },
];

// ============================================================================
// 3. ECOSSISTEMA MCP DOS CANAIS DE TRÁFEGO & SISTEMAS DE IA (FECHAMENTO DO CICLO)
// ============================================================================
const MCP_TRAFFIC_CHANNELS = [
  {
    id: 'meta_mcp',
    step: 'CANAL 01',
    channel: 'Meta Marketing API (Graph v25.0)',
    toolName: 'meta_ads_analisar_lucratividade & meta_ads_diagnostico_otimizacao',
    badge: 'Live API + Contingência',
    accent: 'from-cyan-400 to-blue-500',
    problemSolved:
      'Elimina a análise cega de Gerenciador de Anúncios: cruza Spend, CTR, CPC e Frequência de cada campanha direto com a Margem de Contribuição e o Custo Fixo no motor JAX.',
    decisionRule:
      'Se ROAS ≥ 4.0x e CTR ≥ 1.8% → ESCALAR (+15–20% budget) | Se Frequência ≥ 2.5x → OTIMIZAR_CRIATIVO (dispara gerador AIDA) | Se CAC ≥ Margem → STOP LOSS IMEDIATO.',
    payload: `// Tool MCP: meta_ads_analisar_lucratividade(periodo="last_30d", cogs_pct=0.35)
{
  "canal": "Meta Ads (Facebook & Instagram)",
  "conector": "MetaToFinanceConnector -> FinanceEngine (JAX @jit)",
  "diagnostico_campanhas": [
    { "campanha": "[C.A] Conversão Direct", "roas": 6.4, "ctr": 2.35, "freq": 1.6, "acao": "ESCALAR (+20%)" },
    { "campanha": "Remarketing Catálogo", "roas": 2.1, "ctr": 0.85, "freq": 3.1, "acao": "OTIMIZAR_CRIATIVO" }
  ],
  "dre_integrada": { "status_operacao": "LUCRO_REAL", "protecao_stoploss": "ATIVA" }
}`,
  },
  {
    id: 'google_mcp',
    step: 'CANAL 02',
    channel: 'Google Ads API + Motor SEO IPM (JAX)',
    toolName: 'ConversionUploadService (GCLID) & capvi_analisar_palavra_chave_seo',
    badge: 'Offline GCLID + Oceano Azul',
    accent: 'from-emerald-400 to-teal-500',
    problemSolved:
      'Une a captura de intenção consciente (Search) à atribuição offline (GCLID → WhatsApp → CRM) e descobre palavras-chave subexploradas pelo Índice de Potencial de Mercado (IPM).',
    decisionRule:
      'Fórmula Vetorial JAX: IPM = (Volume × (1 - Concorrência/100)) / (CPC + 0.01). Se IPM > 10.000 → "Oceano Azul" (alocar verba de Search e produzir artigo GEO automaticamente).',
    payload: `// Tool MCP: capvi_analisar_palavra_chave_seo(palavra_chave="implante capilar campo grande")
{
  "canal": "Google Search & Organic GEO",
  "simulacao_mercado": { "search_volume": 5400, "competition_index": 28.0, "cpc_brl": 1.45 },
  "analise_ipm_jax": {
    "score": 2663.01,
    "classification": "Oceano Azul / Alta Eficiência",
    "acao_recomendada": "Ativar grupo de anúncios exato + alimentar Smart Bidding via GCLID Offline"
  }
}`,
  },
  {
    id: 'tiktok_mcp',
    step: 'CANAL 03',
    channel: 'TikTok API + Fábrica de Criativos V3',
    toolName: 'meta_ads_gerar_sugestoes_criativos & video_criar_e_enviar_rascunho_tiktok',
    badge: 'Auto-Render 9:16 + OAuth',
    accent: 'from-violet-400 to-fuchsia-500',
    problemSolved:
      'Quando o servidor MCP detecta saturação de público (Frequência ≥ 2.5x) ou queda de CTR (< 1.0%) nos canais de tráfego, ele gera novos roteiros AIDA e renderiza vídeos verticais sem gargalo humano.',
    decisionRule:
      'Gera 3 ângulos de criativo (Dor Imediata, Prova Social e Escassez) com Hook Visual de 3s → Aciona Ollama/Llama 3.2 + Kokoro TTS + Whisper STT + FFmpeg → Envia ao TikTok (BY_DRAFT).',
    payload: `// Pipeline MCP: Fadiga Detectada -> Gera Copy AIDA -> Renderiza Vídeo -> TikTok Draft
{
  "gatilho": "Frequência 3.1x detectada na campanha Meta/TikTok",
  "angulo_gerado": "Dor / Problema Imediato (Hook 3s + Copy AIDA)",
  "render_pipeline": "Llama 3.2 Local + Kokoro TTS + Faster-Whisper + Pexels B-Roll + FFmpeg 60fps",
  "tiktok_oauth": { "perfil": "@som_do_infinito", "modo": "BY_DRAFT", "status": "ENVIADO_AO_APP" }
}`,
  },
  {
    id: 'jax_cortex',
    step: 'CÓRTEX DRE',
    channel: 'Capvi IA • Motor DRE Pro & Growth (Google JAX)',
    toolName: 'capvi_simular_dre_financeiro & capvi_calcular_ice_growth',
    badge: '112k Pedidos Calibrados',
    accent: 'from-amber-400 to-orange-500',
    problemSolved:
      'É o cérebro financeiro que governa todos os canais: recebe o investimento e o ROAS em tempo real das APIs de tráfego e calcula Impostos, Frete, COGS, Margem de Contribuição, EBITDA e Breakeven.',
    decisionRule:
      'Aplica a metodologia Kotler + V4 AERM + Growth Hacking (ICE Score = Impacto × Confiança × Facilidade) e segmenta a base de clientes por RFM Z-Score (Campeões, Leais, Em Risco).',
    payload: `// Tool MCP: capvi_simular_dre_financeiro(investimento, roas, custos_fixos, cogs_pct=0.35)
{
  "motor": "MathIntelligenceJAX (@jit XLA Compiled)",
  "benchmarks_calibrados": { "ticket_medio_br": 120.65, "base_olist": "112.000 pedidos" },
  "governanca_cac": {
    "zona_1_alvo": "40% da Margem de Contribuição (ROI 2.50x -> Escalar)",
    "zona_2_limite": "55% da Margem de Contribuição (ROI 1.82x -> Otimizar)",
    "zona_3_stoploss": "100% da Margem de Contribuição (Lucro Zero -> Pausar Ads)"
  }
}`,
  },
];

const LAB_SYSTEMS = [
  {
    id: 'mcp',
    name: 'Antigravity MCP Traffic Hub',
    subtitle: 'Python • MCP 2.x (Streamable HTTP) • Cloudflare Tunnel • 23 Tools',
    score: 99,
    metricLabel: 'Meta + Google + TikTok API',
    repoUrl: 'https://github.com/marco101aurelio-a11y/mcp',
    accent: 'cyan',
    summary:
      'Orquestrador central em Python que expõe 23 ferramentas via Model Context Protocol (local e via túnel seguro mcp.promptpulse.com.br/mcp), conectando LLMs às APIs da Meta, Google Ads, TikTok e ao motor DRE em JAX.',
    cmd: 'mcp.call_tool("meta_ads_analisar_lucratividade", {"periodo": "last_30d", "cogs_pct": 0.35})',
    telemetry: [
      { label: 'Protocolo MCP 2.x', value: 'Streamable HTTP', status: 'optimal' },
      { label: 'Tools Expostas', value: '23 Ferramentas', status: 'optimal' },
      { label: 'Túnel Público', value: 'Cloudflare QUIC', status: 'optimal' },
    ],
    logs: [
      '⚡ [MCP-HUB] Túnel QUIC ativo em https://mcp.promptpulse.com.br/mcp...',
      '✔ [META-API] Conta act_317590331118373 autenticada (Graph API v25.0)',
      '✔ [JAX-BRIDGE] MetaToFinanceConnector -> DRE Pro e Breakeven calculados',
      '★ [DECISÃO IA] 2 campanhas para ESCALAR (+20%) | 1 criativo enviado p/ renovação AIDA',
    ],
  },
  {
    id: 'capvi_jax',
    name: 'Capvi IA • Motor DRE & SEO (JAX)',
    subtitle: 'FastAPI + Google JAX (@jit) + React 18 + RFM Z-Score',
    score: 98,
    metricLabel: 'Córtex Financeiro & IPM',
    repoUrl: 'https://github.com/marco101aurelio-a11y/projetoseo2',
    accent: 'emerald',
    summary:
      'Acelerador de lucratividade que une Kotler, V4 AERM e Growth Hacking. Calcula DRE Pro vetorial, Índice de Potencial de Mercado (IPM de SEO), Matriz ICE e segmentação RFM calibrada com 112k pedidos.',
    cmd: 'capvi.simulate_dre(investimento=15000, roas=5.2, custos_fixos=4500, cogs_pct=0.35)',
    telemetry: [
      { label: 'Engine Numérica', value: 'Google JAX @jit', status: 'optimal' },
      { label: 'Benchmark Base', value: '112k Pedidos', status: 'optimal' },
      { label: 'Classificação SEO', value: 'IPM Oceano Azul', status: 'optimal' },
    ],
    logs: [
      '🧠 [CORTEX-JAX] Compilando tensores de DRE Pro, Margem de Contribuição e EBITDA...',
      '✔ [SEO-ENGINE] IPM = (Vol * (1 - Conc/100)) / CPC -> Oportunidades Oceano Azul mapeadas',
      '✔ [CRM-RFM] Base classificada via Z-Score: Campeões, Leais e Em Risco (WABA Trigger)',
      '★ [BREAKEVEN] Engenharia reversa concluída: teto de CAC e verba mínima travados!',
    ],
  },
  {
    id: 'promptpulse',
    name: 'PromptPulse SEO/GEO & WABA Engine',
    subtitle: 'Next.js 16 + Python + Auditoria Semântica + WABA Tier 10k',
    score: 98,
    metricLabel: 'Score GEO 98/100',
    repoUrl: 'https://github.com/marco101aurelio-a11y/promptpulse-blog-',
    accent: 'violet',
    summary:
      'Fábrica autônoma de conteúdo SEO/GEO (Google, ChatGPT, Perplexity e Gemini) com internal linking automático, aliada à operação oficial de WhatsApp (WABA Cloud API + RespondeChat) com 91,4% de abertura.',
    cmd: 'mcp.call_tool("blog_disparar_geracao", {"palavra_chave": "mcp trafego pago", "tema": "martech"})',
    telemetry: [
      { label: 'Schema JSON-LD', value: 'Validado', status: 'optimal' },
      { label: 'WABA Oficial', value: 'GREEN (10k/dia)', status: 'optimal' },
      { label: 'Taxa de Leitura', value: '91.4% WhatsApp', status: 'optimal' },
    ],
    logs: [
      '🔍 [SEO-GEO] Extraindo oportunidades e lacunas semânticas via Keyword Engine...',
      '✔ [AUDITOR-IA] Artigo técnico gerado, auditado e linkado ao cluster principal',
      '✔ [WABA-CLOUD] Template oficial disparado para base segmentada (91.4% leitura)',
      '★ [PUBLICAÇÃO] Deploy automático em Markdown/Next.js e WordPress REST API!',
    ],
  },
  {
    id: 'videobot',
    name: 'Dark Video Pipeline V3 & TikTok Bot',
    subtitle: 'Python + Ollama (Llama 3.2) + Kokoro TTS + Faster-Whisper + FFmpeg',
    score: 96,
    metricLabel: '364+ Vídeos Renderizados',
    repoUrl: 'https://github.com/marco101aurelio-a11y/cria-ao-de-conteudo',
    accent: 'amber',
    summary:
      'Esteira automatizada para criativos e vídeos verticais (TikTok/Reels/Shorts): roteirização via LLM local (Ollama) ou Claude/OpenRouter, voz neural Kokoro/ElevenLabs, alinhamento Whisper STT e upload OAuth no TikTok.',
    cmd: 'mcp.call_tool("video_criar_e_enviar_rascunho_tiktok", {"tema": "criativo_aida_alta_conversao"})',
    telemetry: [
      { label: 'LLM & Voz Neural', value: 'Llama 3.2 + Kokoro', status: 'optimal' },
      { label: 'Sincronia Legenda', value: 'Whisper Word-Level', status: 'optimal' },
      { label: 'TikTok OAuth API', value: 'Auto-Draft Inbox', status: 'optimal' },
    ],
    logs: [
      '🎬 [M1-ROTEIRO] Gancho de 3s + estrutura AIDA gerados com mapeamento multi-clip...',
      '🎙️ [M2/M3-ÁUDIO] Locução neural sintetizada + timestamps alinhados via Faster-Whisper...',
      '⚡ [M4/M5-RENDER] Takes Pexels 9:16 + Color Grading + Legendas dinâmicas via FFmpeg...',
      '★ [M6-TIKTOK] Vídeo publicado direto nos Rascunhos do TikTok (@som_do_infinito)!',
    ],
  },
];

// ============================================================================
// 4. TRAJETÓRIA HÍBRIDA (2013 → 2026)
// ============================================================================
const CAREER_NODES = [
  {
    year: '2013–2019',
    label: 'Raiz & Argentina',
    role: 'Google Ads (2013), Orquestra UFGD & Intercâmbio UNR (Argentina)',
    badge: 'Espanhol C2 Fluente',
    desc: 'Primeiro contato com Google Ads em 2013. Vivência acadêmica na Universidad Nacional de Rosario (Argentina), desenvolvendo fluência C2 em espanhol, liderança estudantil (ALDE) e repertório analítico.',
  },
  {
    year: '2020–2021',
    label: 'Americanas.com',
    role: 'Analista de Vendas & Operação O2O (Online-to-Offline)',
    badge: 'Varejo & Logística',
    desc: 'Integração entre o e-commerce da Americanas.com e a loja física em Dourados: faturamento, controle de qualidade, logística de entrega e pós-venda. Visão real de operação comercial.',
  },
  {
    year: '2021–2022',
    label: 'Agência I-Com',
    role: 'Social Media & Planejamento Criativo Cross-Media',
    badge: '10+ Grandes Contas',
    desc: 'Ponte entre mídia tradicional (TV, rádio, outdoor) e digital para marcas como Shopping Avenida Center, Coopsema, CENED, Immunitas, Ibis Hotel e Móveis Plazza.',
  },
  {
    year: '2022–2025',
    label: 'Mixs & MOV',
    role: 'Gestor de Marketing/Comercial & Sócio E-commerce',
    badge: 'R$ 879,3k Auditados',
    desc: 'Criador da metodologia Drawflow (Fast Traffic + Inbound Direto), automação no RD Station/Segsmart e liderança da operação que gerou R$ 879,3 mil no PDV com ROAS de 96,4x.',
  },
  {
    year: '2025–2026',
    label: 'V4 Company',
    role: 'Gestor de Tráfego & Performance (Growth Scientist)',
    badge: 'Governança DRE & CAC',
    desc: 'Desenho de funis Inside Sales e Self-Service (Meta, Google e TikTok Ads), matriz de governança de CAC (Alvo 40%, Aceitável 55% e Stop Loss) e dashboards em Looker Studio.',
  },
  {
    year: '2026–Atual',
    label: 'We Marketing Médico',
    role: 'Analista Pleno & Estrategista Martech / IA',
    badge: '38 Clínicas • +R$ 85k/mês',
    desc: 'Arquitetura BPMN 2.0 de Conversão Offline (GCLID → WhatsApp → CRM → Google Ads API), servidores MCP em Python para diagnóstico de campanhas e engenharia de SEO/GEO.',
  },
];

type ViewMode = 'cockpit' | 'bpmn' | 'performance' | 'dre' | 'aistudio';

export default function PortfolioClient() {
  const [view, setView] = useState<ViewMode>('cockpit');

  // --- Estado BPMN Live Simulation ---
  const [activeNode, setActiveNode] = useState<number>(0);
  const [simulatingBpmn, setSimulatingBpmn] = useState<boolean>(false);
  const [serverLogs, setServerLogs] = useState<string[]>([
    '✨ [SERVIDOR WE] Fluxo GCLID → WhatsApp → CRM pronto. Clique em "Testar Fluxo Real" para ver etapa por etapa.',
  ]);

  useEffect(() => {
    if (!simulatingBpmn) return;
    let idx = 0;
    setServerLogs(['🚀 [SESSION-START] Paciente clicou no anúncio Google Search (Psiquiatria)...']);
    setActiveNode(0);

    const timer = setInterval(() => {
      if (idx < BPMN_NODES.length) {
        const node = BPMN_NODES[idx];
        setActiveNode(idx);
        setServerLogs((prev) => [...prev, node.logLine]);
        idx += 1;
      } else {
        setSimulatingBpmn(false);
        clearInterval(timer);
      }
    }, 850);

    return () => clearInterval(timer);
  }, [simulatingBpmn]);

  // --- Estado Curva de Performance 19 Semanas ---
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [playingWeeks, setPlayingWeeks] = useState<boolean>(false);
  const [drawflowPillar, setDrawflowPillar] = useState<'fast' | 'inbound' | 'retention'>('fast');

  useEffect(() => {
    if (!playingWeeks) return;
    const t = setInterval(() => {
      setSelectedWeek((prev) => (prev + 1) % PDV_WEEKLY_DATA.length);
    }, 850);
    return () => clearInterval(t);
  }, [playingWeeks]);

  const weekData = PDV_WEEKLY_DATA[selectedWeek];

  // Curva Suave SVG (19 Semanas)
  const svgChart = useMemo(() => {
    const width = 760;
    const height = 210;
    const padX = 24;
    const padY = 24;
    const maxRev = 130000;

    const pts = PDV_WEEKLY_DATA.map((d, i) => {
      const x = padX + (i / (PDV_WEEKLY_DATA.length - 1)) * (width - padX * 2);
      const y = height - padY - (d.revenue / maxRev) * (height - padY * 2);
      return { x, y, d };
    });

    let pathD = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const xc = (pts[i].x + pts[i + 1].x) / 2;
      const yc = (pts[i].y + pts[i + 1].y) / 2;
      pathD += ` Q ${pts[i].x} ${pts[i].y}, ${xc} ${yc}`;
    }
    pathD += ` T ${pts[pts.length - 1].x} ${pts[pts.length - 1].y}`;

    const areaD = `${pathD} L ${pts[pts.length - 1].x} ${height - padY} L ${pts[0].x} ${height - padY} Z`;

    return { width, height, pts, pathD, areaD };
  }, []);

  // ==========================================================================
  // ENGENHARIA REAL DA PLANILHA: "DRE Projetado + Ponto de Equilíbrio - unidade 1.xlsx"
  // Fiel às 3 abas reais do Marco:
  // 1) CLIENTE SEM CAC MAPEADO (Gera as 3 zonas: CAC Alvo 40% MC, CAC Aceitável 55% MC, Stop Loss 100% MC)
  // 2) CLIENTE COM CAC MAPEADO (Audita o CAC real do cliente contra o Breakeven e Rateio Digital)
  // 3) DRE PROJETADO 12 MESES (Simula degradação marginal de ROAS -5%/trimestre vs. Taxa de Recompra LTV +33%)
  // ==========================================================================
  const [dreCase, setDreCase] = useState<'v4_com_cac' | 'v4_sem_cac' | 'clinica_we'>('v4_com_cac');
  const [ticket, setTicket] = useState<number>(96); // Valor real da aba COM_CAC (C5 = 96.0)
  const [taxPct, setTaxPct] = useState<number>(10); // Imposto C8 = 10%
  const [gatewayPct, setGatewayPct] = useState<number>(2.5); // Taxa Gateway D10 = 2.5%
  const [cmvPct, setCmvPct] = useState<number>(0); // Custo produto/serviço
  const [commissionPct, setCommissionPct] = useState<number>(0.9); // Comissão C11 = 0.9%
  const [companyFixedTotal, setCompanyFixedTotal] = useState<number>(14000); // Aluguel, folha, luz, internet
  const [digitalSharePct, setDigitalSharePct] = useState<number>(20); // Regra D20: Equivalência do canal digital (20%)
  const [martechFeeAndTools, setMartechFeeAndTools] = useState<number>(2880); // C18 Fee V4 (2700) + C19 Ferramentas CRM/WABA (180)
  const [mappedCac, setMappedCac] = useState<number>(18.5); // CAC atual sendo auditado
  const [retentionRatePct, setRetentionRatePct] = useState<number>(33); // Aba DRE B12: Taxa de retorno/LTV (33%)

  const selectDreCase = (c: 'v4_com_cac' | 'v4_sem_cac' | 'clinica_we') => {
    setDreCase(c);
    if (c === 'v4_com_cac') {
      // Valores exatos da aba CLIENTE COM CAC MAPEADO
      setTicket(96);
      setTaxPct(10);
      setGatewayPct(0);
      setCmvPct(0);
      setCommissionPct(0.9);
      setCompanyFixedTotal(0);
      setDigitalSharePct(20);
      setMartechFeeAndTools(2880); // R$ 2.700 Fee + R$ 180 Ferramentas
      setMappedCac(7.89);
      setRetentionRatePct(33);
    } else if (c === 'v4_sem_cac') {
      // Valores inspirados na aba CLIENTE SEM CAC MAPEADO (Ticket R$ 109, Comissão 45%)
      setTicket(109);
      setTaxPct(0);
      setGatewayPct(0);
      setCmvPct(0);
      setCommissionPct(45);
      setCompanyFixedTotal(18000);
      setDigitalSharePct(25);
      setMartechFeeAndTools(2500);
      setMappedCac(23.98); // = C14 * 0.4
      setRetentionRatePct(25);
    } else {
      // Cenário Real Clínica Médica (We Marketing Médico)
      setTicket(450);
      setTaxPct(11);
      setGatewayPct(2);
      setCmvPct(0);
      setCommissionPct(5);
      setCompanyFixedTotal(25000);
      setDigitalSharePct(40);
      setMartechFeeAndTools(3500);
      setMappedCac(85);
      setRetentionRatePct(35);
    }
  };

  const dreModel = useMemo(() => {
    // 1º Passo: Decomposição de Custos Variáveis (Aba SEM_CAC / COM_CAC linhas 6 a 15)
    const totalVarPct = taxPct + gatewayPct + cmvPct + commissionPct;
    const totalVarVal = ticket * (totalVarPct / 100);
    const marginVal = Math.max(ticket - totalVarVal, 1); // C14: Margem de Contribuição R$
    const marginPct = (marginVal / ticket) * 100; // C15: Margem de Contribuição %

    // 2º Passo: Equivalência de Custos Fixos do Canal Digital (Regra D20 + C18 + C19)
    const dilutedFixed = companyFixedTotal * (digitalSharePct / 100);
    const totalDigitalFixed = dilutedFixed + martechFeeAndTools; // C26/C27

    // 3º Passo: As 3 Zonas de Governança de Tráfego (Fórmulas exatas da planilha!)
    // Cenário 1: CAC Alvo (= C14 * 0.4 -> 40% da Margem de Contribuição -> ROI 2.5x)
    const cacTarget = marginVal * 0.4;
    const breakevenSalesTarget = Math.ceil(totalDigitalFixed / (marginVal - cacTarget));
    const mediaNeededTarget = breakevenSalesTarget * cacTarget;
    const roasTarget = mediaNeededTarget > 0 ? (breakevenSalesTarget * ticket) / mediaNeededTarget : 0;
    const roiTarget = 2.5; // (C29*C14)/C30 = 1 / 0.4 = 2.5x exato!

    // Cenário 2: CAC Aceitável (= C14 * 0.55 -> 55% da Margem de Contribuição -> ROI 1.82x)
    const cacAcceptable = marginVal * 0.55;
    const breakevenSalesAcceptable = Math.ceil(totalDigitalFixed / (marginVal - cacAcceptable));
    const mediaNeededAcceptable = breakevenSalesAcceptable * cacAcceptable;
    const roasAcceptable =
      mediaNeededAcceptable > 0 ? (breakevenSalesAcceptable * ticket) / mediaNeededAcceptable : 0;
    const roiAcceptable = 1 / 0.55; // 1.818x exato da célula C38!

    // Cenário 3: STOP LOSS (= C14 -> 100% da Margem de Contribuição -> Lucro Zero)
    const cacStopLoss = marginVal;

    // Diagnóstico do CAC Atual Mapeado do Cliente
    const netMarginAfterMappedCac = marginVal - mappedCac;
    const mappedBreakevenSales =
      netMarginAfterMappedCac > 0 ? Math.ceil(totalDigitalFixed / netMarginAfterMappedCac) : Infinity;
    const mappedMediaForBreakeven =
      mappedBreakevenSales !== Infinity ? mappedBreakevenSales * mappedCac : Infinity;
    const mappedRoas =
      mappedMediaForBreakeven !== Infinity && mappedMediaForBreakeven > 0
        ? (mappedBreakevenSales * ticket) / mappedMediaForBreakeven
        : 0;

    let zoneStatus: 'OPTIMAL' | 'WARNING' | 'STOPLOSS' = 'OPTIMAL';
    if (mappedCac >= cacStopLoss) {
      zoneStatus = 'STOPLOSS';
    } else if (mappedCac > cacAcceptable) {
      zoneStatus = 'WARNING';
    }

    // 4º Passo: Simulação da Aba DRE (12 Meses: Crescimento Ads +2%/mês, Perda ROAS -5%/trimestre, Recompra LTV)
    // Mostra como a Taxa de Retorno (B12 = 33%) salva o EBITDA quando o tráfego pago encarece na escala
    const baseMonthlySales = mappedBreakevenSales !== Infinity ? Math.max(mappedBreakevenSales + 40, 60) : 80;
    const m1NewRev = baseMonthlySales * ticket;
    const m1Media = baseMonthlySales * mappedCac;
    // No Mês 12, com perda de 5% a cada trimestre (~14% no ano), o CAC de aquisição sobe ~16%
    const m12Media = m1Media * Math.pow(1.02, 11);
    const m12Cac = mappedCac * 1.16;
    const m12NewSales = m12Media / Math.max(m12Cac, 1);
    const m12NewRev = m12NewSales * ticket;
    const m12RetentionRev = m12NewRev * (retentionRatePct / 100); // Receita recorrente s/ novo CAC!
    const ebitdaWithoutRetention = m12NewSales * marginVal - totalDigitalFixed - m12Media;
    const ebitdaWithRetention =
      (m12NewSales + m12NewSales * (retentionRatePct / 100)) * marginVal - totalDigitalFixed - m12Media;

    return {
      totalVarPct,
      totalVarVal,
      marginVal,
      marginPct,
      dilutedFixed,
      totalDigitalFixed,
      cacTarget,
      breakevenSalesTarget,
      mediaNeededTarget,
      roasTarget,
      roiTarget,
      cacAcceptable,
      breakevenSalesAcceptable,
      mediaNeededAcceptable,
      roasAcceptable,
      roiAcceptable,
      cacStopLoss,
      netMarginAfterMappedCac,
      mappedBreakevenSales,
      mappedMediaForBreakeven,
      mappedRoas,
      zoneStatus,
      ebitdaWithoutRetention,
      ebitdaWithRetention,
      m12RetentionRev,
    };
  }, [
    ticket,
    taxPct,
    gatewayPct,
    cmvPct,
    commissionPct,
    companyFixedTotal,
    digitalSharePct,
    martechFeeAndTools,
    mappedCac,
    retentionRatePct,
  ]);

  // --- Estado AI Studio, MCP Traffic Channels, Vídeo Pitch & Carreira ---
  const [selectedSystem, setSelectedSystem] = useState<number>(0);
  const [selectedMcpChannel, setSelectedMcpChannel] = useState<number>(0);
  const [logProgress, setLogProgress] = useState<number>(4);
  const [selectedCareerIdx, setSelectedCareerIdx] = useState<number>(5);
  const [videoReady, setVideoReady] = useState<boolean>(true);
  const [activeMediaTab, setActiveMediaTab] = useState<'video' | 'fotos'>('video');
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState<number>(0);

  const BASTIDORES_PHOTOS = [
    {
      src: '/portifolio/midia/foto-1.jpg',
      fallback: '/marco-aurelio.jpg',
      tag: 'Operação & Estratégia • Campo Grande / MS',
      title: 'Da trincheira comercial à engenharia de tráfego e dados',
      caption:
        'Mais de uma década conectando o que acontece no balcão de vendas e no WhatsApp das clínicas com o algoritmo do Google Ads e da Meta.',
    },
    {
      src: '/portifolio/midia/foto-2.jpg',
      fallback: '/covers/ads_mcp_cg_2026.jpg',
      tag: 'Bastidores • We Marketing Médico & V4',
      title: 'Auditoria diária de 38 clínicas médicas (+R$ 85k/mês) e DRE',
      caption:
        'Foi a dor de auditar dezenas de contas toda manhã que me levou a programar meu próprio Servidor MCP integrado à planilha de DRE.',
    },
    {
      src: '/portifolio/midia/foto-3.jpg',
      fallback: '/covers/human_in_the_loop_governanca_ia_2026.jpg',
      tag: 'Trajetória • UNR Argentina, Americanas & Mixs',
      title: 'Repertório humano antes da automação',
      caption:
        'Vivência na Universidad Nacional de Rosario (Espanhol C2), operação O2O na Americanas.com e R$ 879,3k gerados no PDV da Mixs.',
    },
  ];

  const triggerSystemSimulation = (idx: number) => {
    setSelectedSystem(idx);
    setLogProgress(0);
  };

  useEffect(() => {
    if (logProgress >= 4) return;
    const t = setTimeout(() => setLogProgress((p) => p + 1), 300);
    return () => clearTimeout(t);
  }, [logProgress]);

  const formatBRL = (n: number) =>
    n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

  const formatBRLCents = (n: number) =>
    n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 2 });

  return (
    <div className="relative min-h-screen bg-[#06070b] text-neutral-100 overflow-x-hidden pb-20 selection:bg-cyan-400/30">
      {/* =====================================================================
          ATMOSFERA LUMA SAAS (Auras Luminosas + Grid Sutil)
      ===================================================================== */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-48 left-1/4 w-[650px] h-[500px] rounded-full bg-cyan-500/12 blur-[140px]" />
        <div className="absolute top-32 right-1/5 w-[550px] h-[500px] rounded-full bg-violet-500/12 blur-[150px]" />
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[400px] rounded-full bg-emerald-500/8 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff09_1px,transparent_1px)] [background-size:28px_28px] opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
        {/* ===================================================================
            TOP FLOATING GLASS BAR (Identidade + Segmented Pill Dock + Ações)
        =================================================================== */}
        <div className="p-3 sm:p-4 rounded-[28px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_16px_40px_rgba(0,0,0,0.45)] flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 self-start lg:self-auto">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl p-0.5 bg-gradient-to-tr from-cyan-400 via-violet-400 to-emerald-400 shadow-lg shadow-cyan-500/20">
                <img
                  src="/marco-aurelio.jpg"
                  alt="Marco Aurélio"
                  className="w-full h-full rounded-[14px] object-cover"
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-[#06070b]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white tracking-tight text-sm sm:text-base">
                  Marco Aurélio
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-200 border border-cyan-400/30">
                  Martech & Growth OS
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Performance • Atribuição GCLID • Governança DRE (JAX) • MCP Traffic Hub
              </p>
            </div>
          </div>

          {/* Floating Segmented Pill Dock */}
          <div className="flex items-center gap-1 p-1.5 rounded-2xl bg-black/40 border border-white/[0.07] overflow-x-auto max-w-full no-scrollbar">
            {[
              { id: 'cockpit', label: 'Cockpit 360º', icon: Layers },
              { id: 'bpmn', label: 'Servidor GCLID', icon: GitBranch },
              { id: 'performance', label: 'Curva R$ 879k', icon: TrendingUp },
              { id: 'dre', label: 'Governança DRE & Stop-Loss', icon: Sliders },
              { id: 'aistudio', label: 'MCP Traffic Hub & IA', icon: Cpu },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = view === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setView(item.id as ViewMode)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-white/15 to-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_4px_12px_rgba(0,0,0,0.3)] border border-white/15'
                      : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-300' : 'text-neutral-500'}`} />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <a
              href="https://github.com/marco101aurelio-a11y"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl text-xs font-medium text-cyan-200 hover:text-white bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/25 transition flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-300" />
              GitHub
            </a>
            <a
              href="/portifolio/curriculo-marco-aurelio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl text-xs font-medium text-neutral-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-cyan-300" />
              CV
            </a>
            <a
              href="https://wa.me/5567996209923?text=Ol%C3%A1%20Marco!%20Vi%20seu%20portf%C3%B3lio%20Martech%20OS%20e%20quero%20conversar."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-950 bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-300 hover:opacity-95 transition shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Conectar
            </a>
          </div>
        </div>

        {/* ===================================================================
            VIEW 1: COCKPIT 360º (APRESENTAÇÃO HUMANA + VÍDEO PITCH + PROVAS REAIS)
        =================================================================== */}
        {view === 'cockpit' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Card Esquerdo: Carta de Apresentação em 1ª Pessoa + Métricas Reais de Trincheira */}
              <div className="lg:col-span-7 p-7 sm:p-9 rounded-[32px] bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent backdrop-blur-2xl border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.14)] flex flex-col justify-between relative overflow-hidden">
                <div className="pointer-events-none absolute -right-20 -top-20 w-72 h-72 rounded-full bg-cyan-400/10 blur-3xl" />

                <div className="space-y-5 relative z-10">
                  <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs text-cyan-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Prazer, sou o Marco Aurélio • Campo Grande, MS (Espanhol C2 • 10+ anos de mercado)
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-light tracking-tight text-white leading-[1.15]">
                    Eu não vim do código puro. Eu vim do{' '}
                    <span className="font-semibold bg-gradient-to-r from-cyan-200 via-violet-200 to-emerald-200 bg-clip-text text-transparent">
                      balcão de vendas e do tráfego pago — e programei o que faltava.
                    </span>
                  </h1>

                  <div className="space-y-3 text-sm sm:text-[15px] text-neutral-300/95 leading-relaxed max-w-2xl font-normal">
                    <p>
                      Comecei no Google Ads em 2013, passei pelo chão de loja da <strong className="text-white">Americanas.com</strong>, liderei a operação comercial e de marketing da <strong className="text-white">Mixs</strong> (<strong className="text-emerald-300">R$ 879,3 mil auditados no PDV</strong>), atuei como Growth Scientist na <strong className="text-white">V4 Company</strong> e hoje gerencio a estratégia de <strong className="text-cyan-200">38 clínicas médicas (+R$ 85k/mês) na We Marketing Médico</strong>.
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-400">
                      Construí este portfólio aberto para você testar na prática as <strong className="text-neutral-200">4 ferramentas reais</strong> que criei para resolver dores do meu dia a dia: o rastreamento de <strong className="text-white">GCLID no WhatsApp</strong>, a metodologia <strong className="text-white">Drawflow</strong>, a minha <strong className="text-white">planilha de DRE com trava de Stop-Loss</strong> e o <strong className="text-cyan-200">Servidor MCP dos Canais de Tráfego</strong> que fecha esse ciclo automaticamente.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-7 relative z-10">
                  <div
                    onClick={() => setView('performance')}
                    className="cursor-pointer group p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] transition"
                  >
                    <div className="text-[11px] text-neutral-400 flex items-center justify-between">
                      <span>Case Mixs (PDV)</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                    </div>
                    <div className="text-xl sm:text-2xl font-semibold text-white tracking-tight mt-1">
                      R$ 879,3k
                    </div>
                    <div className="text-[11px] text-emerald-300 mt-0.5">ROAS 96,4x em 19 sem.</div>
                  </div>

                  <div
                    onClick={() => setView('bpmn')}
                    className="cursor-pointer group p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] transition"
                  >
                    <div className="text-[11px] text-neutral-400 flex items-center justify-between">
                      <span>We Marketing Médico</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-violet-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                    </div>
                    <div className="text-xl sm:text-2xl font-semibold text-white tracking-tight mt-1">
                      38 Clínicas
                    </div>
                    <div className="text-[11px] text-violet-300 mt-0.5">+R$ 85k/mês • GCLID API</div>
                  </div>

                  <div
                    onClick={() => setView('aistudio')}
                    className="cursor-pointer group p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] transition"
                  >
                    <div className="text-[11px] text-neutral-400 flex items-center justify-between">
                      <span>Servidor MCP Próprio</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-emerald-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                    </div>
                    <div className="text-xl sm:text-2xl font-semibold text-white tracking-tight mt-1">
                      23 Tools
                    </div>
                    <div className="text-[11px] text-cyan-200 mt-0.5">Meta + Google + DRE JAX</div>
                  </div>
                </div>
              </div>

              {/* Card Direito: VÍDEO PITCH REAL DO MARCO & GALERIA DE BASTIDORES */}
              <div className="lg:col-span-5 p-6 sm:p-7 rounded-[32px] bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-2xl border border-white/[0.09] shadow-[inset_0_1px_1px_rgba(255,255,255,0.16)] flex flex-col justify-between relative overflow-hidden space-y-4">
                <div className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-violet-500/15 blur-3xl" />

                <div className="flex items-center justify-between gap-2 relative z-10">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-cyan-300 font-medium">
                      Bastidores & Demonstração Real
                    </span>
                    <h2 className="text-base sm:text-lg font-semibold text-white">
                      {activeMediaTab === 'video'
                        ? 'Vídeo: Eu explicando a arquitetura (Pitch)'
                        : 'Fotos Reais & Bastidores da Operação'}
                    </h2>
                  </div>

                  <div className="inline-flex p-1 rounded-xl bg-black/40 border border-white/[0.08]">
                    <button
                      onClick={() => setActiveMediaTab('video')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                        activeMediaTab === 'video'
                          ? 'bg-cyan-400/20 text-cyan-200 border border-cyan-400/30'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      🎥 Vídeo Pitch
                    </button>
                    <button
                      onClick={() => setActiveMediaTab('fotos')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                        activeMediaTab === 'fotos'
                          ? 'bg-cyan-400/20 text-cyan-200 border border-cyan-400/30'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      📸 Fotos ({BASTIDORES_PHOTOS.length})
                    </button>
                  </div>
                </div>

                {/* ABA DE MÍDIA 1: PLAYER DE VÍDEO NATIVO (/portifolio/midia/pitch-marco.mp4) */}
                {activeMediaTab === 'video' ? (
                  <div className="space-y-3 relative z-10">
                    <div className="relative rounded-2xl overflow-hidden bg-black/60 border border-white/[0.1] aspect-video flex items-center justify-center group">
                      {videoReady ? (
                        <video
                          controls
                          preload="metadata"
                          poster="/marco-aurelio.jpg"
                          onError={() => setVideoReady(false)}
                          className="w-full h-full object-cover"
                        >
                          <source src="/portifolio/midia/pitch-marco.mp4" type="video/mp4" />
                          Seu navegador não suporta vídeo HTML5.
                        </video>
                      ) : (
                        <div className="relative w-full h-full flex flex-col justify-between p-5 bg-gradient-to-t from-black/90 via-black/60 to-black/30">
                          <img
                            src="/marco-aurelio.jpg"
                            alt="Marco Aurélio"
                            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition duration-500"
                          />
                          <div className="relative z-10 flex items-center justify-between">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
                              Walkthrough em 1ª Pessoa • Marco Aurélio
                            </span>
                            <span className="text-[11px] font-mono text-cyan-200">1m30s</span>
                          </div>
                          <div className="relative z-10 space-y-1.5">
                            <div className="text-sm sm:text-base font-semibold text-white">
                              &ldquo;Como conectei GCLID, Planilha de DRE e o Servidor MCP nos canais de tráfego&rdquo;
                            </div>
                            <p className="text-[11px] text-neutral-300 leading-relaxed">
                              Coloque seu arquivo de vídeo em <code className="text-cyan-300">public/portifolio/midia/pitch-marco.mp4</code> para ativar o player nativo automaticamente.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Capítulos do Vídeo / O que mostro na tela */}
                    <div className="grid grid-cols-3 gap-2 text-[11px]">
                      <div
                        onClick={() => setView('bpmn')}
                        className="cursor-pointer p-2.5 rounded-xl bg-black/35 hover:bg-white/[0.06] border border-white/[0.06] transition"
                      >
                        <span className="font-mono text-cyan-300 block">00:00 • Parte 1</span>
                        <span className="text-neutral-200 font-medium">O gargalo do GCLID no WhatsApp</span>
                      </div>
                      <div
                        onClick={() => setView('dre')}
                        className="cursor-pointer p-2.5 rounded-xl bg-black/35 hover:bg-white/[0.06] border border-white/[0.06] transition"
                      >
                        <span className="font-mono text-violet-300 block">00:40 • Parte 2</span>
                        <span className="text-neutral-200 font-medium">Minha planilha DRE & Stop-Loss</span>
                      </div>
                      <div
                        onClick={() => setView('aistudio')}
                        className="cursor-pointer p-2.5 rounded-xl bg-black/35 hover:bg-white/[0.06] border border-white/[0.06] transition"
                      >
                        <span className="font-mono text-emerald-300 block">01:15 • Parte 3</span>
                        <span className="text-neutral-200 font-medium">O MCP rodando na Meta/Google</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ABA DE MÍDIA 2: GALERIA DE FOTOS REAIS DO MARCO (/portifolio/midia/foto-1.jpg, foto-2.jpg, foto-3.jpg) */
                  <div className="space-y-3 relative z-10">
                    <div className="relative rounded-2xl overflow-hidden bg-black/60 border border-white/[0.1] aspect-video">
                      <img
                        src={BASTIDORES_PHOTOS[selectedPhotoIdx].src}
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== window.location.origin + BASTIDORES_PHOTOS[selectedPhotoIdx].fallback) {
                            target.src = BASTIDORES_PHOTOS[selectedPhotoIdx].fallback;
                          }
                        }}
                        alt={BASTIDORES_PHOTOS[selectedPhotoIdx].title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent">
                        <span className="text-[10px] font-mono text-cyan-300 uppercase">
                          {BASTIDORES_PHOTOS[selectedPhotoIdx].tag}
                        </span>
                        <div className="text-sm font-semibold text-white mt-0.5">
                          {BASTIDORES_PHOTOS[selectedPhotoIdx].title}
                        </div>
                        <p className="text-[11px] text-neutral-300 mt-0.5 leading-snug">
                          {BASTIDORES_PHOTOS[selectedPhotoIdx].caption}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {BASTIDORES_PHOTOS.map((photo, idx) => (
                        <button
                          key={photo.tag}
                          onClick={() => setSelectedPhotoIdx(idx)}
                          className={`p-2 rounded-xl border text-left transition ${
                            selectedPhotoIdx === idx
                              ? 'bg-white/15 border-cyan-300/60 text-white'
                              : 'bg-black/35 border-white/[0.06] text-neutral-400 hover:text-white'
                          }`}
                        >
                          <div className="text-[10px] font-mono text-cyan-300 truncate">Foto 0{idx + 1}</div>
                          <div className="text-[11px] font-medium truncate">{photo.title}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Segunda Linha do Cockpit: Mini-Curva SVG (19 Semanas) + Matriz Governança DRE + AI Co-Pilot */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Card Curva Suave SVG (Preview) */}
              <div className="lg:col-span-5 p-6 sm:p-7 rounded-[32px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-emerald-300">
                      Auditoria PDV • 19 Semanas
                    </span>
                    <h3 className="text-lg font-semibold text-white">
                      Curva de Receita vs. CAC ({weekData.week})
                    </h3>
                  </div>
                  <button
                    onClick={() => setPlayingWeeks(!playingWeeks)}
                    className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-cyan-300 transition"
                  >
                    {playingWeeks ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                </div>

                <div className="relative pt-2">
                  <svg viewBox={`0 0 ${svgChart.width} ${svgChart.height}`} className="w-full h-36 overflow-visible">
                    <defs>
                      <linearGradient id="lumaRing" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#67e8f9" />
                        <stop offset="50%" stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#34d399" />
                      </linearGradient>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.38" />
                        <stop offset="60%" stopColor="#a78bfa" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d={svgChart.areaD} fill="url(#areaGrad)" />
                    <path
                      d={svgChart.pathD}
                      fill="none"
                      stroke="url(#lumaRing)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    {svgChart.pts.map((pt, idx) => {
                      const isSel = idx === selectedWeek;
                      return (
                        <g
                          key={pt.d.week}
                          className="cursor-pointer"
                          onClick={() => setSelectedWeek(idx)}
                        >
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={isSel ? 7 : 3.5}
                            fill={isSel ? '#ffffff' : '#67e8f9'}
                            stroke={isSel ? '#67e8f9' : 'transparent'}
                            strokeWidth={isSel ? 4 : 0}
                          />
                        </g>
                      );
                    })}
                  </svg>
                </div>

                <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-black/30 border border-white/[0.06] text-xs">
                  <div>
                    <span className="text-neutral-400 text-[10px] block">{weekData.period}</span>
                    <span className="font-semibold text-white">{formatBRL(weekData.revenue)}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 text-[10px] block">Fechamentos CRM</span>
                    <span className="font-semibold text-emerald-300">{weekData.sales} vendas</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 text-[10px] block">ROAS / CAC</span>
                    <span className="font-semibold text-cyan-200">
                      {weekData.roas.toFixed(0)}x ({formatBRLCents(weekData.cac)})
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Governança de Tráfego por DRE (Agora com contexto real: CAC Alvo 40%, Aceitável 55%, Stop Loss 100%) */}
              <div className="lg:col-span-4 p-6 sm:p-7 rounded-[32px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-violet-300">
                    Governança Financeira de Mídia (V4 / DRE)
                  </span>
                  <h3 className="text-lg font-semibold text-white mt-0.5">
                    Travas de CAC & Ponto de Equilíbrio
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    Como uso a Margem de Contribuição do cliente para definir quando escalar e o <strong className="text-rose-300">Stop Loss</strong> exato de pausa de campanha:
                  </p>
                </div>

                {/* As 3 Zonas Reais da Planilha */}
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-400/25 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-emerald-300 block">1. CAC Alvo (40% da MC)</span>
                      <span className="text-[10px] text-neutral-400">Zona de Escala • ROI 2,50x s/ margem</span>
                    </div>
                    <span className="font-mono font-bold text-white">{formatBRLCents(dreModel.cacTarget)}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/25 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-amber-300 block">2. CAC Aceitável (55% da MC)</span>
                      <span className="text-[10px] text-neutral-400">Zona Limite • ROI 1,82x s/ margem</span>
                    </div>
                    <span className="font-mono font-bold text-white">{formatBRLCents(dreModel.cacAcceptable)}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-400/25 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-rose-300 block">3. Stop Loss (100% da MC)</span>
                      <span className="text-[10px] text-neutral-400">Lucro Zero • Pausa imediata de Ads</span>
                    </div>
                    <span className="font-mono font-bold text-rose-300">{formatBRLCents(dreModel.cacStopLoss)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setView('dre')}
                  className="w-full py-2.5 rounded-xl bg-white/[0.07] hover:bg-white/[0.12] border border-white/[0.1] text-xs font-semibold text-white transition"
                >
                  Auditar Cenários & Rateio Digital →
                </button>
              </div>

              {/* Card AI Co-Pilot & Trajetória */}
              <div className="lg:col-span-3 p-6 sm:p-7 rounded-[32px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-cyan-300">
                    Fechamento do Ciclo • MCP
                  </span>
                  <h3 className="text-lg font-semibold text-white">MCP Traffic Hub & JAX</h3>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    Servidor MCP conectando Meta, Google e TikTok APIs direto ao DRE vetorial e esteira de criativos.
                  </p>
                </div>

                <div className="space-y-2">
                  {LAB_SYSTEMS.map((sys, idx) => (
                    <button
                      key={sys.id}
                      onClick={() => {
                        triggerSystemSimulation(idx);
                        setView('aistudio');
                      }}
                      className="w-full p-2.5 rounded-xl bg-black/30 hover:bg-white/[0.07] border border-white/[0.06] flex items-center justify-between text-xs transition"
                    >
                      <span className="font-medium text-neutral-200 truncate pr-2">{sys.name}</span>
                      <span className="text-[10px] font-mono text-cyan-300 shrink-0">{sys.score}%</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setView('aistudio')}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-violet-500/20 hover:from-cyan-500/30 hover:to-violet-500/30 border border-cyan-400/30 text-xs font-semibold text-cyan-200 transition"
                >
                  Ver MCP dos Canais de Tráfego →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            VIEW 2: SERVIDOR DE ATRIBUIÇÃO GCLID (BPMN 2.0 VISUAL NODE CANVAS)
        =================================================================== */}
        {view === 'bpmn' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="p-6 sm:p-8 rounded-[32px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] space-y-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-2 max-w-3xl">
                  <span className="text-xs uppercase tracking-wider text-cyan-300 font-medium">
                    Na Trincheira da We Marketing Médico • 38 Clínicas (+R$ 85k/mês)
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-light text-white">
                    Como resolvi a perda de rastreamento no WhatsApp:{' '}
                    <span className="font-semibold text-cyan-200">GCLID → WABA → CRM → Google Ads</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Cuidando de 38 clínicas médicas, percebi que o Google Ads ficava &ldquo;cego&rdquo; quando o paciente saía da Landing Page para o WhatsApp: a campanha otimizava para curiosos de convênio em vez de pacientes particulares. Desenhei esta arquitetura <strong className="text-white">BPMN 2.0</strong> para capturar o <code className="text-cyan-200">GCLID</code> antes do redirecionamento, cruzar com o agendamento real no CRM e devolver ao Google apenas as consultas confirmadas.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => setSimulatingBpmn(true)}
                    disabled={simulatingBpmn}
                    className="px-5 py-2.5 rounded-2xl text-xs font-semibold text-neutral-950 bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-300 hover:opacity-95 disabled:opacity-50 transition shadow-lg shadow-cyan-500/20 flex items-center gap-2"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    {simulatingBpmn ? 'Rodando Fluxo...' : 'Testar Fluxo Passo a Passo'}
                  </button>
                  <a
                    href="/portifolio/arquitetura-bpmn-crm-google-ads.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-2xl text-xs font-medium text-neutral-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] transition flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-300" />
                    Meu Diagrama BPMN (PDF)
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                {BPMN_NODES.map((node, i) => {
                  const isSel = i === activeNode;
                  return (
                    <div
                      key={node.id}
                      onClick={() => setActiveNode(i)}
                      className={`cursor-pointer p-5 rounded-[24px] border transition-all duration-300 relative overflow-hidden ${
                        isSel
                          ? 'bg-white/[0.09] border-cyan-300/60 shadow-[0_0_35px_rgba(103,232,249,0.18)] -translate-y-1'
                          : 'bg-black/30 hover:bg-white/[0.05] border-white/[0.07]'
                      }`}
                    >
                      <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${node.accent} mb-4`} />
                      <div className="flex items-center justify-between text-[11px] text-neutral-400">
                        <span>ETAPA {node.step}</span>
                        <span className="text-cyan-300 font-medium">{node.kpi}</span>
                      </div>
                      <div className="text-base font-semibold text-white mt-1.5 leading-snug">
                        {node.title}
                      </div>
                      <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                        {node.shortDesc}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
                <div className="lg:col-span-6 p-6 rounded-[26px] bg-black/40 border border-white/[0.07] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/15 text-cyan-200 border border-cyan-400/30">
                      Raia {BPMN_NODES[activeNode].step} • {BPMN_NODES[activeNode].layer}
                    </span>
                    <span className="text-xs text-emerald-300 font-medium">
                      {BPMN_NODES[activeNode].kpi}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {BPMN_NODES[activeNode].title}
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {BPMN_NODES[activeNode].rule}
                  </p>
                  <pre className="p-4 rounded-2xl bg-[#050609] border border-white/[0.06] font-mono text-xs text-cyan-200 overflow-x-auto">
                    <code>{BPMN_NODES[activeNode].code}</code>
                  </pre>
                </div>

                <div className="lg:col-span-6 p-6 rounded-[26px] bg-[#050609] border border-white/[0.08] flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-mono uppercase tracking-wider text-neutral-300">
                        Live Server Telemetry Stream
                      </span>
                    </div>
                    <button
                      onClick={() => setServerLogs([BPMN_NODES[activeNode].logLine])}
                      className="text-xs text-neutral-400 hover:text-white flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset
                    </button>
                  </div>

                  <div className="space-y-2.5 font-mono text-xs min-h-[190px]">
                    {serverLogs.map((l, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-emerald-200 animate-in fade-in duration-200"
                      >
                        {l}
                      </div>
                    ))}
                  </div>

                  <div className="text-[11px] text-neutral-500 flex justify-between pt-2 border-t border-white/[0.06]">
                    <span>Protocolo: Google Ads ConversionUploadService</span>
                    <span className="text-cyan-300">SHA-256 Enhanced Conversions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            VIEW 3: CURVA R$ 879K (SPLINE SVG) & METODOLOGIA DRAWFLOW
        =================================================================== */}
        {view === 'performance' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 p-7 rounded-[32px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] space-y-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1.5 max-w-2xl">
                    <span className="text-xs uppercase tracking-wider text-emerald-300">
                      Minha Planilha Real de Auditoria • Mixs (19 Semanas no PDV)
                    </span>
                    <h2 className="text-2xl font-light text-white">
                      Como transformei R$ 9.122 em{' '}
                      <span className="font-semibold text-emerald-200">R$ 879.306,89 no balcão (ROAS 96,4x)</span>
                    </h2>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Estes números não são estimativa de gerenciador: são contratos fechados e auditados semana a semana no CRM e no caixa da loja. Clique em cada ponto da curva abaixo para ver quanto investi, quantos leads chegaram e quanto vendemos em cada semana.
                    </p>
                  </div>

                  <button
                    onClick={() => setPlayingWeeks(!playingWeeks)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] text-cyan-200 flex items-center gap-2 transition"
                  >
                    {playingWeeks ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    {playingWeeks ? 'Pausar Timeline' : 'Animar 19 Semanas'}
                  </button>
                </div>

                <div className="p-4 rounded-[24px] bg-black/40 border border-white/[0.06]">
                  <svg viewBox={`0 0 ${svgChart.width} ${svgChart.height}`} className="w-full h-52 overflow-visible">
                    <defs>
                      <linearGradient id="fullAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.45" />
                        <stop offset="65%" stopColor="#a78bfa" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d={svgChart.areaD} fill="url(#fullAreaGrad)" />
                    <path
                      d={svgChart.pathD}
                      fill="none"
                      stroke="#67e8f9"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    {svgChart.pts.map((pt, idx) => {
                      const active = idx === selectedWeek;
                      return (
                        <g
                          key={pt.d.week}
                          className="cursor-pointer"
                          onClick={() => {
                            setPlayingWeeks(false);
                            setSelectedWeek(idx);
                          }}
                        >
                          {active && (
                            <line
                              x1={pt.x}
                              y1={20}
                              x2={pt.x}
                              y2={svgChart.height - 24}
                              stroke="rgba(103,232,249,0.35)"
                              strokeDasharray="4 4"
                            />
                          )}
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={active ? 8 : 4.5}
                            fill={active ? '#ffffff' : '#67e8f9'}
                            stroke={active ? '#67e8f9' : 'transparent'}
                            strokeWidth={active ? 4 : 0}
                          />
                          <text
                            x={pt.x}
                            y={svgChart.height - 6}
                            textAnchor="middle"
                            className={`text-[10px] font-mono fill-current ${
                              active ? 'text-cyan-300 font-bold' : 'text-neutral-500'
                            }`}
                          >
                            {pt.d.week}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                <div className="grid grid-cols-4 gap-3 text-center">
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-[11px] text-neutral-400 block">Investimento Total</span>
                    <span className="text-base font-semibold text-white">R$ 9.122,46</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-[11px] text-neutral-400 block">Impressões Ads</span>
                    <span className="text-base font-semibold text-cyan-200">917.311</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-[11px] text-neutral-400 block">Leads no CRM</span>
                    <span className="text-base font-semibold text-violet-200">4.411 (R$ 2,07)</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-[11px] text-neutral-400 block">Contratos Fechados</span>
                    <span className="text-base font-semibold text-emerald-300">662 vendas</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 p-7 rounded-[32px] bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-2xl border border-white/[0.09] flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-center justify-between text-xs text-cyan-300">
                    <span>SEMANA SELECIONADA ({weekData.week})</span>
                    <span>{weekData.period}</span>
                  </div>
                  <div className="text-3xl font-semibold text-white mt-2">
                    {formatBRLCents(weekData.revenue)}
                  </div>
                  <div className="text-xs text-emerald-300 mt-1">
                    ROAS de {weekData.roas.toFixed(1)}x sobre {formatBRLCents(weekData.spend)} investidos
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  {[
                    {
                      label: 'Impressões na Rede',
                      val: weekData.impressions.toLocaleString('pt-BR'),
                      sub: `Cliques: ${weekData.clicks}`,
                      pct: 100,
                      color: 'from-cyan-400 to-sky-400',
                    },
                    {
                      label: 'Conversas Iniciadas (CRM)',
                      val: `${weekData.leads} leads`,
                      sub: `CPL: ${formatBRLCents(weekData.cpl)}`,
                      pct: 68,
                      color: 'from-sky-400 to-violet-400',
                    },
                    {
                      label: 'Contratos Assinados',
                      val: `${weekData.sales} vendas`,
                      sub: `CAC: ${formatBRLCents(weekData.cac)}`,
                      pct: 42,
                      color: 'from-emerald-400 to-teal-300',
                    },
                  ].map((row) => (
                    <div key={row.label} className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.06] space-y-2">
                      <div className="flex justify-between">
                        <span className="text-neutral-300">{row.label}</span>
                        <span className="font-semibold text-white">{row.val}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                        <div
                          style={{ width: `${row.pct}%` }}
                          className={`h-full rounded-full bg-gradient-to-r ${row.color}`}
                        />
                      </div>
                      <div className="text-[11px] text-neutral-400 text-right">{row.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-7 rounded-[32px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-violet-300">
                    Metodologia Proprietária • Drawflow
                  </span>
                  <h3 className="text-xl font-semibold text-white">
                    Engenharia Comportamental por Nível de Consciência
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <div className="inline-flex p-1 rounded-2xl bg-black/40 border border-white/[0.08]">
                    {[
                      { id: 'fast', label: 'Fast Traffic' },
                      { id: 'inbound', label: 'Inbound Direto' },
                      { id: 'retention', label: 'Retenção & LTV' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setDrawflowPillar(t.id as 'fast' | 'inbound' | 'retention')}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                          drawflowPillar === t.id
                            ? 'bg-white/15 text-white'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                  <a
                    href="/portifolio/metodologia-drawflow.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl text-xs font-medium bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-cyan-200 flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Drawflow PDF
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {(drawflowPillar === 'fast'
                  ? [
                      { step: '01', title: 'Busca Consciente', desc: 'Google Search + Meta Direct capturando quem já procura a solução.' },
                      { step: '02', title: 'Ponte de Tracking', desc: 'Landing Page + GCLID/Pixel separando compradores de listas de Remarketing.' },
                      { step: '03', title: 'Triagem CRM', desc: 'Entrada imediata no RD Station / Segsmart / Kommo com abordagem comercial.' },
                      { step: '04', title: 'Loop de Repescagem', desc: 'Anúncios dinâmicos de autoridade para quem não fechou no 1º atendimento.' },
                    ]
                  : drawflowPillar === 'inbound'
                  ? [
                      { step: '01', title: 'Despertar da Dor', desc: 'Vídeos CBO para público inconsciente do problema e da solução.' },
                      { step: '02', title: 'Filtro 50% / 75%', desc: 'Audiências automáticas de quem reteve atenção no vídeo ou Instagram.' },
                      { step: '03', title: 'Momentos 5.1 & 5.2', desc: '21,4% do budget em Remarketing elevando consciência do produto/vendedor.' },
                      { step: '04', title: 'Conversão Nutrir', desc: 'Lead chega ao WhatsApp já educado, reduzindo o CAC e o tempo comercial.' },
                    ]
                  : [
                      { step: '01', title: 'Gatilhos WABA', desc: 'API Oficial do WhatsApp + SMS disparados por mudanças de margem ou agenda.' },
                      { step: '02', title: 'Esteira Cross-Sell', desc: 'Oferta de Consórcio, Seguro ou Energia Solar para a base sem novo CAC.' },
                      { step: '03', title: 'Recompra Ativa', desc: 'Maximização do LTV mantendo a marca presente na jornada do cliente.' },
                      { step: '04', title: 'Auditoria Looker BI', desc: 'Monitoramento em tempo real da Margem de Contribuição por safra.' },
                    ]
                ).map((c) => (
                  <div key={c.step} className="p-5 rounded-2xl bg-black/35 border border-white/[0.07] space-y-2">
                    <span className="text-xs font-mono text-cyan-300">ETAPA {c.step}</span>
                    <div className="text-base font-semibold text-white">{c.title}</div>
                    <p className="text-xs text-neutral-400 leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            VIEW 4: GOVERNANÇA FINANCEIRA DE TRÁFEGO (FIEL À PLANILHA DE DRE)
        =================================================================== */}
        {view === 'dre' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Cabeçalho Estratégico: Por que essa planilha existe e qual problema ela resolve */}
            <div className="p-7 sm:p-8 rounded-[32px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/[0.07] pb-6">
                <div className="space-y-2 max-w-3xl">
                  <span className="text-xs uppercase tracking-wider text-violet-300 font-medium">
                    Metodologia de Viabilidade & Governança • Planilha DRE Projetado + Ponto de Equilíbrio
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-light text-white">
                    Como eu descubro o{' '}
                    <span className="font-semibold text-cyan-200">
                      CAC Alvo, a Mídia Mínima de Breakeven e o Stop-Loss
                    </span>{' '}
                    antes de escalar a verba
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Gestores comuns perguntam <em>&ldquo;quanto você quer investir?&rdquo;</em>. Na minha metodologia (aplicada na V4 Company, Mixs e We Marketing), eu audito a <strong className="text-white">Margem de Contribuição</strong> e faço o <strong className="text-white">Rateio Proporcional do Canal Digital nos Custos Fixos</strong> para estabelecer matematicamente 3 travas de operação: <strong className="text-emerald-300">CAC Alvo (40% da Margem)</strong>, <strong className="text-amber-300">CAC Aceitável (55% da Margem)</strong> e <strong className="text-rose-300">Stop Loss (100% da Margem — pausa imediata)</strong>.
                  </p>
                </div>

                {/* Seletores dos 3 Casos Reais da Planilha */}
                <div className="flex flex-col gap-1.5 shrink-0">
                  <span className="text-[10px] font-mono uppercase text-neutral-400">
                    Carregar Aba Real da Planilha:
                  </span>
                  <div className="inline-flex p-1.5 rounded-2xl bg-black/40 border border-white/[0.08]">
                    {[
                      { id: 'v4_com_cac', label: 'Aba 1: Com CAC Mapeado' },
                      { id: 'v4_sem_cac', label: 'Aba 2: Sem CAC (Descobrir)' },
                      { id: 'clinica_we', label: 'Case Clínica Médica' },
                    ].map((c) => (
                      <button
                        key={c.id}
                        onClick={() => selectDreCase(c.id as 'v4_com_cac' | 'v4_sem_cac' | 'clinica_we')}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                          dreCase === c.id
                            ? 'bg-white/15 text-white shadow-sm'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Grid Principal: Etapa 1 & 2 (Inputs Contábeis Reais) + Etapa 3 (As 3 Zonas de Governança) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
                {/* Coluna Esquerda (5 cols): 1º Custos Variáveis + 2º Rateio Fixo Digital + 3º CAC Atual */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Bloco 1: Formação da Margem de Contribuição */}
                  <div className="p-5 rounded-[24px] bg-black/40 border border-white/[0.07] space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase text-cyan-300 font-semibold">
                        1º Passo • Decomposição da Margem Unitária
                      </span>
                      <span className="text-xs font-mono text-emerald-300 font-bold">
                        MC: {formatBRLCents(dreModel.marginVal)} ({dreModel.marginPct.toFixed(1)}%)
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-300">Ticket Médio do Produto/Consulta</span>
                        <span className="font-mono font-bold text-white">{formatBRLCents(ticket)}</span>
                      </div>
                      <input
                        type="range"
                        min={50}
                        max={2000}
                        step={5}
                        value={ticket}
                        onChange={(e) => setTicket(Number(e.target.value))}
                        className="w-full accent-cyan-300 cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-neutral-400">Imposto (NF)</span>
                          <span className="font-mono text-white">{taxPct}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={25}
                          step={0.5}
                          value={taxPct}
                          onChange={(e) => setTaxPct(Number(e.target.value))}
                          className="w-full accent-amber-300 cursor-pointer mt-1"
                        />
                      </div>

                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-neutral-400">Comissão Vendas</span>
                          <span className="font-mono text-white">{commissionPct}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={50}
                          step={0.5}
                          value={commissionPct}
                          onChange={(e) => setCommissionPct(Number(e.target.value))}
                          className="w-full accent-amber-300 cursor-pointer mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bloco 2: Regra de Diluição de Custos Fixos pelo Canal Digital (Célula D20) */}
                  <div className="p-5 rounded-[24px] bg-black/40 border border-white/[0.07] space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase text-violet-300 font-semibold">
                        2º Passo • Rateio de Custo Fixo Digital
                      </span>
                      <span className="text-xs font-mono text-white font-bold">
                        {formatBRL(dreModel.totalDigitalFixed)}/mês
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      Regra da planilha: dilui-se o custo fixo estrutural (aluguel, folha, luz) pela % que o digital representa no faturamento + Fee e Ferramentas (CRM/WABA).
                    </p>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-300">Custo Fixo Geral da Empresa</span>
                        <span className="font-mono text-white">{formatBRL(companyFixedTotal)}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={50000}
                        step={1000}
                        value={companyFixedTotal}
                        onChange={(e) => setCompanyFixedTotal(Number(e.target.value))}
                        className="w-full accent-violet-400 cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-neutral-400">Peso do Digital</span>
                          <span className="font-mono text-violet-300">{digitalSharePct}%</span>
                        </div>
                        <input
                          type="range"
                          min={5}
                          max={100}
                          step={5}
                          value={digitalSharePct}
                          onChange={(e) => setDigitalSharePct(Number(e.target.value))}
                          className="w-full accent-violet-300 cursor-pointer mt-1"
                        />
                      </div>

                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-neutral-400">Fee + CRM/WABA</span>
                          <span className="font-mono text-white">{formatBRL(martechFeeAndTools)}</span>
                        </div>
                        <input
                          type="range"
                          min={500}
                          max={10000}
                          step={100}
                          value={martechFeeAndTools}
                          onChange={(e) => setMartechFeeAndTools(Number(e.target.value))}
                          className="w-full accent-cyan-300 cursor-pointer mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bloco 3: Teste de CAC Real da Operação */}
                  <div className="p-5 rounded-[24px] bg-black/40 border border-white/[0.07] space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase text-emerald-300 font-semibold">
                        3º Passo • Auditar CAC Atual da Campanha
                      </span>
                      <span className="text-sm font-mono font-bold text-white">
                        {formatBRLCents(mappedCac)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={Math.round(dreModel.marginVal * 1.2)}
                      step={0.5}
                      value={mappedCac}
                      onChange={(e) => setMappedCac(Number(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-emerald-300">Alvo: {formatBRLCents(dreModel.cacTarget)}</span>
                      <span className="text-amber-300">Limite: {formatBRLCents(dreModel.cacAcceptable)}</span>
                      <span className="text-rose-300">Stop: {formatBRLCents(dreModel.cacStopLoss)}</span>
                    </div>
                  </div>
                </div>

                {/* Coluna Direita (7 cols): Matriz das 3 Zonas + Diagnóstico de Breakeven + Efeito LTV 12 Meses */}
                <div className="lg:col-span-7 space-y-5">
                  {/* Banner de Status do CAC Auditado */}
                  <div
                    className={`p-5 rounded-[24px] border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      dreModel.zoneStatus === 'OPTIMAL'
                        ? 'bg-emerald-500/10 border-emerald-400/30'
                        : dreModel.zoneStatus === 'WARNING'
                        ? 'bg-amber-500/10 border-amber-400/30'
                        : 'bg-rose-500/15 border-rose-400/40'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-mono uppercase font-bold flex items-center gap-2">
                        {dreModel.zoneStatus === 'OPTIMAL' && (
                          <span className="text-emerald-300">
                            🟢 ZONA DE ESCALA SAUDÁVEL (CAC Dentro do Limite)
                          </span>
                        )}
                        {dreModel.zoneStatus === 'WARNING' && (
                          <span className="text-amber-300">
                            🟡 ZONA DE ATENÇÃO (CAC Acima de 55% da Margem — Otimizar Conversão)
                          </span>
                        )}
                        {dreModel.zoneStatus === 'STOPLOSS' && (
                          <span className="text-rose-300 flex items-center gap-1.5">
                            <AlertTriangle className="w-4 h-4" />
                            🔴 STOP LOSS ATINGIDO (CAC ≥ Margem — PARE AS CAMPANHAS IMEDIATAMENTE!)
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-300">
                        {dreModel.mappedBreakevenSales === Infinity
                          ? 'Com este CAC você paga para vender: cada venda gera prejuízo unitário antes mesmo de pagar o custo fixo.'
                          : `Com CAC de ${formatBRLCents(mappedCac)}, sobram ${formatBRLCents(dreModel.netMarginAfterMappedCac)} por venda para pagar os ${formatBRL(dreModel.totalDigitalFixed)} de custo fixo.`}
                      </p>
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                        Breakeven c/ CAC Atual
                      </span>
                      <span className="text-xl font-bold text-white font-mono">
                        {dreModel.mappedBreakevenSales === Infinity
                          ? 'Inviável'
                          : `${dreModel.mappedBreakevenSales} vendas`}
                      </span>
                      <span className="text-[11px] text-cyan-200 block font-mono">
                        Mídia mín:{' '}
                        {dreModel.mappedMediaForBreakeven === Infinity
                          ? '—'
                          : formatBRLCents(dreModel.mappedMediaForBreakeven)}
                      </span>
                    </div>
                  </div>

                  {/* As 3 Colunas da Planilha: Cenário 1 (CAC Alvo 40%) | Cenário 2 (CAC Aceitável 55%) | Cenário 3 (Stop Loss 100%) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Cenário 1 */}
                    <div className="p-5 rounded-[24px] bg-black/40 border border-emerald-400/25 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 text-emerald-300">
                          CENÁRIO 1 • ALVO (40% MC)
                        </span>
                        <span className="text-xs font-mono text-emerald-300 font-bold">ROI 2,50x</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-neutral-400 block">CAC Alvo Ideal</span>
                        <span className="text-2xl font-semibold text-white font-mono">
                          {formatBRLCents(dreModel.cacTarget)}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-white/[0.06] space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Breakeven Vendas:</span>
                          <span className="font-mono text-white font-semibold">
                            {dreModel.breakevenSalesTarget} vds
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Mídia Necessária:</span>
                          <span className="font-mono text-emerald-300 font-semibold">
                            {formatBRLCents(dreModel.mediaNeededTarget)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">ROAS no Breakeven:</span>
                          <span className="font-mono text-cyan-200">
                            {dreModel.roasTarget.toFixed(2)}x
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Cenário 2 */}
                    <div className="p-5 rounded-[24px] bg-black/40 border border-amber-400/25 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/15 text-amber-300">
                          CENÁRIO 2 • ACEITÁVEL (55% MC)
                        </span>
                        <span className="text-xs font-mono text-amber-300 font-bold">ROI 1,82x</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-neutral-400 block">CAC Limite Escala</span>
                        <span className="text-2xl font-semibold text-white font-mono">
                          {formatBRLCents(dreModel.cacAcceptable)}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-white/[0.06] space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Breakeven Vendas:</span>
                          <span className="font-mono text-white font-semibold">
                            {dreModel.breakevenSalesAcceptable} vds
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Mídia Necessária:</span>
                          <span className="font-mono text-amber-300 font-semibold">
                            {formatBRLCents(dreModel.mediaNeededAcceptable)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">ROAS no Breakeven:</span>
                          <span className="font-mono text-cyan-200">
                            {dreModel.roasAcceptable.toFixed(2)}x
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Cenário 3: Stop Loss */}
                    <div className="p-5 rounded-[24px] bg-black/40 border border-rose-400/25 space-y-3 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-rose-500/15 text-rose-300">
                            CENÁRIO 3 • STOP LOSS
                          </span>
                          <span className="text-xs font-mono text-rose-300 font-bold">LUCRO 0</span>
                        </div>
                        <div>
                          <span className="text-[11px] text-neutral-400 block">Teto Absoluto (= MC)</span>
                          <span className="text-2xl font-semibold text-rose-300 font-mono">
                            {formatBRLCents(dreModel.cacStopLoss)}
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] text-neutral-400 pt-2 border-t border-white/[0.06] leading-relaxed">
                        Regra da célula <code className="text-rose-200">D40</code>: acima deste valor a empresa paga para vender. Trava de pausa obrigatória da campanha.
                      </p>
                    </div>
                  </div>

                  {/* A Tese da Aba "DRE 12 Meses": Degradação Marginal do Tráfego (-5% ROAS) vs. Recompra/LTV (+33%) */}
                  <div className="p-5 rounded-[24px] bg-gradient-to-r from-white/[0.04] to-violet-500/[0.07] border border-white/[0.08] space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-mono uppercase text-violet-300 font-semibold">
                          4º Passo • Projeção DRE 12 Meses (Escala de Ads vs. Retenção/LTV)
                        </span>
                        <h4 className="text-sm font-semibold text-white">
                          Por que toda operação precisa de Retenção (CRM/WABA) ao escalar tráfego?
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-neutral-400">Taxa de Recompra (LTV):</span>
                        <input
                          type="range"
                          min={0}
                          max={60}
                          step={5}
                          value={retentionRatePct}
                          onChange={(e) => setRetentionRatePct(Number(e.target.value))}
                          className="w-24 accent-violet-400 cursor-pointer"
                        />
                        <span className="font-mono font-bold text-violet-300">{retentionRatePct}%</span>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Na aba <strong className="text-white">DRE Anual</strong> da planilha, projeto uma perda natural de eficiência dos anúncios de <strong className="text-amber-300">-5% por trimestre</strong> conforme aumentamos o investimento. Sem retenção, o lucro cai; mas ao ativar <strong className="text-violet-200">{retentionRatePct}% de recompra na base</strong> (via WABA/CRM sem novo CAC), o EBITDA salta:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.06] flex items-center justify-between">
                        <div>
                          <span className="text-[11px] text-neutral-400 block">
                            EBITDA Mês 12 (Só Aquisição Paga)
                          </span>
                          <span className="text-[10px] text-amber-300">Sofre c/ encarecimento do leilão</span>
                        </div>
                        <span className="text-base font-mono font-semibold text-neutral-200">
                          {formatBRL(dreModel.ebitdaWithoutRetention)}
                        </span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-between">
                        <div>
                          <span className="text-[11px] text-emerald-200 font-medium block">
                            EBITDA Mês 12 (Aquisição + {retentionRatePct}% LTV)
                          </span>
                          <span className="text-[10px] text-emerald-300">
                            +{formatBRL(dreModel.m12RetentionRev)} de receita c/ CAC zero
                          </span>
                        </div>
                        <span className="text-lg font-mono font-bold text-emerald-300">
                          {formatBRL(dreModel.ebitdaWithRetention)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5º PASSO: O ELO QUE FECHA O CONTEXTO (DA PLANILHA PARA O SERVIDOR MCP DOS CANAIS DE TRÁFEGO) */}
              <div className="p-6 rounded-[26px] bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-emerald-500/10 border border-cyan-400/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-cyan-400/20 text-cyan-200 border border-cyan-400/30 font-semibold">
                      5º Passo • O Fechamento do Ciclo
                    </span>
                    <span className="text-xs font-mono text-emerald-300">
                      Planilha DRE → Python + Google JAX (@jit) → Servidor MCP
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-white">
                    Como essa Governança de DRE roda sozinha nos Canais de Tráfego (Meta, Google & TikTok)?
                  </h4>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Transformei as fórmulas desta planilha no motor vetorial <strong className="text-white">Capvi IA (Google JAX)</strong> e conectei às APIs oficiais de tráfego via <strong className="text-cyan-200">Model Context Protocol (MCP)</strong>. Com o seu CAC simulado agora de <strong className="text-white font-mono">{formatBRLCents(mappedCac)}</strong>, o servidor MCP emite automaticamente o comando:{' '}
                    <strong className={dreModel.zoneStatus === 'OPTIMAL' ? 'text-emerald-300' : dreModel.zoneStatus === 'WARNING' ? 'text-amber-300' : 'text-rose-300'}>
                      {dreModel.zoneStatus === 'OPTIMAL'
                        ? 'ESCALAR ORÇAMENTO (+15% a 20% nas campanhas líderes)'
                        : dreModel.zoneStatus === 'WARNING'
                        ? 'OTIMIZAR CRIATIVO (Acionar gerador AIDA + VideoBot 9:16)'
                        : 'STOP LOSS IMEDIATO (Pausar conjunto de anúncios para proteger o caixa)'}
                    </strong>.
                  </p>
                </div>

                <button
                  onClick={() => setView('aistudio')}
                  className="px-5 py-3 rounded-2xl text-xs font-semibold text-neutral-950 bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-300 hover:opacity-95 transition shadow-lg shadow-cyan-500/20 shrink-0 flex items-center gap-2"
                >
                  <Cpu className="w-4 h-4" />
                  Ver Servidor MCP dos Canais →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            VIEW 5: MCP TRAFFIC HUB (O FECHAMENTO DO CONTEXTO) & AI STUDIO
        =================================================================== */}
        {view === 'aistudio' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* SEÇÃO PRINCIPAL: ARQUITETURA DE FECHAMENTO — MCP DOS CANAIS DE TRÁFEGO ↔ DRE JAX */}
            <div className="p-6 sm:p-8 rounded-[32px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/[0.07] pb-6">
                <div className="space-y-2 max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-[11px] font-mono text-cyan-200">
                    <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    Antigravity Central Hub • MCP 2.x (Streamable HTTP) + Cloudflare Tunnel
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-light text-white">
                    O Elo que Fecha o Contexto:{' '}
                    <span className="font-semibold bg-gradient-to-r from-cyan-200 via-violet-200 to-emerald-200 bg-clip-text text-transparent">
                      MCP dos Canais de Tráfego ↔ Córtex DRE (Google JAX)
                    </span>
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Não basta rastrear o GCLID (Aba 2), gerar demanda com Drawflow (Aba 3) e ter uma planilha de DRE (Aba 4) se a tomada de decisão continuar manual. Por isso construí um <strong className="text-white">Orquestrador MCP em Python (23 Tools)</strong> que conecta agentes de IA diretamente às APIs de <strong className="text-cyan-200">Meta Ads, Google Ads e TikTok</strong>, cruzando métricas de leilão com o motor financeiro em <strong className="text-emerald-300">Google JAX (@jit)</strong> e disparando a esteira de novos criativos quando detecta fadiga.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <a
                    href="https://github.com/marco101aurelio-a11y/mcp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-2xl text-xs font-semibold text-neutral-950 bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-300 hover:opacity-95 transition shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    Repositório MCP Hub
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://github.com/marco101aurelio-a11y/projetoseo2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-2xl text-xs font-semibold text-cyan-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] transition flex items-center gap-1.5"
                  >
                    <Calculator className="w-3.5 h-3.5 text-emerald-300" />
                    Motor Capvi IA (JAX)
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Seletor Interativo dos 4 Elos do MCP de Tráfego */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {MCP_TRAFFIC_CHANNELS.map((item, idx) => {
                  const isSel = idx === selectedMcpChannel;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedMcpChannel(idx)}
                      className={`cursor-pointer p-5 rounded-[24px] border transition-all duration-300 ${
                        isSel
                          ? 'bg-white/[0.09] border-cyan-300/60 shadow-[0_0_30px_rgba(103,232,249,0.16)] -translate-y-1'
                          : 'bg-black/35 hover:bg-white/[0.05] border-white/[0.07]'
                      }`}
                    >
                      <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${item.accent} mb-3.5`} />
                      <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                        <span>{item.step}</span>
                        <span className="text-cyan-300">{item.badge}</span>
                      </div>
                      <div className="text-sm sm:text-base font-semibold text-white mt-1.5 leading-snug">
                        {item.channel}
                      </div>
                      <p className="text-xs text-neutral-400 mt-2 leading-relaxed line-clamp-3">
                        {item.problemSolved}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Painel de Inspeção da Tool MCP Selecionada + Loop Vivo com o Simulador DRE */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-1">
                <div className="lg:col-span-6 p-6 rounded-[26px] bg-black/40 border border-white/[0.07] space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/15 text-cyan-200 border border-cyan-400/30">
                        {MCP_TRAFFIC_CHANNELS[selectedMcpChannel].step} • {MCP_TRAFFIC_CHANNELS[selectedMcpChannel].badge}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-300">
                        Endpoint: https://mcp.promptpulse.com.br/mcp
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      {MCP_TRAFFIC_CHANNELS[selectedMcpChannel].channel}
                    </h3>
                    <div className="text-xs font-mono text-violet-300 bg-violet-500/10 border border-violet-400/20 px-3 py-2 rounded-xl">
                      Tools: {MCP_TRAFFIC_CHANNELS[selectedMcpChannel].toolName}
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      {MCP_TRAFFIC_CHANNELS[selectedMcpChannel].problemSolved}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-cyan-300 block">
                      Regra Algorítmica Codificada no Servidor MCP:
                    </span>
                    <p className="text-xs text-neutral-200 leading-relaxed">
                      {MCP_TRAFFIC_CHANNELS[selectedMcpChannel].decisionRule}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-6 p-6 rounded-[26px] bg-[#050609] border border-white/[0.08] flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-mono uppercase tracking-wider text-neutral-300">
                        Payload JSON • Orquestração MCP ↔ Motor JAX
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-cyan-300">
                      MC Atual: {formatBRLCents(dreModel.marginVal)} | CAC: {formatBRLCents(mappedCac)}
                    </span>
                  </div>

                  <pre className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] font-mono text-xs text-cyan-200 overflow-x-auto leading-relaxed">
                    <code>{MCP_TRAFFIC_CHANNELS[selectedMcpChannel].payload}</code>
                  </pre>

                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-400/25 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-emerald-300 block">
                        Status Integrado ao Simulador DRE (Aba 4):
                      </span>
                      <span className="text-white font-medium">
                        {dreModel.zoneStatus === 'OPTIMAL'
                          ? `CAC (${formatBRLCents(mappedCac)}) ≤ Limite (${formatBRLCents(dreModel.cacAcceptable)}) → Escala Autorizada pelo MCP`
                          : dreModel.zoneStatus === 'WARNING'
                          ? `CAC (${formatBRLCents(mappedCac)}) em Atenção → MCP aciona Renovação de Criativo AIDA`
                          : `CAC (${formatBRLCents(mappedCac)}) ≥ Stop-Loss (${formatBRLCents(dreModel.cacStopLoss)}) → Pausa Automática`}
                      </span>
                    </div>
                    <button
                      onClick={() => setView('dre')}
                      className="text-cyan-300 hover:text-white font-mono underline shrink-0 text-[11px]"
                    >
                      Ajustar DRE →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* SEÇÃO SECUNDÁRIA: OS 4 REPOSITÓRIOS EM PRODUÇÃO NO GITHUB & TELEMETRIA */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 space-y-3">
                {LAB_SYSTEMS.map((sys, i) => {
                  const active = i === selectedSystem;
                  return (
                    <button
                      key={sys.id}
                      onClick={() => triggerSystemSimulation(i)}
                      className={`w-full text-left p-5 rounded-[24px] border transition-all ${
                        active
                          ? 'bg-white/[0.08] border-cyan-300/50 shadow-lg'
                          : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/[0.07]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs text-cyan-300 mb-1">
                        <span>{sys.subtitle}</span>
                        <span className="px-2 py-0.5 rounded-full bg-white/10 text-white font-medium">
                          {sys.metricLabel}
                        </span>
                      </div>
                      <div className="text-lg font-semibold text-white">{sys.name}</div>
                      <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{sys.summary}</p>
                    </button>
                  );
                })}
              </div>

              <div className="lg:col-span-7 p-7 rounded-[32px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] flex flex-col justify-between space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-cyan-300">
                      Código-Fonte Auditável no GitHub & Execução Live
                    </span>
                    <h3 className="text-2xl font-semibold text-white mt-0.5">
                      {LAB_SYSTEMS[selectedSystem].name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={LAB_SYSTEMS[selectedSystem].repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold text-cyan-200 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] transition flex items-center gap-1.5"
                    >
                      <Terminal className="w-3.5 h-3.5 text-cyan-300" />
                      Ver no GitHub
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => triggerSystemSimulation(selectedSystem)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-950 bg-gradient-to-r from-cyan-300 to-emerald-300 hover:opacity-90 transition flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Simular Execução
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {LAB_SYSTEMS[selectedSystem].telemetry.map((t) => (
                    <div key={t.label} className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.07]">
                      <span className="text-[11px] text-neutral-400 block">{t.label}</span>
                      <span className="text-sm sm:text-base font-semibold text-white mt-0.5 block">
                        {t.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-5 rounded-2xl bg-[#050609] border border-white/[0.08] font-mono text-xs space-y-2.5 min-h-[190px]">
                  <div className="text-neutral-500 pb-2 border-b border-white/[0.06]">
                    $ {LAB_SYSTEMS[selectedSystem].cmd}
                  </div>
                  {LAB_SYSTEMS[selectedSystem].logs.slice(0, logProgress).map((l, idx) => (
                    <div key={idx} className="text-cyan-200 animate-in fade-in duration-150">
                      {l}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-7 rounded-[32px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs uppercase tracking-wider text-violet-300">
                    Jornada Profissional • 2013 → 2026
                  </span>
                  <h3 className="text-xl font-semibold text-white">
                    A Fusão entre Repertório de Negócio e Engenharia Martech
                  </h3>
                </div>
                <span className="text-xs text-neutral-400">
                  +50 contas atendidas em Saúde, Finanças, Varejo e Agro
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5">
                {CAREER_NODES.map((c, idx) => {
                  const active = idx === selectedCareerIdx;
                  return (
                    <button
                      key={c.year}
                      onClick={() => setSelectedCareerIdx(idx)}
                      className={`p-3.5 rounded-2xl border text-left transition ${
                        active
                          ? 'bg-white/[0.1] border-cyan-300/50 text-white'
                          : 'bg-black/30 hover:bg-white/[0.04] border-white/[0.06] text-neutral-400'
                      }`}
                    >
                      <div className="text-xs font-mono text-cyan-300">{c.year}</div>
                      <div className="text-xs font-semibold text-white truncate mt-1">{c.label}</div>
                    </button>
                  );
                })}
              </div>

              <div className="p-6 rounded-2xl bg-black/40 border border-white/[0.07] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono text-cyan-300">
                      {CAREER_NODES[selectedCareerIdx].year}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-emerald-500/15 text-emerald-300 border border-emerald-400/20">
                      {CAREER_NODES[selectedCareerIdx].badge}
                    </span>
                  </div>
                  <div className="text-lg font-semibold text-white">
                    {CAREER_NODES[selectedCareerIdx].role}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {CAREER_NODES[selectedCareerIdx].desc}
                  </p>
                </div>

                <a
                  href="/portifolio/curriculo-marco-aurelio.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/[0.07] hover:bg-white/[0.12] border border-white/[0.1] text-white shrink-0 flex items-center gap-2 transition"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-300" />
                  Baixar Currículo Completo
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
