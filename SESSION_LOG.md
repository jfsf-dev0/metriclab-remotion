# MetricLab — Remotion 4 Vídeos Verticais (Session Log)

## 📌 Visão Geral do Projeto

Projeto Remotion 4 completo para geração automatizada dos 4 vídeos institucionais/operacionais em formato vertical (9:16 - 1080x1920, 30 fps, 40 segundos / 1200 frames cada) para o ecossistema **MetricLab — Consórcio Lote 15**.

- **Repositório**: `jfsf-dev0/metriclab-remotion`
- **Stack**: Remotion 4, React 18, TypeScript, Tailwind CSS
- **Design System**: iPhone 15 Pro Titanium Mockup (320x693px em escala 2.1x perfeitamente centralizado em 1080x1920), Dynamic Island animada, paleta oficial MetricLab, animações spring suaves.

---

## 🎨 Design System e Especificações Globais

1. **Fundo e Ambientação**:
   - `background: linear-gradient(135deg, #f0f4ff 0%, #f9fafb 50%, #f0fdf4 100%)`
   - Iluminação dinâmica sutil com blur orgânico e grid vetorial sutil de 40px.
2. **Mockup iPhone 15 Pro**:
   - Chassi Titanium cinza escuro (`#3a3a3c` a `#1c1c1e`)
   - Bordas externas arredondadas com `border-radius: 54px`
   - Sombra 3D suave com elevação de 80px
   - Dynamic Island (120x34px) com recorte de lente
   - Botão Power lateral direito e botões de Silenciar/Volume laterais esquerdos
   - Barra de status iOS (9:20, sinal 4G e Wi-Fi sem indicador enganoso de bateria)
3. **Paleta de Cores**:
   - Azul MetricLab: `#2563eb`
   - Verde Sucesso: `#16a34a`
   - Vermelho Alerta: `#dc2626`
   - Amber Atenção: `#d97706`
   - Cinza Texto: `#111827`
   - Cinza Suave: `#6b7280`
4. **Animações Globais (Remotion Spring)**:
   - Entrada Mockup: `translateY(+120px) → translateY(0)` + fade in (spring 20 frames)
   - Saída Mockup: `translateY(0) → translateY(-120px)` + fade out (15 frames)
   - Entrada Lateral: `translateX(±120px) → 0` com física spring amortecida
   - Transição interna de telas: cross-fade 10 frames

---

## 🎬 Detalhamento das 4 Composições (1200 frames / 40s)

### 1. `Video1Contratacao` — Fluxo de Contratação
- **Cena 1 (0-60f)**: Abertura com logo MetricLab, tipografia Inter black e subtítulo institucional.
- **Cena 2 (60-300f)**: Tela do formulário `/contratacao` com digitação automática dos campos (João Silva, WhatsApp candidato, WhatsApp gestor, Consórcio Lote 15, Analista de Planejamento) e botão pulsante "Iniciar Processo".
- **Cena 3 (300-480f)**: Tracker de fases (Identificação ✓, Documentação ● em andamento, Validação IA ○, Agendamento ○) com toast "WhatsApp enviado ao candidato ✓".
- **Cena 4 (480-720f)**: Conversa interativa no WhatsApp com Jota IA, envio de mensagem do candidato, solicitação do documento e envio do `RG_Joao_Silva.pdf` com confirmação instantânea da IA.
- **Cena 5 (720-960f)**: Retorno ao tracker com validação concluída (Fase 1 ✓, Fase 2 ✓, Fase 3 ✓ Validação IA em verde, Fase 4 ● Agendamento) com badge "IA aprovou ✓" e notificação enviada ao gestor.
- **Cena 6 (960-1200f)**: Encerramento centralizado com taglines: *"Processo completo. 100% Rastreável. Sem depender de ninguém."*

