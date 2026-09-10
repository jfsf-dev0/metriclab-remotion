import React from 'react';
import { Composition } from 'remotion';
import { Video1Contratacao } from './videos/Video1Contratacao';
import { Video2Vistoria } from './videos/Video2Vistoria';
import { Video3RDO } from './videos/Video3RDO';
import { Video4Supervisor } from './videos/Video4Supervisor';
import { VideoAdmissao } from './videos/VideoAdmissao';
import './style.css';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="VideoAdmissao"
      component={VideoAdmissao}
      durationInFrames={1350}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="Video1Contratacao"
      component={Video1Contratacao}
      durationInFrames={930}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="Video2Vistoria"
      component={Video2Vistoria}
      durationInFrames={1290}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="Video3RDO"
      component={Video3RDO}
      durationInFrames={1170}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="Video4Supervisor"
      component={Video4Supervisor}
      durationInFrames={1080}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
);

export const Root = RemotionRoot;
