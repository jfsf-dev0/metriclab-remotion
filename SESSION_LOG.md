# MetricLab — Remotion 4 Vídeos Verticais (Session Log)

## 📌 Visão Geral do Projeto

Projeto Remotion 4 completo para geração automatizada dos 4 vídeos institucionais/operacionais em formato vertical (9:16 - 1080x1920, 30 fps) com gravações reais dos PWAs em produção sincronizadas com faixas de áudio/locução oficiais para o ecossistema **MetricLab — Consórcio Lote 15**.

- **Repositório**: `jfsf-dev0/metriclab-remotion`
- **Stack**: Remotion 4, React 18, TypeScript, Tailwind CSS, Playwright
- **Durações Sincronizadas com Áudio**:
  1. **Vídeo 1 (Contratação / Admissão)**: 31 segundos (930 frames @ 30fps) — Áudio: `audio/admissao.mp3`
  2. **Vídeo 2 (Vistoria Cautelar)**: 43 segundos (1290 frames @ 30fps) — Áudio: `audio/vistoria.mp3`
  3. **Vídeo 3 (Relatório Diário de Obra)**: 39 segundos (1170 frames @ 30fps) — Áudio: `audio/rdo.mp3`
  4. **Vídeo 4 (Painel do Supervisor)**: 36 segundos (1080 frames @ 30fps) — Áudio: `audio/supervisor.mp3`

---

## 🎨 Arquitetura de Cenas e Mockups Reais

1. **Gravações dos PWAs Reais (`public/recordings/`)**:
   - `v1-contratacao.webm`: Fluxo completo de contratação no PWA `/contratacao` com Jota no WhatsApp
   - `v2-vistoria.webm`: Vistoria cautelar com seleção de trecho, checklist, câmera de evidências, assinatura digital e score IA 94
   - `v3-rdo.webm`: RDO com seleção de turno, clima automático, leitor de crachá QR Code, maquinário, fotos e assinatura
   - `v4-supervisor.webm`: Painel de monitoramento em tempo real com KPIs ao vivo, feed, grid de trechos e folha detalhada do RDO

2. **Locução e Áudios Oficiais (`public/audio/`)**:
   - `admissao.mp3` (514 KB)
   - `vistoria.mp3` (714 KB)
   - `rdo.mp3` (651 KB)
   - `supervisor.mp3` (601 KB)

3. **Componentes Modulares (`src/components/`)**:
   - `IPhoneMockup`: Mockup vetorial do iPhone 15 Pro Titanium com Dynamic Island, botões de hardware e tela de alta fidelidade
   - `IPhoneEntrada` & `IPhoneSaida`: Transições dinâmicas de entrada e saída com física de mola (`spring`)
   - `AnimatedMockupContainer`: Suporte a direção dinâmica (`bottom`, `left`, `right`, `top`, `flip`) para transição de cenas
   - `OpeningScene` & `ClosingScene`: Abertura e encerramento com logo oficial MetricLab, badges e taglines de impacto

---

## 🎬 Detalhamento das 4 Composições

### 1. `Video1Contratacao` — 31s / 930 frames
- **Áudio**: `audio/admissao.mp3`
- **Cena 1 (0-30f / 1s)**: Abertura — `OpeningScene` ("Fluxo de Contratação")
- **Cena 2 (30-90f / 2s)**: Transição — `IPhoneEntrada` (direction="bottom")
- **Cena 3 (90-300f / 7s)**: Formulário PWA — gravação real (0s a 7s)
- **Cena 4 (300-540f / 8s)**: Tracker de Fases — gravação real (7s a 15s)
- **Cena 5 (540-750f / 7s)**: WhatsApp Jota — gravação real (15s a 22s)
- **Cena 6 (750-870f / 4s)**: Transição — `IPhoneSaida` (direction="top")
- **Cena 7 (870-930f / 2s)**: Encerramento — `ClosingScene` ("Admissão operacional automatizada.")