### 2. `Video2Vistoria` — Vistoria Cautelar
- **Cena 1 (0-60f)**: Abertura institucional "Vistoria Cautelar Digital".
- **Cena 2 (60-180f)**: WhatsApp com notificação de liberação do Trecho 01 e chave `590770`, com dedo interativo simulando o toque no link PWA.
- **Cena 3 (180-300f)**: Transição 3D flip para o PWA, splash screen "15 & 15" e tela de autenticação do perito preenchendo a chave de acesso.
- **Cena 4 (300-480f)**: Seleção do "Trecho 01 — Acesso Norte", preenchimento do número da residência (Nº 42) e checklist dinâmico com respostas automáticas e barra de progresso.
- **Cena 5 (480-720f)**: Câmera fotográfica com flash de obturador e grade de evidências, seguido da tela de assinatura digital com traçado animado em SVG e geolocalização RTK capturada.
- **Cena 6 (720-960f)**: Tela de auditoria da IA: transição do ícone de processamento para selo verde de aprovação e exibição do Score de Conformidade **94/100**.
- **Cena 7 (960-1200f)**: Encerramento com taglines: *"Vistoria digital. 100% Rastreável. Sem papel."*

### 3. `Video3RDO` — Relatório Diário de Obra
- **Cena 1 (0-60f)**: Abertura oficial "Relatório Diário de Obra".
- **Cena 2 (60-180f)**: Splash screen "15 & 19" e login de campo de Carlos Encarregado com chave `RDO001`.
- **Cena 3 (180-360f)**: Menu operacional com card do encarregado e botões de Ocorrência (amber) e RDO Diário (azul acionado).
- **Cena 4 (360-600f)**: Passo 1 com clima capturado automaticamente (☀️ 24°C, 65%, 12km/h) + Passo 2 com scanner de crachá por QR Code e identificação de João Silva (contador: 3 colaboradores).
- **Cena 5 (600-840f)**: Passo 3 com status de maquinário (Escavadeira CAT operando, Caminhão operando, Rolo em manutenção) + Passo 4 com digitação de atividades diárias de concretagem e fotos.
- **Cena 6 (840-1050f)**: Passo 5 com resumo da produção, assinatura digital com GPS confirmado e tela de confirmação com timeline de transmissão ao servidor e ao supervisor.
- **Cena 7 (1050-1200f)**: Encerramento com taglines: *"Zero papel. Zero redigitação. Zero perda de informação."*

### 4. `Video4Supervisor` — Painel do Supervisor
- **Cena 1 (0-60f)**: Abertura oficial "Painel do Supervisor".
- **Cena 2 (60-300f)**: Cockpit de controle com header "● Ao vivo" pulsando e contadores dinâmicos nos KPIs: 3 RDOs enviados, 47 colaboradores, 1 ocorrência aberta (vermelho), 3 trechos ativos.
- **Cena 3 (300-540f)**: Feed de eventos ao vivo recebendo novos cards com slide: RDO do Trecho 01 de Carlos e Alerta de Ocorrência Média no Trecho 03.
- **Cena 4 (540-720f)**: Grade com os 5 trechos monitorados e seus badges correspondentes (RDO Enviado, Aguardando, Ocorrência, RDO Enviado, Aprovado).
- **Cena 5 (720-960f)**: Toque no Trecho 01 e abertura da folha de detalhes com visão completa: encarregado, clima, fotos de crachás validados, máquinas, fotos de evidência e assinatura digital com GPS.
- **Cena 6 (960-1200f)**: Encerramento institucional com taglines: *"Gestão de canteiro em tempo real. Com dados de verdade. Gerados por quem está no campo."*

---

## 🛠️ Scripts NPM Disponíveis

- `npm start`: Inicia o Remotion Studio interativo no navegador
- `npm run build:v1`: Renderiza o Vídeo 1 (`out/v1-contratacao.mp4`)
- `npm run build:v2`: Renderiza o Vídeo 2 (`out/v2-vistoria.mp4`)
- `npm run build:v3`: Renderiza o Vídeo 3 (`out/v3-rdo.mp4`)
- `npm run build:v4`: Renderiza o Vídeo 4 (`out/v4-supervisor.mp4`)
- `npm run build:all`: Renderiza todos os 4 vídeos sequencialmente
