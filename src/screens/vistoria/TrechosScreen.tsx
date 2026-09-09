import React from "react";
import { useCurrentFrame } from "remotion";
import { Screen } from "../../components/Screen";
import { AppHeader } from "../../components/AppHeader";
import { Badge } from "../../components/Badge";

export const VistoriaTrechosScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const isSelected = frame > 30;

  return (
    <Screen bg="#f8fafc">
      <AppHeader
        title="Trechos de Vistoria"
        subtitle="Consórcio Lote 15 • 3 Ativos"
        rightElement={
          <Badge variant="green" size="sm" pulse>
            Online
          </Badge>
        }
      />

      <div className="flex-1 px-4 py-3 space-y-3 overflow-y-auto">
        <div className="text-[11px] font-bold text-gray-700 uppercase tracking-wide">
          Selecione o Trecho para Inspecionar
        </div>

        {/* Trecho 01 Card - Highlighted */}
        <div
          className={`p-3.5 rounded-xl border-2 transition-all shadow-sm ${
            isSelected
              ? "border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-200"
              : "border-blue-300 bg-white"
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[13px] font-bold text-gray-900">
                Trecho 01 — Acesso Norte
              </span>
            </div>
            <Badge variant="green" size="sm">
              Liberado
            </Badge>
          </div>

          <div className="text-[10px] text-gray-500 space-y-0.5 mb-2.5">
            <div>Estaca: km 14+200 ao 15+800</div>
            <div>Imóveis previstos: 48 residências</div>
            <div>Prioridade: Alta (frente de detonação)</div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className="text-[9.5px] font-medium text-gray-400">
              Liberado por Eng. Marcos
            </span>
            <div
              className={`px-3 py-1 rounded-lg text-[10.5px] font-bold ${
                isSelected
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Iniciar Vistoria →
            </div>
          </div>
        </div>

        {/* Trecho 02 */}
        <div className="p-3.5 rounded-xl border border-gray-200 bg-white opacity-60">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[12px] font-bold text-gray-700">
              Trecho 02 — Viaduto Sul
            </span>
            <Badge variant="amber" size="sm">
              Em Preparação
            </Badge>
          </div>
          <div className="text-[9.5px] text-gray-400">
            Estaca: km 16+000 ao 17+100
          </div>
        </div>

        {/* Trecho 03 */}
        <div className="p-3.5 rounded-xl border border-gray-200 bg-white opacity-40">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[12px] font-bold text-gray-700">
              Trecho 03 — Drenagem Leste
            </span>
            <Badge variant="gray" size="sm">
              Aguardando
            </Badge>
          </div>
          <div className="text-[9.5px] text-gray-400">
            Início previsto: Segunda-feira
          </div>
        </div>
      </div>
    </Screen>
  );
};
