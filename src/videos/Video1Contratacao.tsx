import React from "react";
import { Series } from "remotion";
import { VideoBackground } from "../components/VideoBackground";
import { OpeningScene } from "../components/OpeningScene";
import { ClosingScene } from "../components/ClosingScene";
import { AnimatedMockupContainer } from "../components/AnimatedMockupContainer";
import { FormularioScreen } from "../screens/contratacao/FormularioScreen";
import { TrackerScreen } from "../screens/contratacao/TrackerScreen";
import { WhatsAppScreen } from "../screens/contratacao/WhatsAppScreen";

export const Video1Contratacao: React.FC = () => {
  return (
    <VideoBackground title="Fluxo de Contratação" subtitle="Onboarding Digital e Validação com IA">
      <Series>
        {/* CENA 1 (frames 0-60): Abertura */}
        <Series.Sequence durationInFrames={60}>
          <OpeningScene
            title="Fluxo de Contratação"
            subtitle="Admissão acelerada de colaboradores com automação e IA"
          />
        </Series.Sequence>

        {/* CENA 2 (frames 60-300 = 240f): Formulário */}
        <Series.Sequence durationInFrames={240}>
          <AnimatedMockupContainer entry="bottom" exit="none">
            <FormularioScreen />
          </AnimatedMockupContainer>
        </Series.Sequence>

        {/* CENA 3 (frames 300-480 = 180f): Tracker */}
        <Series.Sequence durationInFrames={180}>
          <AnimatedMockupContainer
            entry="none"
            exit="top"
            exitStartFrame={165}
          >
            <TrackerScreen stage="documentacao" />
          </AnimatedMockupContainer>
        </Series.Sequence>

        {/* CENA 4 (frames 480-720 = 240f): WhatsApp */}
        <Series.Sequence durationInFrames={240}>
          <AnimatedMockupContainer
            entry="right"
            exit="top"
            exitStartFrame={225}
          >
            <WhatsAppScreen />
          </AnimatedMockupContainer>
        </Series.Sequence>

        {/* CENA 5 (frames 720-960 = 240f): Validação IA */}
        <Series.Sequence durationInFrames={240}>
          <AnimatedMockupContainer
            entry="bottom"
            exit="top"
            exitStartFrame={225}
          >
            <TrackerScreen stage="aprovada" />
          </AnimatedMockupContainer>
        </Series.Sequence>

        {/* CENA 6 (frames 960-1200 = 240f): Encerramento */}
        <Series.Sequence durationInFrames={240}>
          <ClosingScene
            lines={[
              "Processo completo.",
              "100% Rastreável.",
              "Sem depender de ninguém.",
            ]}
          />
        </Series.Sequence>
      </Series>
    </VideoBackground>
  );
};
