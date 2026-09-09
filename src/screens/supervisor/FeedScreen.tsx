import React from "react";
import { useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import { Screen } from "../../components/Screen";
import { AppHeader } from "../../components/AppHeader";
import { Badge } from "../../components/Badge";

export const SupervisorFeedScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slide-in spring for item 1
  const item1Spring = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { damping: 12, mass: 0.5 },
  });
  const item1Y = interpolate(item1Spring, [0, 1], [-40, 0]);
  const item1Opacity = interpolate(item1Spring, [0, 1], [0, 1]);

  // Slide-in spring for item 2
  const item2Spring = spring({
    frame: Math.max(0, frame - 55),
    fps,
    config: { damping: 12, mass: 0.5 },
  });
  const item2Y = interpolate(item2Spring, [0, 1], [-40, 0]);
  const item2Opacity = interpolate(item2Spring, [0, 1], [0, 1]);

  return (
    <Screen bg="#090d16" dark={true} hasStatusBar={true}>
      <AppHeader
        title="Feed de Atividades"
        subtitle="Notificações em Tempo Real"
        dark
        rightElement={
          <Badge variant="blue" size="sm" pulse>
            Streaming
          </Badge>
        }
      />

      <div className="flex-1 px-4 py-3 space-y-2.5 overflow-y-auto">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
            Últimos Eventos de Campo
          </span>
          <span className="text-[10px] text-emerald-400 font-semibold">
            ● Atualizando
          </span>
        </div>

        {/* Item 2: Ocorrência MÉDIA (appears later at top) */}
        {frame >= 55 && (
          <div
            style={{
              transform: `translateY(${item2Y}px)`,
              opacity: item2Opacity,
            }}
            className="bg-[#1e1414] border border-red-800/80 rounded-xl p-3 shadow-md space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-base">⚠️</span>
                <span className="text-[12px] font-bold text-red-400">
                  Ocorrência MÉDIA — Trecho 03
                </span>
              </div>
              <Badge variant="red" size="sm">
                Alerta
              </Badge>
            </div>
            <div className="text-[10px] text-gray-300">
              Responsável: Marcos Silva • Setor Operacional
            </div>
            <div className="text-[9.5px] text-red-200/80 bg-red-950/60 px-2 py-1 rounded">
              Interrupção parcial por chuva torrencial no talude.
            </div>
          </div>
        )}

        {/* Item 1: Carlos RDO Trecho 01 */}
        {frame >= 15 && (
          <div
            style={{
              transform: `translateY(${item1Y}px)`,
              opacity: item1Opacity,
            }}
            className="bg-[#131b2e] border border-emerald-700/70 rounded-xl p-3 shadow-md space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[12px] font-bold text-emerald-300">
                  Carlos enviou o RDO — Trecho 01
                </span>
              </div>
              <Badge variant="green" size="sm">
                Recebido
              </Badge>
            </div>
            <div className="text-[10.5px] text-gray-200">
              Manhã — 3 colaboradores — ☀️ 24°C
            </div>
            <div className="text-[9.5px] text-gray-400 flex justify-between pt-1 border-t border-gray-800">
              <span>Georreferenciado • Hash verificado</span>
              <span className="font-mono text-gray-400">há 12s</span>
            </div>
          </div>
        )}

        {/* Older item */}
        <div className="bg-[#131b2e]/50 border border-gray-800 rounded-xl p-3 opacity-60 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-bold text-gray-300">
              Trecho 04 — RDO Aprovado
            </span>
            <span className="text-[9px] text-gray-500 font-mono">08:45</span>
          </div>
          <div className="text-[10px] text-gray-400">
            Frente de pavimentação • 14 colaboradores
          </div>
        </div>
      </div>
    </Screen>
  );
};
