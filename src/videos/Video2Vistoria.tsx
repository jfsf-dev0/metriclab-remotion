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

export const Video2Vistoria: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        'linear-gradient(135deg, #f0f4ff, #f9fafb, #f0fdf4)',
    }}
  >
    <Audio
      src={staticFile('audio/vistoria.mp3')}
      startFrom={0}
      volume={1}
    />

    {/* Abertura (0-30f) */}
    <Sequence from={0} durationInFrames={s(1)}>
      <OpeningScene titulo="Vistoria Cautelar" />
    </Sequence>

    {/* iPhone entra (30-90f) */}
    <Sequence from={s(1)} durationInFrames={s(2)}>
      <IPhoneEntrada direction="bottom" />
    </Sequence>

    {/* WhatsApp notificação (90-270f / 3-9s) */}
    <Sequence from={s(3)} durationInFrames={s(6)}>
      <AnimatedMockupContainer direction="bottom">
        <OffthreadVideo
          src={staticFile('recordings/v2-vistoria.webm')}
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

    {/* Splash + Login (270-480f / 9-16s) */}
    <Sequence from={s(9)} durationInFrames={s(7)}>
      <AnimatedMockupContainer direction="left">
        <OffthreadVideo
          src={staticFile('recordings/v2-vistoria.webm')}
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

    {/* Trechos + Checklist (480-720f / 16-24s) */}
    <Sequence from={s(16)} durationInFrames={s(8)}>
      <AnimatedMockupContainer direction="right">
        <OffthreadVideo
          src={staticFile('recordings/v2-vistoria.webm')}
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

    {/* Fotos + Assinatura + GPS (720-990f / 24-33s) */}
    <Sequence from={s(24)} durationInFrames={s(9)}>
      <AnimatedMockupContainer direction="left">
        <OffthreadVideo
          src={staticFile('recordings/v2-vistoria.webm')}
          startFrom={s(21)}
          endAt={s(30)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '44px',
          }}
        />
      </AnimatedMockupContainer>
    </Sequence>

    {/* Resultado IA score 94 (990-1200f / 33-40s) */}
    <Sequence from={s(33)} durationInFrames={s(7)}>
      <AnimatedMockupContainer direction="bottom">
        <OffthreadVideo
          src={staticFile('recordings/v2-vistoria.webm')}
          startFrom={s(30)}
          endAt={s(37)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '44px',
          }}
        />
      </AnimatedMockupContainer>
    </Sequence>

    {/* iPhone some (1200-1230f / 40-41s) */}
    <Sequence from={s(40)} durationInFrames={s(1)}>
      <IPhoneSaida direction="top" />
    </Sequence>

    {/* Tagline (1230-1290f / 41-43s) */}
    <Sequence from={s(41)} durationInFrames={s(2)}>
      <ClosingScene tagline="Vistoria digital. Sem papel." />
    </Sequence>
  </AbsoluteFill>
);
