import React from "react";
import { Series } from "remotion";
import { VideoBackground } from "../components/VideoBackground";
import { OpeningScene } from "../components/OpeningScene";
import { ClosingScene } from "../components/ClosingScene";
import { AnimatedMockupContainer } from "../components/AnimatedMockupContainer";
import { SupervisorPainelScreen } from "../screens/supervisor/PainelScreen";
import { SupervisorFeedScreen } from "../screens/supervisor/FeedScreen";
import { TrechosGridScreen } from "../screens/supervisor/TrechosGridScreen";
import { SupervisorModalScreen } from "../screens/supervisor/ModalScreen";

export const Video4Supervisor: React.FC = () => {
  return (
    <VideoBackground
      title="Painel do Supervisor"
      subtitle="Cockpit de Operações e Monitoramento de Obras em Tempo Real"
    >
      <Series>
        {/* CENA 1 (frames 0-60 = 60f): Abertura */}
        <Series.Sequence durationInFrames={60}>
          <OpeningScene
            title="Painel do Supervisor"
            subtitle="Visibilidade total das frentes de serviço sem atrasos de informação"
          />
        </Series.Sequence>

        {/* CENA 2 (frames 60-300 = 240f): KPIs em tempo real */}
        <Series.Sequence durationInFrames={240}>
          <AnimatedMockupContainer entry="bottom" exit="none">
            <SupervisorPainelScreen />
          </AnimatedMockupContainer>
        </Series.Sequence>

        {/* CENA 3 (frames 300-540 = 240f): Feed chegando */}
        <Series.Sequence durationInFrames={240}>
          <AnimatedMockupContainer entry="none" exit="top" exitStartFrame={225}>
            <SupervisorFeedScreen />
          </AnimatedMockupContainer>
        </Series.Sequence>

        {/* CENA 4 (frames 540-720 = 180f): Trechos */}
        <Series.Sequence durationInFrames={180}>
          <AnimatedMockupContainer entry="right" exit="none">
            <TrechosGridScreen />
          </AnimatedMockupContainer>
        </Series.Sequence>

        {/* CENA 5 (frames 720-960 = 240f): Modal RDO */}
        <Series.Sequence durationInFrames={240}>
          <AnimatedMockupContainer entry="none" exit="top" exitStartFrame={225}>
            <SupervisorModalScreen />
          </AnimatedMockupContainer>
        </Series.Sequence>

        {/* CENA 6 (frames 960-1200 = 240f): Encerramento */}
        <Series.Sequence durationInFrames={240}>
          <ClosingScene
            lines={[
              "Gestão de canteiro em tempo real.",
              "Com dados de verdade.",
              "Gerados por quem está no campo.",
            ]}
            finalBrand="MetricLab"
          />
        </Series.Sequence>
      </Series>
    </VideoBackground>
  );
};
