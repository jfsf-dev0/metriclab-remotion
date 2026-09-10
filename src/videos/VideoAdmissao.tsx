import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Audio,
  staticFile,
} from 'remotion';
import { IPhoneMockup } from '../components/IPhoneMockup';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TOKENS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const T = {
  canvas: '#F0F0F0',
  surface: '#FFFFFF',
  hairline: '#E5E5E3',
  ink: '#111111',
  graphite: '#6B6B6B',
  stone: '#9B9B9B',
  ash: '#C4C4C2',
  accent: '#F5A623',
  blue: '#2563EB',
  waGreen: '#DCF8C6',
  waBg: '#ECECEC',
};

export const SYNC = {
  abertura: 0.0, // "Um processo feito por MetricLab"
  vaga: 2.42, // "Uma vaga nasce no canteiro"
  gestor_abre: 4.04, // "O gestor abre o sistema"
  aciona: 6.72, // "e aciona o processo"
  a_partir: 8.14, // "A partir daí"
  ml_assume: 9.47, // "a MetricLab assume"
  app_abre: 12.43, // "O app abre a ficha"
  nome_wpp: 14.9, // "Nome, WhatsApp, cargo"
  jota_contato: 18.17, // "O Jota, assistente"
  entra_contato: 20.05, // "entra em contato"
  confirma: 22.86, // "Confirma a identidade"
  solicita: 24.6, // "Solicita os documentos"
  rg_cpf: 27.34, // "RG e CPF"
  candidato_nao: 29.91, // "O candidato não precisa"
  gestor_nao: 32.18, // "O gestor não precisa"
  validado: 34.64, // "Quando tudo está validado"
  jota_rh: 35.98, // "o Jota sinaliza o RH"
  gestor_resumo: 38.28, // "O gestor recebe o resumo"
  cand_cargo: 39.96, // "candidato, cargo"
  ml_exame: 42.32, // "a MetricLab agendou o exame"
  decisao: 44.77, // "A decisão final é humana"
  trabalho_ml: 47.92, // "O trabalho operacional"
  processo: 49.75, // "Processo completo"
  rastreavel: 51.01, // "Rastreável"
  sem_depender: 52.11, // "Sem depender"
  empresas: 53.35, // "Para empresas que crescem"
  operacao: 54.26, // "e precisam que a operação"
  metriclab_fim: 56.46, // "MetricLab."
};

const s = (sec: number) => Math.round(sec * 30);

