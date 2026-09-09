# MetricLab — Vídeos Verticais Remotion

Projeto desenvolvido em **Remotion 4**, **React**, **TypeScript** e **Tailwind CSS** para geração programática dos vídeos verticais promocionais e operacionais da **MetricLab** para o **Consórcio Lote 15**.

## 📱 Especificações Técnicas
- **Resolução**: 1080x1920 (9:16 Vertical)
- **Taxa de Quadros**: 30 FPS
- **Duração**: 40 segundos por vídeo (1200 frames)
- **Mockup**: iPhone 15 Pro Titanium com Dynamic Island, botões de hardware e status bar

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ ou superior
- NPM ou Yarn

### Iniciar Remotion Studio
```bash
npm start
```

### Renderizar Vídeos
```bash
# Renderizar apenas o Vídeo 1 (Contratação)
npm run build:v1

# Renderizar apenas o Vídeo 2 (Vistoria Cautelar)
npm run build:v2

# Renderizar apenas o Vídeo 3 (RDO)
npm run build:v3

# Renderizar apenas o Vídeo 4 (Painel do Supervisor)
npm run build:v4

# Renderizar todos os vídeos
npm run build:all
```

## 📂 Estrutura de Pastas
```
src/
  Root.tsx              # Registro das 4 composições
  index.ts              # Entry point Remotion
  style.css             # Tailwind CSS base
  components/           # Componentes globais (iPhone, balões, headers, etc)
  videos/               # Composições dos 4 vídeos de 1200 frames
  screens/              # Telas individuais dos fluxos (contratação, vistoria, rdo, supervisor)
```