### 2. `Video2Vistoria` — 43s / 1290 frames
- **Áudio**: `audio/vistoria.mp3`
- **Cena 1 (0-30f / 1s)**: Abertura — `OpeningScene` ("Vistoria Cautelar")
- **Cena 2 (30-90f / 2s)**: Transição — `IPhoneEntrada` (direction="bottom")
- **Cena 3 (90-270f / 6s)**: Notificação WhatsApp — gravação real (0s a 6s)
- **Cena 4 (270-480f / 7s)**: Splash + Login — gravação real (6s a 13s)
- **Cena 5 (480-720f / 8s)**: Trechos + Checklist — gravação real (13s a 21s)
- **Cena 6 (720-990f / 9s)**: Fotos + Assinatura + GPS — gravação real (21s a 30s)
- **Cena 7 (990-1200f / 7s)**: Score IA 94 / Resultado — gravação real (30s a 37s)
- **Cena 8 (1200-1230f / 1s)**: Transição — `IPhoneSaida` (direction="top")
- **Cena 9 (1230-1290f / 2s)**: Encerramento — `ClosingScene` ("Vistoria digital. Sem papel.")

### 3. `Video3RDO` — 39s / 1170 frames
- **Áudio**: `audio/rdo.mp3`
- **Cena 1 (0-30f / 1s)**: Abertura — `OpeningScene` ("Relatório Diário de Obra")
- **Cena 2 (30-90f / 2s)**: Transição — `IPhoneEntrada` (direction="bottom")
- **Cena 3 (90-270f / 6s)**: Splash + Login — gravação real (0s a 6s)
- **Cena 4 (270-480f / 7s)**: Menu + Escolha RDO — gravação real (6s a 13s)
- **Cena 5 (480-720f / 8s)**: Turno + Clima + Crachá QR — gravação real (13s a 21s)
- **Cena 6 (720-960f / 8s)**: Máquinas + Fotos + Atividades — gravação real (21s a 29s)
- **Cena 7 (960-1110f / 5s)**: Assinatura + Confirmação — gravação real (29s a 34s)
- **Cena 8 (1110-1140f / 1s)**: Transição — `IPhoneSaida` (direction="top")
- **Cena 9 (1140-1170f / 1s)**: Encerramento — `ClosingScene` ("Campo conectado. Dado real.")

### 4. `Video4Supervisor` — 36s / 1080 frames
- **Áudio**: `audio/supervisor.mp3`
- **Cena 1 (0-30f / 1s)**: Abertura — `OpeningScene` ("Painel do Supervisor")
- **Cena 2 (30-90f / 2s)**: Transição — `IPhoneEntrada` (direction="bottom")
- **Cena 3 (90-330f / 8s)**: KPIs ao Vivo — gravação real (0s a 8s)
- **Cena 4 (330-570f / 8s)**: Feed Tempo Real — gravação real (8s a 16s)
- **Cena 5 (570-810f / 8s)**: Grid de Trechos — gravação real (16s a 24s)
- **Cena 6 (810-1020f / 7s)**: Folha Detalhada RDO — gravação real (24s a 31s)
- **Cena 7 (1020-1050f / 1s)**: Transição — `IPhoneSaida` (direction="top")
- **Cena 8 (1050-1080f / 1s)**: Encerramento — `ClosingScene` ("Decisão com base em dados de campo.")

---

## 🛠️ Comandos de Build e Resultados

- `npm run build:all`: Renderiza todos os 4 vídeos com áudio sincronizado
  - `out/v1-admissao.mp4` & `out/v1-contratacao.mp4` (31s com áudio)
  - `out/v2-vistoria.mp4` (43s com áudio)
  - `out/v3-rdo.mp4` (39s com áudio)
  - `out/v4-supervisor.mp4` (36s com áudio)
- `npx tsc --noEmit`: Validação sem nenhum erro de tipagem
