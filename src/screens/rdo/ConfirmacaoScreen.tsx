import React from "react";
import { useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import { Screen } from "../../components/Screen";
import { AppHeader } from "../../components/AppHeader";
import { Badge } from "../../components/Badge";

export const RdoConfirmacaoScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const checkSpring = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 12, mass: 0.5 },
  });

  const checkScale = interpolate(checkSpring, [0, 1], [0.3, 1]);

  return (
    <Screen bg="#f8fafc">
      <AppHeader
        title="Protocolo de Entrega"
        subtitle="RDO #2026-09-001"
        rightElement={
          <Badge variant="green" size="sm">
            Transmitido
          </Badge>
        }
      />

      <div className="flex-1 px-5 py-6 flex flex-col items-center justify-between text-center">
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Big Green Check Circle */}
          <div
            style={{ transform: `scale(${checkScale})` }}
            className="w-20 h-20 rounded-full bg-emerald-600 text-white flex items-center justify-center text-4xl shadow-xl shadow-emerald-500/30 mb-4"
          >
            ✓
          </div>

          <h2 className="text-[20px] font-black text-gray-900 leading-tight">
            RDO Enviado!
          </h2>
          <p className="text-[11.5px] text-gray-500 mt-1 max-w-[210px] leading-relaxed">
            Dados sincronizados com o servidor central MetricLab e notificados em tempo real.
          </p>
        </div>

        {/* Timeline Status */}
        <div className="w-full bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs space-y-2.5 text-left">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
            Status de Transmissão
          </div>

          <div className="space-y-2 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 flex items-center space-x-1.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Registro no Banco MetricLab</span>
              </span>
              <span className="text-emerald-600 font-bold text-[10px]">OK</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700 flex items-center space-x-1.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Notificação enviada ao Supervisor</span>
              </span>
              <span className="text-emerald-600 font-bold text-[10px]">OK</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700 flex items-center space-x-1.5">
                <span className="text-blue-600 font-bold">●</span>
                <span>Alimentação Painel BI em Tempo Real</span>
              </span>
              <span className="text-blue-600 font-bold text-[10px]">Ao Vivo</span>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
};