interface SceneProps {
  frame?: number;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CENA 1 — SPLASH (0 → s(2.42) = 0 → 73)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const SplashScene: React.FC<SceneProps> = ({ frame: propFrame }) => {
  const currentFrame = useCurrentFrame();
  const frame = propFrame !== undefined ? propFrame : currentFrame;
  const { fps } = useVideoConfig();

  // frame 0→15: Ícone 96×96px, spring(mass:0.6, damping:14) scale 0.6→1.0, opacity 0→1
  const iconSpring = spring({
    frame,
    fps,
    config: { mass: 0.6, damping: 14 },
  });
  const iconScale = interpolate(iconSpring, [0, 1], [0.6, 1.0]);
  const iconOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // frame 10→25: Badge "CONSÓRCIO LOTE 15", opacity 0→1 ease
  const badgeOpacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // frame 18→48: "MetricLab", opacity 0→1 + translateY 14→0 ease
  const marcaOpacity = interpolate(frame, [18, 48], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const marcaY = interpolate(frame, [18, 48], [14, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // frame 30→55: "Fluxo de Contratação", opacity 0→1 ease
  const subOpacity = interpolate(frame, [30, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // frame 42→65: "Sistema Integrado de Engenharia e Gestão", opacity 0→1 ease
  const descOpacity = interpolate(frame, [42, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Transição de saída suave nos últimos frames até s(2.42)=73
  const exitOpacity = interpolate(frame, [65, 73], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: T.canvas,
        opacity: exitOpacity,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginTop: '-60px',
        }}
      >
        {/* Ícone 96x96 */}
        <div
          style={{
            width: '96px',
            height: '96px',
            borderRadius: '24px',
            backgroundColor: T.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${iconScale})`,
            opacity: iconOpacity,
            boxShadow: '0 12px 32px rgba(245, 166, 35, 0.35)',
          }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 19V13"
              stroke="#111111"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M12 19V9"
              stroke="#111111"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M18 19V5"
              stroke="#111111"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Badge "CONSÓRCIO LOTE 15" */}
        <div
          style={{
            marginTop: '20px',
            opacity: badgeOpacity,
            border: `1px solid ${T.hairline}`,
            backgroundColor: T.surface,
            padding: '6px 16px',
            borderRadius: '99px',
            fontSize: '13px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            color: T.ink,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          CONSÓRCIO LOTE 15
        </div>

        {/* "MetricLab" */}
        <div
          style={{
            marginTop: '16px',
            opacity: marcaOpacity,
            transform: `translateY(${marcaY}px)`,
            fontSize: '72px',
            fontWeight: 900,
            letterSpacing: '-2.5px',
            lineHeight: 1.0,
            color: T.ink,
          }}
        >
          MetricLab
        </div>

        {/* "Fluxo de Contratação" */}
        <div
          style={{
            marginTop: '8px',
            opacity: subOpacity,
            fontSize: '28px',
            fontWeight: 700,
            color: T.accent,
            letterSpacing: '-0.3px',
          }}
        >
          Fluxo de Contratação
        </div>

        {/* "Sistema Integrado de Engenharia e Gestão" */}
        <div
          style={{
            marginTop: '8px',
            opacity: descOpacity,
            fontSize: '17px',
            fontWeight: 400,
            color: T.graphite,
          }}
        >
          Sistema Integrado de Engenharia e Gestão
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CENA 2 — HOME DO APP (s(2.42) → s(9.47) = 73 → 284 / 211 frames)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const HomeScene: React.FC<SceneProps> = ({ frame: propFrame }) => {
  const currentFrame = useCurrentFrame();
  const frame = propFrame !== undefined ? propFrame : currentFrame;
  const { fps } = useVideoConfig();

  // iPhone entra em frame s(2.42)=73: spring translateY 1100→0
  const enterSpring = spring({
    frame: frame - 73,
    fps,
    config: { damping: 14, mass: 0.6 },
  });
  const translateY = interpolate(enterSpring, [0, 1], [1100, 0]);

  // Transição de saída nos últimos frames da cena (frames 270→284)
  const exitX = interpolate(frame, [270, 284], [0, -400], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // FAB frame 105→125: spring scale 0→1
  const fabSpring = spring({
    frame: frame - 105,
    fps,
    config: { damping: 14, mass: 0.6 },
  });
  const fabScale = interpolate(fabSpring, [0, 1], [0, 1]);

  // Drawer abre em frame s(4.04)=121: 15 frames (121→136)
  // Drawer fecha em frame s(6.72)=202: 15 frames (202→217)
  let hamburgerProgress = 0;
  if (frame >= 121 && frame < 202) {
    hamburgerProgress = interpolate(frame, [121, 136], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (frame >= 202) {
    hamburgerProgress = interpolate(frame, [202, 217], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  }

  const line1Y = hamburgerProgress * 6;
  const line1Rotate = hamburgerProgress * 45;
  const line2Opacity = 1 - hamburgerProgress;
  const line3Y = hamburgerProgress * -6;
  const line3Rotate = hamburgerProgress * -45;

  const drawerSpring = spring({
    frame: frame - 121,
    fps,
    config: { damping: 16, mass: 0.5 },
  });

  let drawerX = -220;
  if (frame >= 121 && frame < 202) {
    drawerX = interpolate(drawerSpring, [0, 1], [-220, 0]);
  } else if (frame >= 202) {
    drawerX = interpolate(frame, [202, 222], [0, -220], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  }

  // Clique botão em frame s(7.5)=225: btn scale 1.0→0.95 (5f) → 1.0 (5f)
  const btnScale = interpolate(frame, [225, 230, 235], [1.0, 0.95, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: T.canvas,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          transform: `translateX(${exitX}px) translateY(${translateY}px)`,
        }}
      >
        <IPhoneMockup scale={2.2}>
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: T.canvas,
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              fontFamily:
                'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            {/* STATUS BAR 40px */}
            <div
              style={{
                height: '40px',
                paddingTop: '12px',
                paddingLeft: '18px',
                paddingRight: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: T.canvas,
                zIndex: 20,
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: T.ink,
                }}
              >
                9:41
              </span>
              <span
                style={{
                  fontSize: '10px',
                  color: T.ink,
                  letterSpacing: '2px',
                }}
              >
                ●●●
              </span>
            </div>

            {/* NAVBAR 46px */}
            <div
              style={{
                height: '46px',
                backgroundColor: T.surface,
                borderBottom: `1px solid ${T.hairline}`,
                paddingLeft: '16px',
                paddingRight: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                zIndex: 20,
              }}
            >
              {/* Hambúrguer */}
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: '18px',
                    height: '2px',
                    backgroundColor: T.ink,
                    borderRadius: '1px',
                    transform: `translateY(${line1Y}px) rotate(${line1Rotate}deg)`,
                    transformOrigin: 'center',
                  }}
                />
                <div
                  style={{
                    width: '18px',
                    height: '2px',
                    backgroundColor: T.ink,
                    borderRadius: '1px',
                    marginTop: '4px',
                    marginBottom: '4px',
                    opacity: line2Opacity,
                  }}
                />
                <div
                  style={{
                    width: '18px',
                    height: '2px',
                    backgroundColor: T.ink,
                    borderRadius: '1px',
                    transform: `translateY(${line3Y}px) rotate(${line3Rotate}deg)`,
                    transformOrigin: 'center',
                  }}
                />
              </div>

              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: T.ink,
                }}
              >
                Colaboradores
              </span>

              <div style={{ width: '24px' }} />
            </div>

            {/* HOME CONTENT */}
            <div
              style={{
                flex: 1,
                backgroundColor: T.canvas,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              <div style={{ padding: '16px', paddingBottom: '8px' }}>
                <div
                  style={{
                    fontSize: '22px',
                    fontWeight: 700,
                    color: T.ink,
                    lineHeight: 1.1,
                  }}
                >
                  Colaboradores
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    color: T.stone,
                    marginTop: '2px',
                  }}
                >
                  Consórcio Lote 15 · 0 ativos
                </div>

                <button
                  type="button"
                  style={{
                    marginTop: '12px',
                    width: '100%',
                    height: '36px',
                    backgroundColor: T.ink,
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: 600,
                    borderRadius: '6px',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: `scale(${btnScale})`,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                  }}
                >
                  Novo Colaborador
                </button>
              </div>

              {/* Empty state */}
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '24px',
                  textAlign: 'center',
                }}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={T.ash}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>

                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: T.graphite,
                    marginTop: '12px',
                  }}
                >
                  Nenhum colaborador
                </div>
                <div
                  style={{
                    fontSize: '10px',
                    color: T.stone,
                    marginTop: '4px',
                    textAlign: 'center',
                  }}
                >
                  Clique para iniciar o processo de admissão
                </div>
              </div>

              {/* FAB canto direito */}
              <div
                style={{
                  position: 'absolute',
                  right: '16px',
                  bottom: '16px',
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: T.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(245,166,35,0.4)',
                  transform: `scale(${fabScale})`,
                  zIndex: 30,
                }}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>

              {/* DRAWER */}
              {drawerX > -220 && (
                <>
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      opacity: interpolate(drawerX, [-220, 0], [0, 0.4]),
                      zIndex: 39,
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      width: '220px',
                      height: '100%',
                      backgroundColor: T.surface,
                      boxShadow: '4px 0 20px rgba(0,0,0,0.1)',
                      transform: `translateX(${drawerX}px)`,
                      zIndex: 40,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        padding: '16px',
                        paddingTop: '48px',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '22px',
                          fontWeight: 900,
                          color: T.ink,
                          lineHeight: 1,
                        }}
                      >
                        m<span style={{ color: T.accent }}>.</span>
                      </div>
                      <div
                        style={{
                          fontSize: '10px',
                          color: T.stone,
                          marginTop: '2px',
                        }}
                      >
                        Eng. Roberto Lima
                      </div>
                    </div>

                    <div
                      style={{
                        height: '1px',
                        backgroundColor: T.hairline,
                      }}
                    />

                    <div style={{ paddingTop: '8px' }}>
                      <div
                        style={{
                          height: '44px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          borderLeft: `3px solid ${T.accent}`,
                          backgroundColor: '#FFF9EC',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: T.ink,
                        }}
                      >
                        Colaboradores
                      </div>

                      {['Obras', 'Documentos', 'Relatórios', 'Configurações'].map(
                        (item) => (
                          <div
                            key={item}
                            style={{
                              height: '44px',
                              paddingLeft: '16px',
                              paddingRight: '16px',
                              display: 'flex',
                              alignItems: 'center',
                              borderLeft: '3px solid transparent',
                              fontSize: '12px',
                              fontWeight: 500,
                              color: T.stone,
                            }}
                          >
                            {item}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </IPhoneMockup>
      </div>
    </AbsoluteFill>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CENA 3 — FORMULÁRIO (s(9.47) → s(18.0) = 284 → 540 / 256 frames)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const FormScene: React.FC<SceneProps> = ({ frame: propFrame }) => {
  const currentFrame = useCurrentFrame();
  const frame = propFrame !== undefined ? propFrame : currentFrame;
  const { fps } = useVideoConfig();

  // iPhone troca em frame s(9.47)=284: Novo iPhone translateX 400→0 spring
  const enterSpring = spring({
    frame: frame - 284,
    fps,
    config: { damping: 14, mass: 0.6 },
  });
  const enterX = interpolate(enterSpring, [0, 1], [400, 0]);

  // Saída nos últimos frames (transição para WhatsApp em 540)
  const exitX = interpolate(frame, [530, 540], [0, -400], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const finalX = enterX + exitX;

  // Helper de digitação sincronizado
  const getTyped = (text: string, start: number, duration: number) => {
    if (frame < start) {
      return { text: '', active: false, cursor: false };
    }
    const end = start + duration;
    if (frame >= end) {
      return { text, active: true, cursor: false };
    }
    const progress = (frame - start) / duration;
    const chars = Math.floor(progress * text.length);
    const cursor = Math.floor(frame / 4) % 2 === 0;
    return { text: text.slice(0, chars), active: true, cursor };
  };

  // Campo 1 digita de s(12.43)=373 → s(13.5)=405 (duration 32f)
  const c1 = getTyped('João Silva', 373, 32);

  // Campo 2 digita de s(13.6)=408 → s(14.4)=432 (duration 24f)
  const c2 = getTyped('+55 (11) 98765-4321', 408, 24);

  // Campo 3 digita de s(14.5)=435 → s(15.2)=456 (duration 21f)
  const c3 = getTyped('+55 (11) 91234-5678', 435, 21);

  // Campo 4 digita de s(15.3)=459 → s(16.5)=495 (duration 36f)
  const c4 = getTyped('Analista de Planejamento', 459, 36);

  // Botão ativa frame s(16.8)=504
  const isBtnActive = frame >= 504;
  const btnOpacity = interpolate(frame, [495, 504], [0.35, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Botão press frame s(17.2)=516
  const btnScale = interpolate(frame, [516, 521, 526], [1.0, 0.97, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const btnBg =
    frame >= 516 && frame <= 526
      ? interpolate(frame, [516, 521, 526], [0, 1, 0]) > 0.5
        ? '#333333'
        : '#111111'
      : isBtnActive
      ? '#F5A623'
      : '#111111';

  // WA overlay frame s(17.5)=525 → s(18.0)=540
  const overlayOpacity = interpolate(frame, [525, 540], [0, 0.95], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Círculo #25D366 80px: spring scale frame 525→540
  const waSpring = spring({
    frame: frame - 525,
    fps,
    config: { damping: 14, mass: 0.6 },
  });
  const waScale = interpolate(waSpring, [0, 1], [0.15, 1.0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: T.canvas,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ transform: `translateX(${finalX}px)` }}>
        <IPhoneMockup scale={2.2}>
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: T.surface,
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              fontFamily:
                'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            {/* STATUS BAR: "9:42" */}
            <div
              style={{
                height: '40px',
                paddingTop: '12px',
                paddingLeft: '18px',
                paddingRight: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: T.surface,
                zIndex: 10,
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: T.ink,
                }}
              >
                9:42
              </span>
              <span
                style={{
                  fontSize: '10px',
                  color: T.ink,
                  letterSpacing: '2px',
                }}
              >
                ●●●
              </span>
            </div>

            {/* NAVBAR bg white */}
            <div
              style={{
                height: '46px',
                borderBottom: `1px solid ${T.hairline}`,
                paddingLeft: '16px',
                paddingRight: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: T.ink,
                }}
              >
                m<span style={{ color: T.accent }}>.</span>
              </span>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: T.ink,
                }}
              >
                Novo Colaborador
              </span>
              <div style={{ width: '16px' }} />
            </div>

            {/* CONTEÚDO padding 16px */}
            <div
              style={{
                flex: 1,
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              <div
                style={{
                  fontSize: '9px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: T.stone,
                  marginBottom: '5px',
                }}
              >
                TRIAGEM E ADMISSÃO
              </div>

              <div
                style={{
                  fontSize: '17px',
                  fontWeight: 400,
                  lineHeight: 1.1,
                  color: T.ink,
                  marginBottom: '3px',
                }}
              >
                Iniciar Processo de Contratação
              </div>

              <div
                style={{
                  fontSize: '11px',
                  color: T.graphite,
                  marginBottom: '12px',
                }}
              >
                O gestor inicia. A MetricLab opera.
              </div>

              <div
                style={{
                  height: '1px',
                  backgroundColor: T.hairline,
                  marginBottom: '14px',
                }}
              />

              {/* 4 CAMPOS UNDERLINE */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                {/* CAMPO 1 */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label
                    style={{
                      fontSize: '8px',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      color: T.stone,
                    }}
                  >
                    NOME DO CANDIDATO
                  </label>
                  <div
                    style={{
                      borderBottom: `1px solid ${c1.active ? T.ink : T.hairline}`,
                      padding: '4px 0',
                      fontSize: '13px',
                      color: T.ink,
                      minHeight: '26px',
                    }}
                  >
                    {c1.text}
                    {c1.cursor && (
                      <span
                        style={{
                          display: 'inline-block',
                          width: '2px',
                          height: '13px',
                          backgroundColor: T.ink,
                          marginLeft: '1px',
                          verticalAlign: 'middle',
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* CAMPO 2 */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label
                    style={{
                      fontSize: '8px',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      color: T.stone,
                    }}
                  >
                    WHATSAPP (+55)
                  </label>
                  <div
                    style={{
                      borderBottom: `1px solid ${c2.active ? T.ink : T.hairline}`,
                      padding: '4px 0',
                      fontSize: '13px',
                      color: T.ink,
                      minHeight: '26px',
                    }}
                  >
                    {c2.text}
                    {c2.cursor && (
                      <span
                        style={{
                          display: 'inline-block',
                          width: '2px',
                          height: '13px',
                          backgroundColor: T.ink,
                          marginLeft: '1px',
                          verticalAlign: 'middle',
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* CAMPO 3 */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label
                    style={{
                      fontSize: '8px',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      color: T.stone,
                    }}
                  >
                    WHATSAPP DO GESTOR
                  </label>
                  <div
                    style={{
                      borderBottom: `1px solid ${c3.active ? T.ink : T.hairline}`,
                      padding: '4px 0',
                      fontSize: '13px',
                      color: T.ink,
                      minHeight: '26px',
                    }}
                  >
                    {c3.text}
                    {c3.cursor && (
                      <span
                        style={{
                          display: 'inline-block',
                          width: '2px',
                          height: '13px',
                          backgroundColor: T.ink,
                          marginLeft: '1px',
                          verticalAlign: 'middle',
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* CAMPO 4 */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label
                    style={{
                      fontSize: '8px',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      color: T.stone,
                    }}
                  >
                    CARGO / FUNÇÃO
                  </label>
                  <div
                    style={{
                      borderBottom: `1px solid ${c4.active ? T.ink : T.hairline}`,
                      padding: '4px 0',
                      fontSize: '13px',
                      color: T.ink,
                      minHeight: '26px',
                    }}
                  >
                    {c4.text}
                    {c4.cursor && (
                      <span
                        style={{
                          display: 'inline-block',
                          width: '2px',
                          height: '13px',
                          backgroundColor: T.ink,
                          marginLeft: '1px',
                          verticalAlign: 'middle',
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* BOTÃO */}
              <div style={{ marginTop: '18px' }}>
                <button
                  type="button"
                  style={{
                    height: '38px',
                    borderRadius: '5px',
                    width: '100%',
                    backgroundColor: btnBg,
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: 500,
                    opacity: btnOpacity,
                    transform: `scale(${btnScale})`,
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  Iniciar Processo
                </button>
              </div>

              {/* OVERLAY WA */}
              {frame >= 525 && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: `rgba(240,240,240, ${overlayOpacity})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 50,
                  }}
                >
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      backgroundColor: '#25D366',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transform: `scale(${waScale})`,
                      boxShadow: '0 12px 30px rgba(37, 211, 102, 0.4)',
                    }}
                  >
                    <svg
                      width="44"
                      height="44"
                      viewBox="0 0 24 24"
                      fill="#FFFFFF"
                    >
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.188 8.188 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.182 8.182 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.17 1.73 2.64 4.2 3.7.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.17-.48-.29z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </IPhoneMockup>
      </div>
    </AbsoluteFill>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CENA 4 — WHATSAPP JOTA (s(18.0) → s(38.28) = 540 → 1148 / 608 frames)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
interface WAMsg {
  id: number;
  frame: number;
  from: 'jota' | 'joao';
  text: string;
  time: string;
}

const WA_MESSAGES: WAMsg[] = [
  {
    id: 1,
    frame: 545, // s(18.17)=545
    from: 'jota',
    text: 'Olá! Sou o Jota, assistente de operações do Consórcio Lote 15. Fui encarregado de conduzir seu processo de contratação.',
    time: '09:43',
  },
  {
    id: 2,
    frame: 602, // s(20.05)=602
    from: 'jota',
    text: 'Confirma que este número pertence a João Silva?',
    time: '09:43',
  },
  {
    id: 3,
    frame: 645, // s(21.5)=645
    from: 'joao',
    text: 'Sim, sou eu.',
    time: '09:44',
  },
  {
    id: 4,
    frame: 686, // s(22.86)=686
    from: 'jota',
    text: 'Perfeito, João! Bem-vindo ao processo.',
    time: '09:44',
  },
  {
    id: 5,
    frame: 738, // s(24.60)=738
    from: 'jota',
    text: 'Preciso de 2 documentos: RG e CPF. Pode enviar as fotos aqui?',
    time: '09:45',
  },
  {
    id: 6,
    frame: 765, // s(25.5)=765
    from: 'joao',
    text: 'Claro!',
    time: '09:45',
  },
  {
    id: 7,
    frame: 780, // s(26.0)=780
    from: 'joao',
    text: '📄 RG_frente.jpg',
    time: '09:46',
  },
  {
    id: 8,
    frame: 789, // s(26.3)=789
    from: 'joao',
    text: '📄 RG_verso.jpg',
    time: '09:46',
  },
  {
    id: 9,
    frame: 798, // s(26.6)=798
    from: 'joao',
    text: '📄 CPF.jpg',
    time: '09:46',
  },
  {
    id: 10,
    frame: 820, // s(27.34)=820
    from: 'jota',
    text: 'Recebi os 3 documentos. Validando...',
    time: '09:47',
  },
  {
    id: 11,
    frame: 855, // s(28.5)=855
    from: 'jota',
    text: 'Documentos validados. ✅',
    time: '09:47',
  },
  {
    id: 12,
    frame: 897, // s(29.91)=897
    from: 'jota',
    text: 'O candidato não precisa ir a lugar nenhum.',
    time: '09:48',
  },
  {
    id: 13,
    frame: 965, // s(32.18)=965
    from: 'jota',
    text: 'O gestor não precisa ligar para ninguém.',
    time: '09:48',
  },
  {
    id: 14,
    frame: 1039, // s(34.64)=1039
    from: 'jota',
    text: 'Quando tudo está validado...',
    time: '09:49',
  },
  {
    id: 15,
    frame: 1079, // s(35.98)=1079
    from: 'jota',
    text: 'Jota sinalizou o RH. ✓\nExame médico agendado pela MetricLab.',
    time: '09:49',
  },
];

const WhatsAppScene: React.FC<SceneProps> = ({ frame: propFrame }) => {
  const currentFrame = useCurrentFrame();
  const frame = propFrame !== undefined ? propFrame : currentFrame;
  const { fps } = useVideoConfig();

  // iPhone troca frame s(18.0)=540: Novo iPhone translateX 400→0 spring
  const phoneSpring = spring({
    frame: frame - 540,
    fps,
    config: { damping: 14, mass: 0.6 },
  });
  const enterX = interpolate(phoneSpring, [0, 1], [400, 0]);

  // Saída no final da cena (transição para Gestor em 1148)
  const exitX = interpolate(frame, [1135, 1148], [0, -400], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const finalX = enterX + exitX;

  // Typing indicators:
  // TYPING frame s(23.5)=705 → 738 (MSG 5)
  // TYPING frame s(27.0)=810 → 820 (MSG 10)
  // TYPING frame s(34.0)=1020 → 1039 (MSG 14)
  const isTyping =
    (frame >= 705 && frame < 738) ||
    (frame >= 810 && frame < 820) ||
    (frame >= 1020 && frame < 1039);

  // Auto-scroll suave calculado para manter as mensagens recentes visíveis
  const scrollY = interpolate(
    frame,
    [760, 785, 810, 840, 880, 950, 1020, 1079],
    [0, -70, -150, -240, -340, -430, -520, -620],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: T.canvas,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ transform: `translateX(${finalX}px)` }}>
        <IPhoneMockup scale={2.2}>
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: T.waBg,
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              fontFamily:
                'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            {/* STATUS BAR bg #F7F7F5 */}
            <div
              style={{
                height: '40px',
                paddingTop: '12px',
                paddingLeft: '18px',
                paddingRight: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#F7F7F5',
                zIndex: 30,
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: T.ink,
                }}
              >
                9:43
              </span>
              <span
                style={{
                  fontSize: '10px',
                  color: T.ink,
                  letterSpacing: '2px',
                }}
              >
                ●●●
              </span>
            </div>

            {/* WA HEADER 56px */}
            <div
              style={{
                height: '56px',
                backgroundColor: '#F7F7F5',
                borderBottom: `1px solid ${T.hairline}`,
                paddingLeft: '12px',
                paddingRight: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                zIndex: 30,
              }}
            >
              <span
                style={{
                  fontSize: '16px',
                  color: '#111111',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                ←
              </span>

              {/* Avatar 34px */}
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: '#E5E5E3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#6B6B6B',
                  }}
                >
                  J
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#111111',
                  }}
                >
                  Jota · MetricLab
                </span>
                <span
                  style={{
                    fontSize: '9px',
                    color: '#9B9B9B',
                  }}
                >
                  online
                </span>
              </div>
            </div>

            {/* MSGS bg #ECECEC */}
            <div
              style={{
                flex: 1,
                overflow: 'hidden',
                position: 'relative',
                padding: '10px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                  transform: `translateY(${scrollY}px)`,
                  transition: 'transform 0.15s ease-out',
                }}
              >
                {WA_MESSAGES.map((msg) => {
                  if (frame < msg.frame) return null;

                  const opacity = interpolate(
                    frame,
                    [msg.frame, msg.frame + 10],
                    [0, 1],
                    {
                      extrapolateLeft: 'clamp',
                      extrapolateRight: 'clamp',
                    }
                  );
                  const translateY = interpolate(
                    frame,
                    [msg.frame, msg.frame + 10],
                    [8, 0],
                    {
                      extrapolateLeft: 'clamp',
                      extrapolateRight: 'clamp',
                    }
                  );

                  const isJota = msg.from === 'jota';

                  return (
                    <div
                      key={msg.id}
                      style={{
                        alignSelf: isJota ? 'flex-start' : 'flex-end',
                        maxWidth: '83%',
                        backgroundColor: isJota ? '#FFFFFF' : '#DCF8C6',
                        borderRadius: isJota
                          ? '3px 14px 14px 3px'
                          : '14px 3px 3px 14px',
                        padding: '8px 11px',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
                        opacity,
                        transform: `translateY(${translateY}px)`,
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '11px',
                          lineHeight: 1.45,
                          color: '#111111',
                          whiteSpace: 'pre-line',
                        }}
                      >
                        {msg.text}
                      </span>
                      <div
                        style={{
                          fontSize: '8px',
                          color: '#9B9B9B',
                          textAlign: 'right',
                          marginTop: '2px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          gap: '2px',
                        }}
                      >
                        <span>{msg.time}</span>
                        {!isJota && (
                          <span style={{ color: '#53bdeb', fontSize: '9px' }}>
                            ✓✓
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* TYPING INDICATOR */}
                {isTyping && (
                  <div
                    style={{
                      alignSelf: 'flex-start',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '3px 14px 14px 3px',
                      padding: '8px 12px',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                    }}
                  >
                    {[0, 1, 2].map((idx) => {
                      const bounce = Math.sin((frame + idx * 4) * 0.4) * 3;
                      return (
                        <div
                          key={idx}
                          style={{
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            backgroundColor: '#9B9B9B',
                            transform: `translateY(${bounce}px)`,
                          }}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </IPhoneMockup>
      </div>
    </AbsoluteFill>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CENA 5 — GESTOR RECEBE (s(38.28) → s(47.92) = 1148 → 1438 / 290 frames)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const GestorScene: React.FC<SceneProps> = ({ frame: propFrame }) => {
  const currentFrame = useCurrentFrame();
  const frame = propFrame !== undefined ? propFrame : currentFrame;
  const { fps } = useVideoConfig();

  // iPhone troca frame s(38.28)=1148: Novo iPhone translateX 400→0 spring
  const phoneSpring = spring({
    frame: frame - 1148,
    fps,
    config: { damping: 14, mass: 0.6 },
  });
  const enterX = interpolate(phoneSpring, [0, 1], [400, 0]);

  // iPhone sai frame s(44.77)=1343: translateY 0→-1100 + opacity 1→0
  const exitY = interpolate(frame, [1343, 1373], [0, -1100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exitOpacity = interpolate(frame, [1343, 1373], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Notificação aparece frame s(38.28)=1148: translateY -12→0 + opacity 0→1 spring
  const notifSpring = spring({
    frame: frame - 1148,
    fps,
    config: { damping: 14, mass: 0.6 },
  });
  const notifY = interpolate(notifSpring, [0, 1], [-12, 0]);
  const notifOpacity = interpolate(frame, [1148, 1160], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Summary card frame s(39.96)=1199: translateY 8→0 + opacity 0→1 ease
  const cardY = interpolate(frame, [1199, 1220], [8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cardOpacity = interpolate(frame, [1199, 1220], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Linha "Documentos validados" frame s(42.32)=1270
  const docOpacity = interpolate(frame, [1270, 1285], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Linha "Exame agendado" frame s(42.32)=1270
  const exameOpacity = interpolate(frame, [1270, 1285], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Linha "Próximo: Aguardando RH" frame 1270
  const proxOpacity = interpolate(frame, [1270, 1285], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: T.canvas,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          transform: `translateX(${enterX}px) translateY(${exitY}px)`,
          opacity: exitOpacity,
        }}
      >
        <IPhoneMockup scale={2.2}>
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#F7F7F5',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              fontFamily:
                'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            {/* STATUS BAR bg #F7F7F5: "9:50" */}
            <div
              style={{
                height: '40px',
                paddingTop: '12px',
                paddingLeft: '18px',
                paddingRight: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#F7F7F5',
                zIndex: 10,
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#111111',
                }}
              >
                9:50
              </span>
              <span
                style={{
                  fontSize: '10px',
                  color: '#111111',
                  letterSpacing: '2px',
                }}
              >
                ●●●
              </span>
            </div>

            {/* WA HEADER */}
            <div
              style={{
                height: '56px',
                backgroundColor: '#F7F7F5',
                borderBottom: `1px solid ${T.hairline}`,
                paddingLeft: '16px',
                paddingRight: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: '#FFF3D0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#B8860B',
                  }}
                >
                  G
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#111111',
                  }}
                >
                  Eng. Roberto Lima
                </span>
                <span
                  style={{
                    fontSize: '9px',
                    color: '#9B9B9B',
                  }}
                >
                  Gestor · Consórcio Lote 15
                </span>
              </div>
            </div>

            {/* CONTEÚDO */}
            <div
              style={{
                flex: 1,
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {/* NOTIFICAÇÃO (frame s(38.28)=1148) */}
              {frame >= 1148 && (
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '10px',
                    borderLeft: '3px solid #F5A623',
                    padding: '12px 14px',
                    margin: '10px 4px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                    transform: `translateY(${notifY}px)`,
                    opacity: notifOpacity,
                  }}
                >
                  <div
                    style={{
                      fontSize: '9px',
                      fontWeight: 600,
                      color: '#F5A623',
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px',
                      marginBottom: '4px',
                    }}
                  >
                    JOTA · METRICLAB
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#111111',
                      lineHeight: 1.4,
                    }}
                  >
                    João Silva concluiu o envio de documentos. RH sinalizado para
                    validação.
                  </div>
                </div>
              )}

              {/* SUMMARY CARD (frame s(39.96)=1199) */}
              {frame >= 1199 && (
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E5E3',
                    borderRadius: '8px',
                    margin: '10px 4px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                    transform: `translateY(${cardY}px)`,
                    opacity: cardOpacity,
                  }}
                >
                  {/* Linha 1 */}
                  <div
                    style={{
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid #E5E5E3',
                    }}
                  >
                    <span style={{ fontSize: '9px', color: '#9B9B9B' }}>
                      CANDIDATO
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        color: '#111111',
                        fontWeight: 500,
                      }}
                    >
                      João Silva
                    </span>
                  </div>

                  {/* Linha 2 */}
                  <div
                    style={{
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid #E5E5E3',
                    }}
                  >
                    <span style={{ fontSize: '9px', color: '#9B9B9B' }}>CARGO</span>
                    <span
                      style={{
                        fontSize: '11px',
                        color: '#111111',
                        fontWeight: 500,
                      }}
                    >
                      Analista de Planejamento
                    </span>
                  </div>

                  {/* Linha 3 */}
                  <div
                    style={{
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid #E5E5E3',
                    }}
                  >
                    <span style={{ fontSize: '9px', color: '#9B9B9B' }}>
                      EMPRESA
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        color: '#111111',
                        fontWeight: 500,
                      }}
                    >
                      Consórcio Lote 15
                    </span>
                  </div>

                  {/* Linha 4 (frame s(42.32)=1270) */}
                  <div
                    style={{
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid #E5E5E3',
                      opacity: docOpacity,
                    }}
                  >
                    <span style={{ fontSize: '9px', color: '#9B9B9B' }}>
                      DOCUMENTOS
                    </span>
                    <span
                      style={{
                        backgroundColor: '#dcf8c6',
                        color: '#1a7a1a',
                        fontSize: '9px',
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: '99px',
                      }}
                    >
                      Validados
                    </span>
                  </div>

                  {/* Linha 5 (frame s(42.32)=1270) */}
                  <div
                    style={{
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid #E5E5E3',
                      opacity: exameOpacity,
                    }}
                  >
                    <span style={{ fontSize: '9px', color: '#9B9B9B' }}>
                      EXAME MÉDICO
                    </span>
                    <span
                      style={{
                        backgroundColor: '#dbeafe',
                        color: '#1e40af',
                        fontSize: '9px',
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: '99px',
                      }}
                    >
                      Agendado
                    </span>
                  </div>

                  {/* Linha 6 */}
                  <div
                    style={{
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      opacity: proxOpacity,
                    }}
                  >
                    <span style={{ fontSize: '9px', color: '#9B9B9B' }}>
                      PRÓXIMO
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        color: '#2563eb',
                        fontWeight: 600,
                      }}
                    >
                      Aguardando RH
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </IPhoneMockup>
      </div>
    </AbsoluteFill>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CENA 6 — ENCERRAMENTO (s(47.92) → 1778 = 1438 → 1778 / 340 frames)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const EndScene: React.FC<SceneProps> = ({ frame: propFrame }) => {
  const currentFrame = useCurrentFrame();
  const frame = propFrame !== undefined ? propFrame : currentFrame;

  // frame s(47.92)=1438: "M." Inter 64px weight 900, "M" #111111 "." #F5A623, letter-spacing -2px, opacity 0→1 + translateY 8→0
  const mOpacity = interpolate(frame, [1438, 1455], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const mY = interpolate(frame, [1438, 1455], [8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // frame s(47.92)=1440: "Fluxo de Contratação" Inter 28px weight 700 #111111, opacity 0→1
  const subOpacity = interpolate(frame, [1440, 1458], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // frame s(49.0)=1470: Hairline 60px × 1px bg #E5E5E3 center, opacity 0→1
  const hairOpacity = interpolate(frame, [1470, 1485], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // frame s(49.75)=1493: "Processo completo." Inter 16px weight 500 #111111, opacity 0→1
  const f1Opacity = interpolate(frame, [1493, 1508], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // frame s(51.01)=1530: "Rastreável." Inter 16px weight 500 #111111, opacity 0→1
  const f2Opacity = interpolate(frame, [1530, 1545], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // frame s(52.11)=1563: "Sem depender de ninguém específico." Inter 14px weight 400 #6B6B6B, opacity 0→1
  const f3Opacity = interpolate(frame, [1563, 1578], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // frame s(53.35)=1601: "Para empresas que crescem..." opacity 0→1
  const f4aOpacity = interpolate(frame, [1601, 1616], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // frame s(54.26)=1628: "...e precisam que a operação acompanhe." opacity 0→1
  const f4bOpacity = interpolate(frame, [1628, 1643], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // frame s(56.46)=1694: "MetricLab." Inter 22px weight 700 #F5A623, opacity 0→1
  const f5Opacity = interpolate(frame, [1694, 1714], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: T.canvas,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* LOGO */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 900,
            color: '#111111',
            letterSpacing: '-2px',
            lineHeight: 1,
            opacity: mOpacity,
            transform: `translateY(${mY}px)`,
          }}
        >
          M<span style={{ color: '#F5A623' }}>.</span>
        </div>

        {/* "Fluxo de Contratação" */}
        <div
          style={{
            marginTop: '6px',
            fontSize: '28px',
            fontWeight: 700,
            color: '#111111',
            letterSpacing: '-0.5px',
            opacity: subOpacity,
          }}
        >
          Fluxo de Contratação
        </div>

        {/* Hairline */}
        <div
          style={{
            marginTop: '24px',
            marginBottom: '20px',
            width: '60px',
            height: '1px',
            backgroundColor: '#E5E5E3',
            opacity: hairOpacity,
          }}
        />

        {/* Mensagens Finais Sequenciais */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              fontSize: '16px',
              fontWeight: 500,
              color: '#111111',
              opacity: f1Opacity,
            }}
          >
            Processo completo.
          </div>

          <div
            style={{
              fontSize: '16px',
              fontWeight: 500,
              color: '#111111',
              opacity: f2Opacity,
            }}
          >
            Rastreável.
          </div>

          <div
            style={{
              fontSize: '14px',
              fontWeight: 400,
              color: '#6B6B6B',
              opacity: f3Opacity,
            }}
          >
            Sem depender de ninguém específico.
          </div>

          <div
            style={{
              fontSize: '14px',
              fontWeight: 400,
              color: '#6B6B6B',
              textAlign: 'center',
              lineHeight: 1.5,
              maxWidth: '320px',
              marginTop: '4px',
            }}
          >
            <span style={{ opacity: f4aOpacity, display: 'block' }}>
              Para empresas que crescem
            </span>
            <span style={{ opacity: f4bOpacity, display: 'block' }}>
              e precisam que a operação acompanhe.
            </span>
          </div>

          <div
            style={{
              marginTop: '16px',
              fontSize: '22px',
              fontWeight: 700,
              color: '#F5A623',
              opacity: f5Opacity,
            }}
          >
            MetricLab.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPOSIÇÃO PRINCIPAL: VideoAdmissao (1778 frames / 59.26s)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const VideoAdmissao: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: T.canvas }}>
      {/* Áudio Oficial de Admissão */}
      <Audio
        src={staticFile('audio/admissao.mp3')}
        startFrom={0}
        volume={1}
      />

      {/* CENA 1 — SPLASH: 0 → s(2.42) = 0 → 73 */}
      <Sequence from={0} durationInFrames={s(SYNC.vaga)}>
        <SplashScene frame={frame} />
      </Sequence>

      {/* CENA 2 — HOME DO APP: s(2.42) → s(9.47) = 73 → 284 (211 frames) */}
      <Sequence
        from={s(SYNC.vaga)}
        durationInFrames={s(SYNC.ml_assume) - s(SYNC.vaga)}
      >
        <HomeScene frame={frame} />
      </Sequence>

      {/* CENA 3 — FORMULÁRIO: s(9.47) → s(18.0) = 284 → 540 (256 frames) */}
      <Sequence
        from={s(SYNC.ml_assume)}
        durationInFrames={540 - s(SYNC.ml_assume)}
      >
        <FormScene frame={frame} />
      </Sequence>

      {/* CENA 4 — WHATSAPP JOTA: s(18.0) → s(38.28) = 540 → 1148 (608 frames) */}
      <Sequence
        from={540}
        durationInFrames={s(SYNC.gestor_resumo) - 540}
      >
        <WhatsAppScene frame={frame} />
      </Sequence>

      {/* CENA 5 — GESTOR RECEBE: s(38.28) → s(47.92) = 1148 → 1438 (290 frames) */}
      <Sequence
        from={s(SYNC.gestor_resumo)}
        durationInFrames={s(SYNC.trabalho_ml) - s(SYNC.gestor_resumo)}
      >
        <GestorScene frame={frame} />
      </Sequence>

      {/* CENA 6 — ENCERRAMENTO: s(47.92) → 1778 = 1438 → 1778 (340 frames) */}
      <Sequence
        from={s(SYNC.trabalho_ml)}
        durationInFrames={1778 - s(SYNC.trabalho_ml)}
      >
        <EndScene frame={frame} />
      </Sequence>
    </AbsoluteFill>
  );
};
