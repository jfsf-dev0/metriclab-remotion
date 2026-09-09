import React from "react";
import { useCurrentFrame } from "remotion";
import { Screen } from "../../components/Screen";
import { AppHeader } from "../../components/AppHeader";
import { Badge } from "../../components/Badge";

export const RdoMenuScreen: React.FC = () => {
  const frame = useCurrentFrame();

  const isRdoClicked = frame > 40;

  return (
    <Screen bg="#f8fafc">
      <AppHeader
        title="Painel de Campo"
        subtitle="Consórcio Lote 15"
        rightElement={
          <Badge variant="green" size="sm" pulse>
            Ao Vivo
          </Badge>
        }
      />

      <div className="flex-1 px-4 py-3 flex flex-col justify-between overflow-hidden">
        <div className="space-y-3">
          {/* User Info Card */}
          <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-xs">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                CE
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-bold text-gray-900 leading-tight">
                  Carlos Encarregado
                </div>
                <div className="text-[10.5px] text-gray-500">
                  Trecho 01 — Acesso Norte • Hoje
                </div>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500">
              <span>Status da Frente:</span>
              <span className="font-bold text-emerald-600">● Em Operação</span>
            </div>
          </div>

          <div className="text-[11px] font-bold text-gray-700 uppercase tracking-wide pt-1">
            Selecione a Ação
          </div>

          {/* Botão Ocorrência (amber) */}
          <div className="p-3 rounded-xl border border-amber-300 bg-amber-50/70 shadow-xs flex items-center justify-between opacity-80">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center text-sm font-bold shadow-xs">
                ⚠️
              </div>
              <div>
                <div className="text-[12px] font-bold text-amber-950 leading-tight">
                  Registrar Ocorrência
                </div>
                <div className="text-[9.5px] text-amber-800">
                  Acidente, embargo, chuva intensa
                </div>
              </div>
            </div>
            <span className="text-amber-600 text-xs font-bold">→</span>
          </div>

          {/* Botão RDO (azul) — Highlighted & Tapped */}
          <div
            className={`p-3.5 rounded-xl border-2 transition-all flex items-center justify-between ${
              isRdoClicked
                ? "border-blue-600 bg-blue-50 shadow-md ring-2 ring-blue-300 scale-[1.02]"
                : "border-blue-500 bg-white shadow-xs"
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center text-base font-bold shadow-sm">
                📋
              </div>
              <div>
                <div className="text-[13px] font-bold text-blue-950 leading-tight">
                  Preencher RDO Diário
                </div>
                <div className="text-[10px] text-blue-800">
                  Equipe, máquinas, clima e fotos
                </div>
              </div>
            </div>
            <div
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                isRdoClicked
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              Iniciar RDO
            </div>
          </div>
        </div>

        {/* Sync status footer */}
        <div className="bg-gray-100 p-2 rounded-lg text-center text-[9.5px] text-gray-500">
          Última sincronização: há 2 minutos • Modo Offline Ativo
        </div>
      </div>
    </Screen>
  );
};
