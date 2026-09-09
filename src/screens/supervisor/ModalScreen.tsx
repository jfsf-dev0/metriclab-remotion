import React from "react";
import { useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import { Screen } from "../../components/Screen";
import { AppHeader } from "../../components/AppHeader";
import { Badge } from "../../components/Badge";

export const SupervisorModalScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slide modal from right spring
  const modalSpring = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 14, mass: 0.6 },
  });

  const modalX = interpolate(modalSpring, [0, 1], [300, 0]);

  return (
    <Screen bg="#090d16" dark={true} hasStatusBar={true}>
      <AppHeader
        title="Detalhes do RDO"
        subtitle="Trecho 01 — Acesso Norte"
        dark
        showBack
        rightElement={
          <Badge variant="green" size="sm">
            Validado
          </Badge>
        }
      />

      {/* Sliding Sheet Modal */}
      <div
        style={{ transform: `translateX(${modalX}px)` }}
        className="flex-1 px-4 py-3 space-y-2.5 overflow-y-auto"
      >
        {/* Encarregado & Clima */}
        <div className="bg-[#131b2e] border border-blue-900/60 rounded-xl p-3 shadow-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                CE
              </div>
              <div>
                <div className="text-[12px] font-bold text-white leading-tight">
                  Carlos Encarregado
                </div>
                <div className="text-[9.5px] text-gray-400">Encarregado Geral</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] font-bold text-yellow-400">
                ☀️ 24°C | Manhã
              </div>
              <div className="text-[9px] text-gray-400">Umidade: 65%</div>
            </div>
          </div>
        </div>

        {/* Equipe: 3 colaboradores (fotos crachá) */}
        <div className="bg-[#131b2e] border border-gray-800 rounded-xl p-3 shadow-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-bold text-gray-300">
              Equipe: 3 colaboradores
            </span>
            <span className="text-[9px] text-emerald-400 font-bold">
              ✓ Crachás Validados
            </span>
          </div>
          <div className="flex space-x-2">
            {["João Silva", "Paulo Santos", "Marcos Dias"].map((name, i) => (
              <div
                key={i}
                className="flex-1 bg-black/30 border border-gray-700/60 rounded-lg p-1.5 text-center"
              >
                <div className="w-6 h-6 rounded-full bg-blue-800 text-white text-[9px] font-bold mx-auto mb-1 flex items-center justify-center">
                  {name[0]}
                </div>
                <div className="text-[9px] font-bold text-gray-200 truncate">
                  {name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Máquinas: 2 operando / 1 manutenção */}
        <div className="bg-[#131b2e] border border-gray-800 rounded-xl p-3 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-bold text-gray-300">
              Máquinas no Canteiro
            </span>
            <span className="text-[9.5px] text-gray-400">
              2 operando / 1 manutenção
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-[9px] text-center">
            <div className="p-1 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 font-bold">
              🚜 Escavadeira (OK)
            </div>
            <div className="p-1 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 font-bold">
              🚚 Caminhão (OK)
            </div>
            <div className="p-1 rounded bg-amber-950/60 border border-amber-800/60 text-amber-300 font-bold">
              🚜 Rolo (Manut.)
            </div>
          </div>
        </div>

        {/* Grid de fotos do dia */}
        <div className="bg-[#131b2e] border border-gray-800 rounded-xl p-3 shadow-xs space-y-1.5">
          <span className="text-[10.5px] font-bold text-gray-300 block">
            Evidências Fotográficas
          </span>
          <div className="grid grid-cols-3 gap-1.5">
            <div className="aspect-video rounded bg-blue-900/60 border border-blue-700 flex items-center justify-center text-[9px] text-blue-200 font-bold">
              Laje Bloco A
            </div>
            <div className="aspect-video rounded bg-emerald-900/60 border border-emerald-700 flex items-center justify-center text-[9px] text-emerald-200 font-bold">
              Talude Oeste
            </div>
            <div className="aspect-video rounded bg-purple-900/60 border border-purple-700 flex items-center justify-center text-[9px] text-purple-200 font-bold">
              Ferragens
            </div>
          </div>
        </div>

        {/* Assinatura digital + GPS */}
        <div className="bg-[#131b2e] border border-gray-800 rounded-xl p-2.5 flex items-center justify-between text-[9.5px]">
          <div className="text-gray-300">
            <div className="font-bold text-white">Assinatura Digital: Carlos E.</div>
            <div className="text-gray-400">Chave: SHA-256 verificado</div>
          </div>
          <Badge variant="green" size="sm">
            📍 Georreferenciado
          </Badge>
        </div>
      </div>
    </Screen>
  );
};
