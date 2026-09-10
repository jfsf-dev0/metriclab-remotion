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

export const Video4Supervisor: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        'linear-gradient(135deg, #f0f4ff, #f9fafb, #f0fdf4)',
    }}
  >
    <Audio
      src={staticFile('audio/supervisor.mp3')}
      startFrom={0}
      volume={1}
    />

    {/* Abertura (0-30f) */}
    <Sequence from={0} durationInFrames={s(1)}>
      <OpeningScene titulo="Painel do Supervisor" />
    </Sequence>

    {/* iPhone entra (30-90f) */}
    <Sequence from={s(1)} durationInFrames={s(2)}>
      <IPhoneEntrada direction="bottom" />
    </Sequence>

    {/* KPIs contando (90-330f / 3-11s) */}
    <Sequence from={s(3)} durationInFrames={s(8)}>
      <AnimatedMockupContainer direction="bottom">
        <OffthreadVideo
          src={staticFile('recordings/v4-supervisor.webm')}
          startFrom={0}
          endAt={s(8)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '44px',
          }}
        />
      </AnimatedMockupContainer>
    </Sequence>

    {/* Feed tempo real (330-570f / 11-19s) */}
    <Sequence from={s(11)} durationInFrames={s(8)}>
      <AnimatedMockupContainer direction="left">
        <OffthreadVideo
          src={staticFile('recordings/v4-supervisor.webm')}
          startFrom={s(8)}
          endAt={s(16)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '44px',
          }}
        />
      </AnimatedMockupContainer>
    </Sequence>

    {/* Grid trechos (570-810f / 19-27s) */}
    <Sequence from={s(19)} durationInFrames={s(8)}>
      <AnimatedMockupContainer direction="right">
        <OffthreadVideo
          src={staticFile('recordings/v4-supervisor.webm')}
          startFrom={s(16)}
          endAt={s(24)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '44px',
          }}
        />
      </AnimatedMockupContainer>
    </Sequence>

    {/* Modal RDO completo (810-1020f / 27-34s) */}
    <Sequence from={s(27)} durationInFrames={s(7)}>
      <AnimatedMockupContainer direction="left">
        <OffthreadVideo
          src={staticFile('recordings/v4-supervisor.webm')}
          startFrom={s(24)}
          endAt={s(31)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '44px',
          }}
        />
      </AnimatedMockupContainer>
    </Sequence>

    {/* iPhone some (1020-1050f / 34-35s) */}
    <Sequence from={s(34)} durationInFrames={s(1)}>
      <IPhoneSaida direction="top" />
    </Sequence>

    {/* Tagline (1050-1080f / 35-36s) */}
    <Sequence from={s(35)} durationInFrames={s(1)}>
      <ClosingScene tagline="Decisão com base em dados de campo." />
    </Sequence>
  </AbsoluteFill>
);
