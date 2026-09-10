import React from 'react';
import {
  Audio,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
} from 'remotion';
import { OpeningScene } from '../components/OpeningScene';
import { ClosingScene } from '../components/ClosingScene';
import { AnimatedMockupContainer } from '../components/AnimatedMockupContainer';
import { IPhoneEntrada } from '../components/IPhoneEntrada';
import { IPhoneSaida } from '../components/IPhoneSaida';

const s = (sec: number) => sec * 30;

export const Video1Contratacao: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background:
          'linear-gradient(135deg, #f0f4ff, #f9fafb, #f0fdf4)',
      }}
    >
      <Audio
        src={staticFile('audio/admissao.mp3')}
        startFrom={0}
        volume={1}
      />

      {/* CENA 1 — Abertura (0-30f / 1s) */}
      <Sequence from={0} durationInFrames={s(1)}>
        <OpeningScene titulo="Fluxo de Contratação" />
      </Sequence>

      {/* CENA 2 — iPhone entra (30-90f) */}
      <Sequence from={s(1)} durationInFrames={s(2)}>
        <IPhoneEntrada direction="bottom" />
      </Sequence>

      {/* CENA 3 — Formulário (90-300f / 3-10s) */}
      <Sequence from={s(3)} durationInFrames={s(7)}>
        <AnimatedMockupContainer direction="bottom">
          <OffthreadVideo
            src={staticFile('recordings/v1-contratacao.webm')}
            startFrom={0}
            endAt={s(7)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '44px',
            }}
          />
        </AnimatedMockupContainer>
      </Sequence>

      {/* CENA 4 — Tracker fases (300-540f / 10-18s) */}
      <Sequence from={s(10)} durationInFrames={s(8)}>
        <AnimatedMockupContainer direction="left">
          <OffthreadVideo
            src={staticFile('recordings/v1-contratacao.webm')}
            startFrom={s(7)}
            endAt={s(15)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '44px',
            }}
          />
        </AnimatedMockupContainer>
      </Sequence>

      {/* CENA 5 — WhatsApp Jota (540-750f / 18-25s) */}
      <Sequence from={s(18)} durationInFrames={s(7)}>
        <AnimatedMockupContainer direction="right">
          <OffthreadVideo
            src={staticFile('recordings/v1-contratacao.webm')}
            startFrom={s(15)}
            endAt={s(22)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '44px',
            }}
          />
        </AnimatedMockupContainer>
      </Sequence>

      {/* CENA 6 — iPhone some (750-870f / 25-29s) */}
      <Sequence from={s(25)} durationInFrames={s(4)}>
        <IPhoneSaida direction="top" />
      </Sequence>

      {/* CENA 7 — Tagline (870-930f / 29-31s) */}
      <Sequence from={s(29)} durationInFrames={s(2)}>
        <ClosingScene tagline="Admissão operacional automatizada." />
      </Sequence>
    </AbsoluteFill>
  );
};
