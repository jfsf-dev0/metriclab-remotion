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

const s = (sec: number) => Math.round(sec * 30);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CENA 1 — SPLASH (0 → s(2.4) = 0 → 72)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const SplashScene: React.FC = () => {
  const frame = useCurrentFrame();
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

  // Transição de saída suave nos últimos frames
  const exitOpacity = interpolate(frame, [65, 72], [1, 0], {
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
// CENA 2 — HOME DO APP (s(2.4) → s(9) = 72 → 270 / 198 frames)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const HomeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // frame 0→30: iPhone entra por baixo, spring translateY 1100→0
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6 },
  });
  const translateY = interpolate(enterSpring, [0, 1], [1100, 0]);

  // Transição de saída nos últimos frames da cena (frames 185→198)
  const exitX = interpolate(frame, [185, 198], [0, -400], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // FAB frame 35→55: spring scale 0→1
  const fabSpring = spring({
    frame: frame - 35,
    fps,
    config: { damping: 14, mass: 0.6 },
  });
  const fabScale = interpolate(fabSpring, [0, 1], [0, 1]);

  // HAMBURGER ABRE frame 90 (relativo): 15 frames (90→105)
  // DRAWER frame 90→120: translateX -220→0
  // DRAWER FECHA frame 145→165: translateX 0→-220
  // HAMBURGER VOLTA frame 145→160
  let hamburgerProgress = 0;
  if (frame >= 90 && frame < 145) {
    hamburgerProgress = interpolate(frame, [90, 105], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (frame >= 145) {
    hamburgerProgress = interpolate(frame, [145, 160], [1, 0], {
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
    frame: frame - 90,
    fps,
    config: { damping: 16, mass: 0.5 },
  });

  let drawerX = -220;
  if (frame >= 90 && frame < 145) {
    drawerX = interpolate(drawerSpring, [0, 1], [-220, 0]);
  } else if (frame >= 145) {
    drawerX = interpolate(frame, [145, 165], [0, -220], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  }

  // CLIQUE "NOVO COLABORADOR" frame 175: btn scale 1.0→0.95 (5f) → 1.0 (5f)
  const btnScale = interpolate(frame, [175, 180, 185], [1.0, 0.95, 1.0], {
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
// CENA 3 — FORMULÁRIO (s(9) → s(18) = 270 → 540 / 270 frames)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const FormScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Transição frame 0→25 (relativo): Novo iPhone translateX 400→0 spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6 },
  });
  const enterX = interpolate(enterSpring, [0, 1], [400, 0]);

  // Saída nos últimos frames
  const exitX = interpolate(frame, [255, 270], [0, -400], {
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
      return { text, active: false, cursor: false };
    }
    const progress = (frame - start) / duration;
    const chars = Math.floor(progress * text.length);
    const cursor = Math.floor(frame / 4) % 2 === 0;
    return { text: text.slice(0, chars), active: true, cursor };
  };

  // CAMPO 1: frame 103 (700ms = 21f)
  const c1 = getTyped('João Silva', 103, 21);

  // CAMPO 2: frame 120 (650ms = 20f)
  const c2 = getTyped('+55 (11) 98765-4321', 120, 20);

  // CAMPO 3: frame 140 (550ms = 16f)
  const c3 = getTyped('+55 (11) 91234-5678', 140, 16);

  // CAMPO 4: frame 155 (550ms = 16f)
  const c4 = getTyped('Analista de Planejamento', 155, 16);

  // BOTÃO "Iniciar Processo"
  // frame 0→160: opacity 0.35
  // frame 160→175: opacity 0.35→1.0
  // frame 230: scale 1→0.97 (5f) → 1.0 (5f), bg #111→#333→#111
  const btnOpacity = interpolate(frame, [160, 175], [0.35, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const btnScale = interpolate(frame, [230, 235, 240], [1.0, 0.97, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const btnBg =
    frame >= 230 && frame <= 240
      ? interpolate(frame, [230, 235, 240], [0, 1, 0]) > 0.5
        ? '#333333'
        : '#111111'
      : '#111111';

  // OVERLAY WA frame 240→260: AbsoluteFill rgba(240,240,240,0→0.95)
  const overlayOpacity = interpolate(frame, [240, 260], [0, 0.95], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Círculo #25D366 80px: spring scale 0.15→1.0 frame 245→265
  const waSpring = spring({
    frame: frame - 245,
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
              {frame >= 240 && (
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
// CENA 4 — WHATSAPP JOTA (s(18) → s(38) = 540 → 1140 / 600 frames)
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
    frame: 5,
    from: 'jota',
    text: 'Olá! Sou o Jota, assistente de operações do Consórcio Lote 15. Fui encarregado de conduzir seu processo de contratação.',
    time: '09:43',
  },
  {
    id: 2,
    frame: 62,
    from: 'jota',
    text: 'Confirma que este número pertence a João Silva?',
    time: '09:43',
  },
  {
    id: 3,
    frame: 100,
    from: 'joao',
    text: 'Sim, sou eu.',
    time: '09:44',
  },
  {
    id: 4,
    frame: 146,
    from: 'jota',
    text: 'Perfeito, João! Bem-vindo ao processo.',
    time: '09:44',
  },
  {
    id: 5,
    frame: 198,
    from: 'jota',
    text: 'Preciso de 2 documentos: RG e CPF. Pode enviar as fotos aqui?',
    time: '09:45',
  },
  {
    id: 6,
    frame: 230,
    from: 'joao',
    text: 'Claro!',
    time: '09:45',
  },
  {
    id: 7,
    frame: 255,
    from: 'joao',
    text: '📄 RG_frente.jpg',
    time: '09:46',
  },
  {
    id: 8,
    frame: 272,
    from: 'joao',
    text: '📄 RG_verso.jpg',
    time: '09:46',
  },
  {
    id: 9,
    frame: 289,
    from: 'joao',
    text: '📄 CPF.jpg',
    time: '09:46',
  },
  {
    id: 10,
    frame: 357,
    from: 'jota',
    text: 'Recebi os 3 documentos. Validando...',
    time: '09:47',
  },
  {
    id: 11,
    frame: 390,
    from: 'jota',
    text: 'Documentos validados. ✅',
    time: '09:47',
  },
  {
    id: 12,
    frame: 425,
    from: 'jota',
    text: 'O candidato não precisa ir a lugar nenhum.',
    time: '09:48',
  },
  {
    id: 13,
    frame: 460,
    from: 'jota',
    text: 'O gestor não precisa ligar para ninguém.',
    time: '09:48',
  },
  {
    id: 14,
    frame: 499,
    from: 'jota',
    text: 'Quando tudo está validado...',
    time: '09:49',
  },
  {
    id: 15,
    frame: 570,
    from: 'jota',
    text: 'Jota sinalizou o RH. ✓\nExame médico agendado pela MetricLab.',
    time: '09:49',
  },
];

const WhatsAppScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Transição frame 0→25: Novo iPhone translateX 400→0 spring
  const phoneSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6 },
  });
  const enterX = interpolate(phoneSpring, [0, 1], [400, 0]);

  // Saída no final da cena
  const exitX = interpolate(frame, [590, 600], [0, -400], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const finalX = enterX + exitX;

  // Typing indicators:
  // 1. frame 160→198
  // 2. frame 300→357
  // 3. frame 539→570
  const isTyping =
    (frame >= 160 && frame < 198) ||
    (frame >= 300 && frame < 357) ||
    (frame >= 539 && frame < 570);

  // Auto-scroll suave calculado para manter as mensagens recentes visíveis
  const scrollY = interpolate(
    frame,
    [220, 260, 290, 360, 420, 460, 500, 570],
    [0, -70, -160, -250, -360, -440, -530, -640],
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
// CENA 5 — GESTOR RECEBE (s(38) → s(47.92) = 1140 → 1438 / 298 frames)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const GestorScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Transição frame 0→25: Novo iPhone translateX 400→0 spring
  const phoneSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6 },
  });
  const enterX = interpolate(phoneSpring, [0, 1], [400, 0]);

  // Saída nos últimos frames
  const exitY = interpolate(frame, [278, 298], [0, -900], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exitOpacity = interpolate(frame, [278, 298], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // frame 8→30: NOTIFICAÇÃO aparece, translateY -12→0 + opacity 0→1 spring
  const notifSpring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 14, mass: 0.6 },
  });
  const notifY = interpolate(notifSpring, [0, 1], [-12, 0]);
  const notifOpacity = interpolate(frame, [8, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // frame 59→85: SUMMARY CARD aparece, translateY 8→0 + opacity 0→1 ease
  const cardY = interpolate(frame, [59, 85], [8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cardOpacity = interpolate(frame, [59, 85], [0, 1], {
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
              {/* NOTIFICAÇÃO (frame 8→30) */}
              {frame >= 8 && (
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

              {/* SUMMARY CARD (frame 59→85) */}
              {frame >= 59 && (
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

                  {/* Linha 4 */}
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

                  {/* Linha 5 */}
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
// CENA 6 — ENCERRAMENTO (s(47.92) → 1778 / 340 frames)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const EndScene: React.FC = () => {
  const frame = useCurrentFrame();

  // frame 0→20: "M." Inter 64px weight 900, "M" #111111 "." #F5A623, letter-spacing -2px, opacity 0→1 + translateY 8→0
  const mOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const mY = interpolate(frame, [0, 20], [8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // frame 8→25: "Fluxo de Contratação" Inter 28px weight 700 #111111, opacity 0→1
  const subOpacity = interpolate(frame, [8, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // frame 30: Hairline 60px × 1px bg #E5E5E3 center, opacity 0→1
  const hairOpacity = interpolate(frame, [25, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // frame 55→70: "Processo completo." Inter 16px weight 500 #111111, opacity 0→1
  const f1Opacity = interpolate(frame, [55, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // frame 93→108: "Rastreável." Inter 16px weight 500 #111111, opacity 0→1
  const f2Opacity = interpolate(frame, [93, 108], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // frame 126→141: "Sem depender de ninguém específico." Inter 14px weight 400 #6B6B6B, opacity 0→1
  const f3Opacity = interpolate(frame, [126, 141], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // frame 163→200: "Para empresas que crescem e precisam que a operação acompanhe." Inter 14px weight 400 #6B6B6B, text-align center, opacity 0→1
  const f4Opacity = interpolate(frame, [163, 195], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // frame 256→290: "MetricLab." Inter 22px weight 700 #F5A623, opacity 0→1
  const f5Opacity = interpolate(frame, [256, 285], [0, 1], {
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
              opacity: f4Opacity,
              maxWidth: '320px',
              marginTop: '4px',
            }}
          >
            Para empresas que crescem
            <br />e precisam que a operação acompanhe.
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
  return (
    <AbsoluteFill style={{ backgroundColor: T.canvas }}>
      {/* Áudio Oficial de Admissão */}
      <Audio
        src={staticFile('audio/admissao.mp3')}
        startFrom={0}
        volume={1}
      />

      {/* CENA 1 — SPLASH: 0 → s(2.4) = 0 → 72 */}
      <Sequence from={0} durationInFrames={s(2.4)}>
        <SplashScene />
      </Sequence>

      {/* CENA 2 — HOME DO APP: s(2.4) → s(9) = 72 → 270 (198 frames) */}
      <Sequence from={s(2.4)} durationInFrames={s(6.6)}>
        <HomeScene />
      </Sequence>

      {/* CENA 3 — FORMULÁRIO: s(9) → s(18) = 270 → 540 (270 frames) */}
      <Sequence from={s(9)} durationInFrames={s(9)}>
        <FormScene />
      </Sequence>

      {/* CENA 4 — WHATSAPP JOTA: s(18) → s(38) = 540 → 1140 (600 frames) */}
      <Sequence from={s(18)} durationInFrames={s(20)}>
        <WhatsAppScene />
      </Sequence>

      {/* CENA 5 — GESTOR RECEBE: s(38) → s(47.92) = 1140 → 1438 (298 frames) */}
      <Sequence from={s(38)} durationInFrames={s(9.92)}>
        <GestorScene />
      </Sequence>

      {/* CENA 6 — ENCERRAMENTO: s(47.92) → 1778 (340 frames) */}
      <Sequence from={s(47.92)} durationInFrames={s(11.34)}>
        <EndScene />
      </Sequence>
    </AbsoluteFill>
  );
};
