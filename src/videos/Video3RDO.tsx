import React from 'react';
import {
  Audio,
  staticFile,
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

export const Video3RDO: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        'linear-gradient(135deg, #f0f4ff, #f9fafb, #f0fdf4)',
    }}
  >
    <Audio
      src={staticFile('audio/rdo.mp3')}
      startFrom={0}
      volume={1}
    />

    {/* Abertura (0-30f) */}
    <Sequence from={0} durationInFrames={s(1)}>
      <OpeningScene titulo="Relatório Diário de Obra" />
    </Sequence>

    {/* iPhone entra (30-90f) */}
    <Sequence from={s(1)} durationInFrames={s(2)}>
      <IPhoneEntrada direction="bottom" />
    </Sequence>

    {/* Splash + Login (90-270f / 3-9s) */}
    <Sequence from={s(3)} durationInFrames={s(6)}>
      <AnimatedMockupContainer direction="bottom">
        <OffthreadVideo
          src={staticFile('recordings/v3-rdo.webm')}
          startFrom={0}
          endAt={s(6)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '44px',
          }}
        />
      </AnimatedMockupContainer>
    </Sequence>

    {/* Menu + escolha RDO (270-480f / 9-16s) */}
    <Sequence from={s(9)} durationInFrames={s(7)}>
      <AnimatedMockupContainer direction="left">
        <OffthreadVideo
          src={staticFile('recordings/v3-rdo.webm')}
          startFrom={s(6)}
          endAt={s(13)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '44px',
          }}
        />
      </AnimatedMockupContainer>
    </Sequence>

    {/* Turno + clima + crachá (480-720f / 16-24s) */}
    <Sequence from={s(16)} durationInFrames={s(8)}>
      <AnimatedMockupContainer direction="right">
        <OffthreadVideo
          src={staticFile('recordings/v3-rdo.webm')}
          startFrom={s(13)}
          endAt={s(21)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '44px',
          }}
        />
      </AnimatedMockupContainer>
    </Sequence>

    {/* Máquinas + fotos + atividades (720-960f / 24-32s) */}
    <Sequence from={s(24)} durationInFrames={s(8)}>
      <AnimatedMockupContainer direction="left">
        <OffthreadVideo
          src={staticFile('recordings/v3-rdo.webm')}
          startFrom={s(21)}
          endAt={s(29)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '44px',
          }}
        />
      </AnimatedMockupContainer>
    </Sequence>

    {/* Assinatura + confirmação (960-1110f / 32-37s) */}
    <Sequence from={s(32)} durationInFrames={s(5)}>
      <AnimatedMockupContainer direction="bottom">
        <OffthreadVideo
          src={staticFile('recordings/v3-rdo.webm')}
          startFrom={s(29)}
          endAt={s(34)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '44px',
          }}
        />
      </AnimatedMockupContainer>
    </Sequence>

    {/* iPhone some (1110-1140f / 37-38s) */}
    <Sequence from={s(37)} durationInFrames={s(1)}>
      <IPhoneSaida direction="top" />
    </Sequence>

    {/* Tagline (1140-1170f / 38-39s) */}
    <Sequence from={s(38)} durationInFrames={s(1)}>
      <ClosingScene tagline="Campo conectado. Dado real." />
    </Sequence>
  </AbsoluteFill>
);
