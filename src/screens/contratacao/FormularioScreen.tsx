import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Screen } from "../../components/Screen";
import { AppHeader } from "../../components/AppHeader";

export const FormularioScreen: React.FC = () => {
  const frame = useCurrentFrame();

  // Helper for animated typing effect
  const typeText = (text: string, startFrame: number, speed = 2) => {
    const chars = Math.floor(Math.max(0, frame - startFrame) / speed);
    return text.slice(0, Math.min(chars, text.length));
  };

  const nome = typeText("João Silva", 15, 2);
  const telefone = typeText("+55 (11) 98765-4321", 35, 1.5);
  const gestor = typeText("+55 (11) 91234-5678", 60, 1.5);
  const empresa = typeText("Consórcio Lote 15", 85, 2);
  const cargo = typeText("Analista de Planejamento", 110, 2);

  // Button pulse animation
  const pulseScale = interpolate(
    Math.sin((frame / 12) * Math.PI),
    [-1, 1],
    [0.98, 1.03]
  );
  const isButtonActive = frame > 130;

  return (
    <Screen bg="#f8fafc">
      <AppHeader
        title="Iniciar Contratação"
        subtitle="Consórcio Lote 15 • Novo Colaborador"
      />

      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3">
        {/* Intro banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-2.5 flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0">
            ✦
          </div>
          <p className="text-[10.5px] text-blue-900 leading-tight">
            Disparo automático via WhatsApp e validação com Inteligência Artificial.
          </p>
        </div>

        {/* Input: Nome */}
        <div className="space-y-1">
          <label className="text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
            Nome Completo
          </label>
          <div className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-[11.5px] font-medium text-gray-900 shadow-sm flex items-center justify-between h-8">
            <span>{nome}</span>
            {frame >= 15 && frame < 35 && (
              <span className="w-0.5 h-3.5 bg-blue-600 animate-pulse" />
            )}
          </div>
        </div>

        {/* Input: Telefone */}
        <div className="space-y-1">
          <label className="text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
            WhatsApp do Candidato
          </label>
          <div className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-[11.5px] font-medium text-gray-900 shadow-sm flex items-center justify-between h-8">
            <span>{telefone}</span>
            {frame >= 35 && frame < 60 && (
              <span className="w-0.5 h-3.5 bg-blue-600 animate-pulse" />
            )}
          </div>
        </div>

        {/* Input: Gestor */}
        <div className="space-y-1">
          <label className="text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
            WhatsApp do Gestor
          </label>
          <div className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-[11.5px] font-medium text-gray-900 shadow-sm flex items-center justify-between h-8">
            <span>{gestor}</span>
            {frame >= 60 && frame < 85 && (
              <span className="w-0.5 h-3.5 bg-blue-600 animate-pulse" />
            )}
          </div>
        </div>

        {/* Input: Empresa */}
        <div className="space-y-1">
          <label className="text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
            Empresa / Consórcio
          </label>
          <div className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-[11.5px] font-medium text-gray-900 shadow-sm flex items-center justify-between h-8">
            <span>{empresa}</span>
            {frame >= 85 && frame < 110 && (
              <span className="w-0.5 h-3.5 bg-blue-600 animate-pulse" />
            )}
          </div>
        </div>

        {/* Input: Cargo */}
        <div className="space-y-1">
          <label className="text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
            Cargo / Função
          </label>
          <div className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-[11.5px] font-medium text-gray-900 shadow-sm flex items-center justify-between h-8">
            <span>{cargo}</span>
            {frame >= 110 && frame < 130 && (
              <span className="w-0.5 h-3.5 bg-blue-600 animate-pulse" />
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <div
            style={{
              transform: isButtonActive ? `scale(${pulseScale})` : "scale(1)",
            }}
            className={`w-full py-2.5 rounded-xl font-bold text-[12px] flex items-center justify-center space-x-1.5 transition-colors shadow-md ${
              isButtonActive
                ? "bg-blue-600 text-white shadow-blue-500/30"
                : "bg-blue-500/80 text-white/90"
            }`}
          >
            <span>Iniciar Processo</span>
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>
        </div>
      </div>
    </Screen>
  );
};
