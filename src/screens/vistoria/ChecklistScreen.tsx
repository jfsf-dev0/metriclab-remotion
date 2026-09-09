import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Screen } from "../../components/Screen";
import { AppHeader } from "../../components/AppHeader";
import { ProgressBar } from "../../components/ProgressBar";

export const VistoriaChecklistScreen: React.FC = () => {
  const frame = useCurrentFrame();

  // House number typing
  const houseNum = frame > 10 ? "42" : "";

  // Progress animation based on answers checked
  const q1Checked = frame > 25;
  const q2Checked = frame > 55;
  const q3Checked = frame > 85;

  let progress = 20;
  if (q1Checked) progress += 25;
  if (q2Checked) progress += 25;
  if (q3Checked) progress += 30;

  return (
    <Screen bg="#f8fafc">
      <AppHeader
        title="Trecho 01 — Inspeção"
        subtitle="Passo 1 e 2 de 4 • Checklist"
        showBack
      />

      <div className="flex-1 px-4 py-3 space-y-3 overflow-y-auto">
        {/* Progress Bar */}
        <div className="bg-white p-2.5 rounded-xl border border-gray-200 shadow-xs">
          <ProgressBar
            progress={progress}
            label="Progresso da Vistoria"
            showPercent
            height={6}
          />
        </div>

        {/* Passo 1: Identificação do Imóvel */}
        <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-500 uppercase">
              Passo 1: Identificação
            </span>
            <span className="text-[10px] font-semibold text-emerald-600">
              ✓ Localizado
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-[11px] text-gray-700 font-medium">
              Rua das Palmeiras, Lote 14
            </div>
            <div className="w-16 bg-blue-50 border-2 border-blue-500 rounded-lg px-2.5 py-1.5 text-[12px] font-bold text-blue-700 text-center">
              Nº {houseNum || "..."}
            </div>
          </div>
        </div>

        {/* Passo 2: Checklist Animado */}
        <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-xs space-y-2.5">
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
            Passo 2: Diagnóstico Estrutural
          </div>

          {/* Pergunta 1 */}
          <div className="p-2 rounded-lg bg-gray-50 border border-gray-200 space-y-1.5">
            <div className="text-[11px] font-semibold text-gray-800">
              1. Há trincas ou fissuras na fachada?
            </div>
            <div className="flex space-x-2">
              <div
                className={`flex-1 py-1 rounded text-center text-[10px] font-bold border ${
                  q1Checked
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {q1Checked ? "✓ SIM (Microfissura)" : "SIM"}
              </div>
              <div className="flex-1 py-1 rounded text-center text-[10px] font-medium bg-white text-gray-400 border border-gray-200">
                NÃO
              </div>
            </div>
          </div>

          {/* Pergunta 2 */}
          <div className="p-2 rounded-lg bg-gray-50 border border-gray-200 space-y-1.5">
            <div className="text-[11px] font-semibold text-gray-800">
              2. Evidência de umidade ou infiltração?
            </div>
            <div className="flex space-x-2">
              <div className="flex-1 py-1 rounded text-center text-[10px] font-medium bg-white text-gray-400 border border-gray-200">
                SIM
              </div>
              <div
                className={`flex-1 py-1 rounded text-center text-[10px] font-bold border ${
                  q2Checked
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {q2Checked ? "✓ NÃO CONSTATADO" : "NÃO"}
              </div>
            </div>
          </div>

          {/* Pergunta 3 */}
          <div className="p-2 rounded-lg bg-gray-50 border border-gray-200 space-y-1.5">
            <div className="text-[11px] font-semibold text-gray-800">
              3. Recuo e muro com integridade preservada?
            </div>
            <div className="flex space-x-2">
              <div
                className={`flex-1 py-1 rounded text-center text-[10px] font-bold border ${
                  q3Checked
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {q3Checked ? "✓ CONFORME" : "SIM"}
              </div>
              <div className="flex-1 py-1 rounded text-center text-[10px] font-medium bg-white text-gray-400 border border-gray-200">
                NÃO
              </div>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
};
