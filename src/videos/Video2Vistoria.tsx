import React from "react";
import { Series, Sequence } from "remotion";
import { VideoBackground } from "../components/VideoBackground";
import { OpeningScene } from "../components/OpeningScene";
import { ClosingScene } from "../components/ClosingScene";
import { AnimatedMockupContainer } from "../components/AnimatedMockupContainer";
import { WhatsAppNotificationScreen } from "../screens/vistoria/WhatsAppNotificationScreen";
import { VistoriaSplashScreen } from "../screens/vistoria/SplashScreen";
import { VistoriaLoginScreen } from "../screens/vistoria/LoginScreen";
import { VistoriaTrechosScreen } from "../screens/vistoria/TrechosScreen";
import { VistoriaChecklistScreen } from "../screens/vistoria/ChecklistScreen";
import { VistoriaFotosScreen } from "../screens/vistoria/FotosScreen";
import { VistoriaAssinaturaScreen } from "../screens/vistoria/AssinaturaScreen";
import { VistoriaStatusScreen } from "../screens/vistoria/StatusScreen";

export const Video2Vistoria: React.FC = () => {
  return (
    <VideoBackground title="Vistoria Cautelar" subtitle="Laudo Técnico Estrutural e Perícia com IA">
      <Series>
        {/* CENA 1 (frames 0-60 = 60f): Abertura */}
        <Series.Sequence durationInFrames={60}>
          <OpeningScene
            title="Vistoria Cautelar Digital"
            subtitle="Perícia de vizinhança pré-obra sem prancheta e 100% digital"
          />
        </Series.Sequence>

        {/* CENA 2 (frames 60-180 = 120f): WhatsApp chegando */}
        <Series.Sequence durationInFrames={120}>
          <AnimatedMockupContainer entry="left" exit="none">
            <WhatsAppNotificationScreen />
          </AnimatedMockupContainer>
        </Series.Sequence>

        {/* CENA 3 (frames 180-300 = 120f): Splash + Login (Flip) */}
        <Series.Sequence durationInFrames={120}>
          <AnimatedMockupContainer entry="flip" exit="none">
            <Sequence from={0} durationInFrames={50}>
              <VistoriaSplashScreen />
            </Sequence>
            <Sequence from={50} durationInFrames={70}>
              <VistoriaLoginScreen />
            </Sequence>
          </AnimatedMockupContainer>
        </Series.Sequence>

        {/* CENA 4 (frames 300-480 = 180f): Trechos + Checklist */}
        <Series.Sequence durationInFrames={180}>
          <AnimatedMockupContainer entry="none" exit="top" exitStartFrame={165}>
            <Sequence from={0} durationInFrames={70}>
              <VistoriaTrechosScreen />
            </Sequence>
            <Sequence from={70} durationInFrames={110}>
              <VistoriaChecklistScreen />
            </Sequence>
          </AnimatedMockupContainer>
        </Series.Sequence>

        {/* CENA 5 (frames 480-720 = 240f): Fotos + Assinatura */}
        <Series.Sequence durationInFrames={240}>
          <AnimatedMockupContainer entry="right" exit="top" exitStartFrame={225}>
            <Sequence from={0} durationInFrames={120}>
              <VistoriaFotosScreen />
            </Sequence>
            <Sequence from={120} durationInFrames={120}>
              <VistoriaAssinaturaScreen />
            </Sequence>
          </AnimatedMockupContainer>
        </Series.Sequence>

        {/* CENA 6 (frames 720-960 = 240f): Resultado IA */}
        <Series.Sequence durationInFrames={240}>
          <AnimatedMockupContainer entry="bottom" exit="top" exitStartFrame={225}>
            <VistoriaStatusScreen />
          </AnimatedMockupContainer>
        </Series.Sequence>

        {/* CENA 7 (frames 960-1200 = 240f): Encerramento */}
        <Series.Sequence durationInFrames={240}>
          <ClosingScene
            lines={[
              "Vistoria digital.",
              "100% Rastreável.",
              "Sem papel.",
            ]}
          />
        </Series.Sequence>
      </Series>
    </VideoBackground>
  );
};
