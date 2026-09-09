import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Screen } from "../../components/Screen";
import { AppHeader } from "../../components/AppHeader";
import { Badge } from "../../components/Badge";

export const SupervisorPainelScreen: React.FC = () => {
  const frame = useCurrentFrame();

  // Animated counters
  const rdos = Math.floor(interpolate(frame, [10, 60], [0, 3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }));

  const colaboradores = Math.floor(interpolate(frame, [10, 70], [0, 47], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }));

  const ocorrencias = Math.floor(interpolate(frame, [20, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }));

  const trechos = Math.floor(interpolate(frame, [10, 50], [0, 3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }));

  return (
    <Screen bg="#090d16" dark={true} hasStatusBar={true}>
      <AppHeader
        title="Painel de Controle"
        subtitle="Consórcio Lote 15 • Engenharia"
        dark
        rightElement={
          <Badge variant="green" size="sm" pulse>
            ● Ao vivo
          </Badge>
        }
      />

      <div className="flex-1 px-4 py-3 space-y-3 overflow-y-auto">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
            Indicadores de Produção Hoje
          </span>
          <span className="text-[10px] text-gray-500 font-mono">09/09 09:20</span>
        </div>

        {/* 2x2 Grid of KPIs */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* KPI 1: RDOs */}
          <div className="bg-[#131b2e] border border-blue-900/60 rounded-xl p-3 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-semibold text-gray-400">
              RDOs Enviados
            </span>
            <div className="text-[32px] font-black text-blue-400 leading-tight my-1">
              {rdos}
            </div>
            <span className="text-[9px] text-emerald-400 font-semibold">
              ↑ 100% no prazo
            </span>
          </div>

          {/* KPI 2: Colaboradores */}
          <div className="bg-[#131b2e] border border-blue-900/60 rounded-xl p-3 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-semibold text-gray-400">
              Colaboradores
            </span>
            <div className="text-[32px] font-black text-emerald-400 leading-tight my-1">
              {colaboradores}
            </div>
            <span className="text-[9px] text-gray-400">
              Crachás validados
            </span>
          </div>

          {/* KPI 3: Ocorrências */}
          <div className="bg-[#131b2e] border border-red-900/60 rounded-xl p-3 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-semibold text-gray-400">
              Ocorrência Aberta
            </span>
            <div className="text-[32px] font-black text-red-500 leading-tight my-1">
              {ocorrencias}
            </div>
            <span className="text-[9px] text-red-400 font-semibold">
              Atenção requerida
            </span>
          </div>

          {/* KPI 4: Trechos Ativos */}
          <div className="bg-[#131b2e] border border-blue-900/60 rounded-xl p-3 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-semibold text-gray-400">
              Trechos Ativos
            </span>
            <div className="text-[32px] font-black text-white leading-tight my-1">
              {trechos}
            </div>
            <span className="text-[9px] text-blue-400 font-semibold">
              Frentes operando
            </span>
          </div>
        </div>

        {/* Mini status bar */}
        <div className="bg-[#131b2e] border border-gray-800 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl">📡</span>
            <div>
              <div className="text-[11px] font-bold text-gray-200">
                Transmissão via Satélite/4G
              </div>
              <div className="text-[9.5px] text-gray-400">
                Latência média de campo: 1.4s
              </div>
            </div>
          </div>
          <Badge variant="blue" size="sm">
            Ativo
          </Badge>
        </div>
      </div>
    </Screen>
  );
};
