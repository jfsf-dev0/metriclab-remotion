import React from "react";
import { Series, Sequence } from "remotion";
import { VideoBackground } from "../components/VideoBackground";
import { OpeningScene } from "../components/OpeningScene";
import { ClosingScene } from "../components/ClosingScene";
import { AnimatedMockupContainer } from "../components/AnimatedMockupContainer";
import { RdoSplashScreen } from "../screens/rdo/SplashScreen";
import { LoginRdoScreen } from "../screens/rdo/LoginRdoScreen";
import { RdoMenuScreen } from "../screens/rdo/MenuScreen";
import { RdoPassosScreen } from "../screens/rdo/RdoPassosScreen";
import { RdoConfirmacaoScreen } from "../screens/rdo/ConfirmacaoScreen";

export const Video3RDO: React.FC = () => {
  return (
    <VideoBackground
      title="Relatório Diário de Obra"
      subtitle="Apontamento de Campo em Tempo Real • Consórcio Lote 15"
    >
      <Series>
        {/* CENA 1 (frames 0-60 = 60f): Abertura */}
        <Series.Sequence durationInFrames={60}>
          <OpeningScene
            title="Relatório Diário de Obra"
            subtitle="Do canteiro diretamente para a diretoria, com evidências auditáveis"
          />
        </Series.Sequence>

        {/* CENA 2 (frames 60-180 = 120f): Splash + Login */}
        <Series.Sequence durationInFrames={120}>
          <AnimatedMockupContainer entry="bottom" exit="none">
            <Sequence from={0} durationInFrames={50}>
              <RdoSplashScreen />
            </Sequence>
            <Sequence from={50} durationInFrames={70}>
              <LoginRdoScreen />
            </Sequence>
          </AnimatedMockupContainer>
        </Series.Sequence>

        {/* CENA 3 (frames 180-360 = 180f): Menu + Escolha */}
        <Series.Sequence durationInFrames={180}>
          <AnimatedMockupContainer entry="none" exit="none">
            <RdoMenuScreen />
          </AnimatedMockupContainer>
        </Series.Sequence>

        {/* CENA 4 (frames 360-600 = 240f): RDO Passos 1-2 */}
        <Series.Sequence durationInFrames={240}>
          <AnimatedMockupContainer entry="none" exit="top" exitStartFrame={225}>
            <RdoPassosScreen stepGroup="1-2" />
          </AnimatedMockupContainer>
        </Series.Sequence>

        {/* CENA 5 (frames 600-840 = 240f): RDO Passos 3-4 */}
        <Series.Sequence durationInFrames={240}>
          <AnimatedMockupContainer entry="left" exit="none">
            <RdoPassosScreen stepGroup="3-4" />
          </AnimatedMockupContainer>
        </Series.Sequence>

        {/* CENA 6 (frames 840-1050 = 210f): Assinatura + Envio + Confirmação */}
        <Series.Sequence durationInFrames={210}>
          <AnimatedMockupContainer entry="none" exit="top" exitStartFrame={195}>
            <Sequence from={0} durationInFrames={105}>
              <RdoPassosScreen stepGroup="5" />
            </Sequence>
            <Sequence from={105} durationInFrames={105}>
              <RdoConfirmacaoScreen />
            </Sequence>
          </AnimatedMockupContainer>
        </Series.Sequence>

        {/* CENA 7 (frames 1050-1200 = 150f): Encerramento */}
        <Series.Sequence durationInFrames={150}>
          <ClosingScene
            lines={[
              "Zero papel.",
              "Zero redigitação.",
              "Zero perda de informação.",
            ]}
          />
        </Series.Sequence>
      </Series>
    </VideoBackground>
  );
};
