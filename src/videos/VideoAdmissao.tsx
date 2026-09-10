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
// DESIGN SYSTEM — TOKENS
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

const s = (sec: number) => sec * 30;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CENA 1 — SPLASH (frames 0 → 120 / 0s → 4s)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const SplashScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ELEMENTO 1 — Ícone: frame 0→15
  const iconSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6 },
  });
  const iconScale = interpolate(iconSpring, [0, 1], [0.6, 1.0]);
  const iconOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ELEMENTO 2 — Badge: frame 15→30
  const badgeOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ELEMENTO 3 — Marca: frame 20→50
  const marcaOpacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const marcaTranslateY = interpolate(frame, [20, 50], [16, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ELEMENTO 4 — Subtítulo: frame 35→65
  const subOpacity = interpolate(frame, [35, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ELEMENTO 5 — Descrição: frame 50→80
  const descOpacity = interpolate(frame, [50, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Fade out geral para transição para Cena 2: frame 110→120
  const exitOpacity = interpolate(frame, [110, 120], [1, 0], {
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
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '640px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* ELEMENTO 1 — Ícone */}
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

        {/* ELEMENTO 2 — Badge */}
        <div
          style={{
            marginTop: '20px',
            opacity: badgeOpacity,
            border: `1px solid ${T.hairline}`,
            backgroundColor: '#FFFFFF',
            padding: '8px 20px',
            borderRadius: '99px',
            fontSize: '14px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            color: T.ink,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          CONSÓRCIO LOTE 15
        </div>

        {/* ELEMENTO 3 — Marca */}
        <div
          style={{
            marginTop: '16px',
            opacity: marcaOpacity,
            transform: `translateY(${marcaTranslateY}px)`,
            fontSize: '72px',
            fontWeight: 900,
            letterSpacing: '-2.5px',
            lineHeight: 1.0,
            color: T.ink,
          }}
        >
          MetricLab
        </div>

        {/* ELEMENTO 4 — Subtítulo */}
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

        {/* ELEMENTO 5 — Descrição */}
        <div
          style={{
            marginTop: '8px',
            opacity: descOpacity,
            fontSize: '18px',
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
// CENA 2 — HOME DO APP (frames 120 → 270 / 4s → 9s)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const HomeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Transição de Entrada: local frame 0→30 (global 120→150)
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6 },
  });
  const translateY = interpolate(enterSpring, [0, 1], [1200, 0]);

  // Transição de Saída: local frame 145→150 (global 265→270)
  const exitX = interpolate(frame, [145, 150], [0, -400], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // FAB Animação: local frame 30→55 (global 150→175)
  const fabSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 14, mass: 0.6 },
  });
  const fabScaleBase = interpolate(fabSpring, [0, 1], [0, 1]);
  const fabOpacity = interpolate(frame, [30, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // FAB Click: local frame 140→148 (global 260)
  const fabClickScale = interpolate(frame, [140, 144, 148], [1, 0.85, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fabFinalScale = fabScaleBase * fabClickScale;

  // Hamburger Animação (local frame 60→75 abre, 100→120 fecha)
  const isOpening = frame >= 60 && frame < 100;
  const isClosing = frame >= 100 && frame <= 120;
  let openProgress = 0;
  if (frame < 60) {
    openProgress = 0;
  } else if (isOpening) {
    openProgress = interpolate(frame, [60, 75], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (isClosing) {
    openProgress = interpolate(frame, [100, 120], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else {
    openProgress = 0;
  }

  const line1Rotate = openProgress * 45;
  const line1Y = openProgress * 6;
  const line2Opacity = 1 - openProgress;
  const line3Rotate = openProgress * -45;
  const line3Y = openProgress * -6;

  // Drawer Animação
  const drawerSpring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 16, mass: 0.5 },
  });
  let drawerX = -280;
  if (frame >= 60 && frame < 100) {
    drawerX = interpolate(drawerSpring, [0, 1], [-280, 0]);
  } else if (frame >= 100) {
    const closeP = interpolate(frame, [100, 120], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    drawerX = interpolate(closeP, [0, 1], [0, -280]);
  }

  // Clique em "Novo Colaborador": local frame 130→140 (global 250)
  const btnScale = interpolate(frame, [130, 135, 140], [1, 0.95, 1], {
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
            {/* STATUS BAR (40px) */}
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
                  fontSize: '12px',
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

            {/* NAVBAR (46px) */}
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
              {/* Hamburger Button */}
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative',
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
                    transition: 'transform 0.1s',
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

              {/* Title */}
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: T.ink,
                }}
              >
                Colaboradores
              </div>

              <div style={{ width: '24px' }} />
            </div>

            {/* CONTEÚDO */}
            <div
              style={{
                flex: 1,
                backgroundColor: T.canvas,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              {/* Header Interno */}
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

              {/* Empty State */}
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
                    fontSize: '14px',
                    fontWeight: 600,
                    color: T.graphite,
                    marginTop: '12px',
                  }}
                >
                  Nenhum colaborador
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    color: T.stone,
                    marginTop: '4px',
                    lineHeight: 1.4,
                  }}
                >
                  Clique para iniciar o processo de admissão
                </div>
              </div>

              {/* FAB */}
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
                  transform: `scale(${fabFinalScale})`,
                  opacity: fabOpacity,
                  zIndex: 30,
                  cursor: 'pointer',
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

              {/* DRAWER LATERAL */}
              {drawerX > -280 && (
                <>
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      opacity: interpolate(drawerX, [-280, 0], [0, 0.4]),
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
                      boxShadow: '6px 0 24px rgba(0,0,0,0.12)',
                      transform: `translateX(${drawerX}px)`,
                      zIndex: 40,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Topo do Drawer */}
                    <div
                      style={{
                        padding: '16px',
                        paddingTop: '48px',
                        borderBottom: `1px solid ${T.hairline}`,
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
                          marginTop: '6px',
                        }}
                      >
                        Eng. Roberto Lima
                      </div>
                    </div>

                    {/* Itens do Menu */}
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
// CENA 3 — FORMULÁRIO (frames 270 → 510 / 9s → 17s)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const FormScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Transição de Entrada: local frame 0→30 (global 270→300)
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6 },
  });
  const enterX = interpolate(enterSpring, [0, 1], [400, 0]);

  // Transição de Saída: local frame 230→240 (global 500→510)
  const exitX = interpolate(frame, [230, 240], [0, -400], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const finalX = enterX + exitX;

  // Helper de Digitação com Cursor
  const getTypedInfo = (text: string, start: number, end: number) => {
    if (frame < start) {
      return { text: '', active: false, cursor: false };
    }
    if (frame >= end) {
      return { text, active: false, cursor: false };
    }
    const progress = (frame - start) / (end - start);
    const chars = Math.floor(progress * text.length);
    const cursor = Math.floor(frame / 6) % 2 === 0;
    return { text: text.slice(0, chars), active: true, cursor };
  };

  // 4 Campos (local frames):
  // Campo 1: João Silva (frames 40→70)
  const c1 = getTypedInfo('João Silva', 40, 70);

  // Campo 2: +55 (11) 98765-4321 (frames 75→105)
  const c2 = getTypedInfo('+55 (11) 98765-4321', 75, 105);

  // Campo 3: +55 (11) 91234-5678 (frames 110→135)
  const c3 = getTypedInfo('+55 (11) 91234-5678', 110, 135);

  // Campo 4: Analista de Planejamento (frames 140→170)
  const c4 = getTypedInfo('Analista de Planejamento', 140, 170);

  // Botão "Iniciar Processo" (ativa de local 170→190, press em 200)
  const btnOpacity = interpolate(frame, [170, 190], [0.35, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const btnScale = interpolate(frame, [200, 205, 210], [1, 0.97, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Overlay WhatsApp (frames 205→220)
  const overlayOpacity = interpolate(frame, [205, 220], [0, 0.95], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Ícone WhatsApp (frames 210→230)
  const waSpring = spring({
    frame: frame - 210,
    fps,
    config: { damping: 14, mass: 0.6 },
  });
  const waScale = interpolate(waSpring, [0, 1], [0.2, 1.0]);
  const waOpacity = interpolate(frame, [210, 225], [0, 1], {
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
            {/* STATUS BAR */}
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
                  fontSize: '12px',
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

            {/* NAVBAR */}
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

            {/* CONTEÚDO */}
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
                  marginBottom: '6px',
                }}
              >
                TRIAGEM E ADMISSÃO
              </div>

              <div
                style={{
                  fontSize: '17px',
                  fontWeight: 400,
                  lineHeight: 1.15,
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
                  gap: '14px',
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
                      padding: '6px 0',
                      fontSize: '13px',
                      color: T.ink,
                      minHeight: '28px',
                    }}
                  >
                    {c1.text}
                    {c1.cursor && (
                      <span style={{ color: T.accent, fontWeight: 700 }}>|</span>
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
                      padding: '6px 0',
                      fontSize: '13px',
                      color: T.ink,
                      minHeight: '28px',
                    }}
                  >
                    {c2.text}
                    {c2.cursor && (
                      <span style={{ color: T.accent, fontWeight: 700 }}>|</span>
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
                      padding: '6px 0',
                      fontSize: '13px',
                      color: T.ink,
                      minHeight: '28px',
                    }}
                  >
                    {c3.text}
                    {c3.cursor && (
                      <span style={{ color: T.accent, fontWeight: 700 }}>|</span>
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
                      padding: '6px 0',
                      fontSize: '13px',
                      color: T.ink,
                      minHeight: '28px',
                    }}
                  >
                    {c4.text}
                    {c4.cursor && (
                      <span style={{ color: T.accent, fontWeight: 700 }}>|</span>
                    )}
                  </div>
                </div>
              </div>

              {/* BOTÃO */}
              <div style={{ marginTop: '20px' }}>
                <button
                  type="button"
                  style={{
                    height: '38px',
                    borderRadius: '5px',
                    width: '100%',
                    backgroundColor: T.ink,
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

              {/* OVERLAY WHATSAPP */}
              {frame >= 205 && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: '#FFFFFF',
                    opacity: overlayOpacity,
                    display: 'flex',
                    flexDirection: 'column',
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
                      opacity: waOpacity,
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
// CENA 4 — WHATSAPP CANDIDATO (frames 510 → 1140 / 17s → 38s)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
interface MessageItem {
  id: number;
  frame: number;
  from: 'jota' | 'joao';
  text: string;
  time: string;
}

const MESSAGES: MessageItem[] = [
  {
    id: 1,
    frame: 35, // global 545
    from: 'jota',
    text: 'Olá! Sou o Jota, assistente de operações do Consórcio Lote 15. Fui encarregado de conduzir seu processo de contratação.',
    time: '09:43',
  },
  {
    id: 2,
    frame: 80, // global 590
    from: 'jota',
    text: 'Confirma que este número pertence a João Silva?',
    time: '09:43',
  },
  {
    id: 3,
    frame: 130, // global 640
    from: 'joao',
    text: 'Sim, sou eu.',
    time: '09:44',
  },
  {
    id: 4,
    frame: 175, // global 685
    from: 'jota',
    text: 'Perfeito, João! Bem-vindo ao processo. Vou te guiar em cada etapa.',
    time: '09:44',
  },
  {
    id: 5,
    frame: 220, // global 730
    from: 'jota',
    text: 'Preciso de 2 documentos: RG e CPF. Pode enviar as fotos aqui?',
    time: '09:45',
  },
  {
    id: 6,
    frame: 265, // global 775
    from: 'joao',
    text: 'Claro!',
    time: '09:45',
  },
  {
    id: 7,
    frame: 290, // global 800
    from: 'joao',
    text: '📄 RG_frente.jpg',
    time: '09:46',
  },
  {
    id: 8,
    frame: 310, // global 820
    from: 'joao',
    text: '📄 RG_verso.jpg',
    time: '09:46',
  },
  {
    id: 9,
    frame: 330, // global 840
    from: 'joao',
    text: '📄 CPF.jpg',
    time: '09:47',
  },
  {
    id: 10,
    frame: 400, // global 910
    from: 'jota',
    text: 'Recebi os 3 documentos. Vou validar. ✓',
    time: '09:47',
  },
  {
    id: 11,
    frame: 440, // global 950
    from: 'jota',
    text: 'Documentos validados com sucesso! ✅',
    time: '09:48',
  },
  {
    id: 12,
    frame: 480, // global 990
    from: 'jota',
    text: 'Vou sinalizar o RH para validação. Em breve você recebe o retorno.',
    time: '09:48',
  },
  {
    id: 13,
    frame: 520, // global 1030
    from: 'joao',
    text: 'Muito obrigado, Jota!',
    time: '09:49',
  },
  {
    id: 14,
    frame: 550, // global 1060
    from: 'jota',
    text: 'Estou à disposição. Até breve! 👋',
    time: '09:49',
  },
];

const WhatsAppScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Transição de Entrada: local frame 0→35 (global 510→545)
  const phoneSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6 },
  });
  const enterX = interpolate(phoneSpring, [0, 1], [400, 0]);

  // Transição de Saída: local frame 625→630 (global 1135→1140)
  const exitX = interpolate(frame, [625, 630], [0, -400], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const finalX = enterX + exitX;

  // Typing indicator dots bounce: frame 360→400 (global 870→910)
  const showTyping = frame >= 360 && frame < 400;

  // Auto-scroll dinâmico calculado com base na altura acumulada das mensagens
  const scrollY = interpolate(
    frame,
    [260, 300, 340, 400, 440, 490, 530, 560],
    [0, -70, -170, -260, -370, -480, -580, -660],
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
            {/* STATUS BAR */}
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
                  fontSize: '12px',
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

            {/* WA HEADER (56px) */}
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
                  color: T.ink,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                ←
              </span>

              {/* Avatar Jota */}
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: T.hairline,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: T.graphite,
                  }}
                >
                  J
                </span>
              </div>

              {/* Info */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: T.ink,
                  }}
                >
                  Jota · MetricLab
                </span>
                <span
                  style={{
                    fontSize: '9px',
                    color: T.stone,
                  }}
                >
                  online
                </span>
              </div>
            </div>

            {/* ÁREA DE MENSAGENS (COM AUTO-SCROLL) */}
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
                  gap: '8px',
                  transform: `translateY(${scrollY}px)`,
                  transition: 'transform 0.2s ease-out',
                }}
              >
                {MESSAGES.map((msg) => {
                  if (frame < msg.frame) return null;

                  const msgOpacity = interpolate(
                    frame,
                    [msg.frame, msg.frame + 10],
                    [0, 1],
                    {
                      extrapolateLeft: 'clamp',
                      extrapolateRight: 'clamp',
                    }
                  );
                  const msgTranslateY = interpolate(
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
                        backgroundColor: isJota ? T.surface : T.waGreen,
                        borderRadius: isJota
                          ? '3px 14px 14px 3px'
                          : '14px 3px 3px 14px',
                        padding: '8px 11px',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
                        opacity: msgOpacity,
                        transform: `translateY(${msgTranslateY}px)`,
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '11px',
                          lineHeight: 1.45,
                          color: T.ink,
                          wordBreak: 'break-word',
                        }}
                      >
                        {msg.text}
                      </span>
                      <div
                        style={{
                          fontSize: '8px',
                          color: T.stone,
                          textAlign: 'right',
                          marginTop: '3px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          gap: '3px',
                        }}
                      >
                        <span>{msg.time}</span>
                        {!isJota && (
                          <span style={{ color: '#53bdeb', fontSize: '10px' }}>
                            ✓✓
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* TYPING INDICATOR */}
                {showTyping && (
                  <div
                    style={{
                      alignSelf: 'flex-start',
                      backgroundColor: T.surface,
                      borderRadius: '3px 14px 14px 3px',
                      padding: '10px 14px',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
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
                            backgroundColor: T.stone,
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
// CENA 5 — CELULAR DO GESTOR (frames 1140 → 1320 / 38s → 44s)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const GestorScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Transição de Entrada: local frame 5→35 (global 1145→1175)
  const phoneSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, mass: 0.6 },
  });
  const enterX = interpolate(phoneSpring, [0, 1], [400, 0]);

  // Transição de Saída: local frame 175→180 (global 1315→1320)
  const exitY = interpolate(frame, [175, 180], [0, -800], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exitOpacity = interpolate(frame, [175, 180], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Notificação Card: local frame 35→55 (global 1175→1195)
  const notifSpring = spring({
    frame: frame - 35,
    fps,
    config: { damping: 16 },
  });
  const notifY = interpolate(notifSpring, [0, 1], [-12, 0]);
  const notifOpacity = interpolate(frame, [35, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Summary Card: local frame 70→100 (global 1210→1240)
  const cardY = interpolate(frame, [70, 95], [8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cardOpacity = interpolate(frame, [70, 95], [0, 1], {
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
            {/* STATUS BAR */}
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
                  fontSize: '12px',
                  fontWeight: 600,
                  color: T.ink,
                }}
              >
                9:50
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
                    fontWeight: 600,
                    color: T.ink,
                  }}
                >
                  Eng. Roberto Lima
                </span>
                <span
                  style={{
                    fontSize: '9px',
                    color: T.stone,
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
              {/* NOTIFICAÇÃO (frame 35+) */}
              {frame >= 35 && (
                <div
                  style={{
                    backgroundColor: T.surface,
                    borderRadius: '10px',
                    borderLeft: `3px solid ${T.accent}`,
                    padding: '12px 14px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                    transform: `translateY(${notifY}px)`,
                    opacity: notifOpacity,
                  }}
                >
                  <div
                    style={{
                      fontSize: '9px',
                      fontWeight: 600,
                      color: T.accent,
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
                      color: T.ink,
                      lineHeight: 1.4,
                    }}
                  >
                    João Silva concluiu o envio de documentos. RH sinalizado para
                    validação.
                  </div>
                </div>
              )}

              {/* SUMMARY CARD (frame 70+) */}
              {frame >= 70 && (
                <div
                  style={{
                    backgroundColor: T.surface,
                    border: `1px solid ${T.hairline}`,
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                    transform: `translateY(${cardY}px)`,
                    opacity: cardOpacity,
                  }}
                >
                  {/* Linha 1: Candidato */}
                  <div
                    style={{
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: `1px solid ${T.hairline}`,
                    }}
                  >
                    <span style={{ fontSize: '9px', color: T.stone }}>
                      CANDIDATO
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        color: T.ink,
                        fontWeight: 500,
                      }}
                    >
                      João Silva
                    </span>
                  </div>

                  {/* Linha 2: Cargo */}
                  <div
                    style={{
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: `1px solid ${T.hairline}`,
                    }}
                  >
                    <span style={{ fontSize: '9px', color: T.stone }}>CARGO</span>
                    <span
                      style={{
                        fontSize: '11px',
                        color: T.ink,
                        fontWeight: 500,
                      }}
                    >
                      Analista de Planejamento
                    </span>
                  </div>

                  {/* Linha 3: Empresa */}
                  <div
                    style={{
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: `1px solid ${T.hairline}`,
                    }}
                  >
                    <span style={{ fontSize: '9px', color: T.stone }}>
                      EMPRESA
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        color: T.ink,
                        fontWeight: 500,
                      }}
                    >
                      Consórcio Lote 15
                    </span>
                  </div>

                  {/* Linha 4: Documentos */}
                  <div
                    style={{
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: `1px solid ${T.hairline}`,
                    }}
                  >
                    <span style={{ fontSize: '9px', color: T.stone }}>
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

                  {/* Linha 5: Entrevista */}
                  <div
                    style={{
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: `1px solid ${T.hairline}`,
                    }}
                  >
                    <span style={{ fontSize: '9px', color: T.stone }}>
                      ENTREVISTA
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
                      Agendada · 14h
                    </span>
                  </div>

                  {/* Linha 6: Próximo */}
                  <div
                    style={{
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span style={{ fontSize: '9px', color: T.stone }}>
                      PRÓXIMO
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        color: T.blue,
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
// CENA 6 — ENCERRAMENTO (frames 1320 → 1350 / 44s → 45s)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const EndScene: React.FC = () => {
  const frame = useCurrentFrame();

  // LOGO: frame 5→20
  const logoOpacity = interpolate(frame, [5, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const logoTranslateY = interpolate(frame, [5, 20], [8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // SUBTÍTULO: frame 10→25
  const subOpacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // HAIRLINE: frame 15→25
  const hairOpacity = interpolate(frame, [15, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // POWERED: frame 18→30
  const powOpacity = interpolate(frame, [18, 30], [0, 1], {
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
            color: T.ink,
            letterSpacing: '-2px',
            lineHeight: 1,
            opacity: logoOpacity,
            transform: `translateY(${logoTranslateY}px)`,
          }}
        >
          M<span style={{ color: T.accent }}>.</span>
        </div>

        {/* SUBTÍTULO */}
        <div
          style={{
            marginTop: '6px',
            fontSize: '28px',
            fontWeight: 700,
            color: T.ink,
            letterSpacing: '-0.5px',
            opacity: subOpacity,
          }}
        >
          Fluxo de Contratação
        </div>

        {/* HAIRLINE */}
        <div
          style={{
            marginTop: '28px',
            marginBottom: '16px',
            width: '60px',
            height: '1px',
            backgroundColor: T.hairline,
            opacity: hairOpacity,
          }}
        />

        {/* POWERED */}
        <div
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: T.accent,
            opacity: powOpacity,
          }}
        >
          Powered by MetricLab
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPOSIÇÃO PRINCIPAL: VideoAdmissao (1350 frames / 45s)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const VideoAdmissao: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: T.canvas }}>
      {/* Áudio de Admissão */}
      <Audio
        src={staticFile('audio/admissao.mp3')}
        startFrom={0}
        volume={1}
      />

      {/* CENA 1 — SPLASH (0 → 120 / 0s → 4s) */}
      <Sequence from={0} durationInFrames={s(4)}>
        <SplashScene />
      </Sequence>

      {/* CENA 2 — HOME DO APP (120 → 270 / 4s → 9s) */}
      <Sequence from={s(4)} durationInFrames={s(5)}>
        <HomeScene />
      </Sequence>

      {/* CENA 3 — FORMULÁRIO (270 → 510 / 9s → 17s) */}
      <Sequence from={s(9)} durationInFrames={s(8)}>
        <FormScene />
      </Sequence>

      {/* CENA 4 — WHATSAPP CANDIDATO (510 → 1140 / 17s → 38s) */}
      <Sequence from={s(17)} durationInFrames={s(21)}>
        <WhatsAppScene />
      </Sequence>

      {/* CENA 5 — CELULAR DO GESTOR (1140 → 1320 / 38s → 44s) */}
      <Sequence from={s(38)} durationInFrames={s(6)}>
        <GestorScene />
      </Sequence>

      {/* CENA 6 — ENCERRAMENTO (1320 → 1350 / 44s → 45s) */}
      <Sequence from={s(44)} durationInFrames={s(1)}>
        <EndScene />
      </Sequence>
    </AbsoluteFill>
  );
};
