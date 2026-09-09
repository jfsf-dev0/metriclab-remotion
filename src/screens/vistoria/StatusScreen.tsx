import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { Screen } from "../../components/Screen";
import { AppHeader } from "../../components/AppHeader";
import { Badge } from "../../components/Badge";

export const VistoriaStatusScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isApproved = frame > 40;

  // Spring animation for checkmark
  const checkSpring = spring({
    frame: Math.max(0, frame - 40),
    fps,
    config: { damping: 12, mass: 0.6 },
  });

  const checkScale = interpolate(checkSpring, [0, 1], [0.5, 1]);

  return (
    <Screen bg="#f8fafc">
      <AppHeader
        title="Resultado da Auditoria"
        subtitle="Protocolo #VST-2026-089"
        rightElement={
          isApproved ? (
            <Badge variant="green" size="sm">
              Concluído
            </Badge>
          ) : (
            <Badge variant="amber" size="sm" pulse>
              Processando
            </Badge>
          )
        }
      />

      <div className="flex-1 px-5 py-6 flex flex-col items-center justify-center text-center">
        {/* Animated Icon State: Clock -> Green Check */}
        <div className="mb-4">
          {!isApproved ? (
            <div className="w-20 h-20 rounded-full bg-amber-100 border-4 border-amber-400 flex items-center justify-center text-3xl animate-pulse shadow-md">
              ⏳
            </div>
          ) : (
            <div
              style={{ transform: `scale(${checkScale})` }}
              className="w-20 h-20 rounded-full bg-emerald-600 text-white flex items-center justify-center text-4xl shadow-xl shadow-emerald-500/30"
            >
              ✓
            </div>
          )}
        </div>

        {/* Score Display */}
        {isApproved ? (
          <div className="space-y-2">
            <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full">
              Score de Conformidade
            </div>
            <div className="text-[56px] font-black text-emerald-600 leading-none tracking-tight">
              94<span className="text-[28px] text-emerald-500 font-bold">/100</span>
            </div>
            <h2 className="text-[17px] font-extrabold text-gray-900 mt-1">
              Vistoria Aprovada pela IA
            </h2>
            <p className="text-[11px] text-gray-500 max-w-[220px] mx-auto leading-relaxed">
              Laudo fotográfico e estrutural gerado automaticamente e assinado com carimbo de tempo.
            </p>

            <div className="pt-4 flex flex-col gap-1.5 text-left w-full bg-white p-3 rounded-xl border border-gray-200 shadow-xs">
              <div className="text-[10px] text-gray-600 flex justify-between">
                <span>Relatório PDF:</span>
                <span className="font-bold text-blue-600">Disponível</span>
              </div>
              <div className="text-[10px] text-gray-600 flex justify-between">
                <span>Hash Blockchain:</span>
                <span className="font-mono text-gray-400 text-[8.5px]">0x8f4c...91a2</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <h2 className="text-[16px] font-bold text-gray-900">
              Validando Laudo Estrutural
            </h2>
            <p className="text-[11px] text-gray-500 max-w-[200px] mx-auto">
              A inteligência artificial está auditando as fotografias e anomalias...
            </p>
          </div>
        )}
      </div>
    </Screen>
  );
};
