import React from "react";
import { useCurrentFrame } from "remotion";
import { Screen } from "../../components/Screen";

export const LoginRdoScreen: React.FC = () => {
  const frame = useCurrentFrame();

  const typeChave = () => {
    const full = "RDO001";
    const count = Math.floor(Math.max(0, frame - 15) / 3);
    return full.slice(0, Math.min(count, full.length));
  };

  const chave = typeChave();
  const isButtonActive = frame > 45;

  return (
    <Screen bg="#ffffff">
      <div className="flex-1 px-5 py-6 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-md">
              RDO
            </div>
            <div>
              <div className="text-[13px] font-black text-gray-900 leading-tight">
                Diário de Obra
              </div>
              <div className="text-[10px] text-gray-500">Lote 15 • Campo</div>
            </div>
          </div>

          <h2 className="text-[16px] font-bold text-gray-900 mb-1">
            Identificação de Campo
          </h2>
          <p className="text-[11px] text-gray-500 mb-5">
            Acesso para encarregados e mestres de obra.
          </p>

          <div className="space-y-3.5">
            <div>
              <label className="text-[10px] font-semibold text-gray-600 uppercase">
                Encarregado / Usuário
              </label>
              <div className="mt-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[12px] font-medium text-gray-800">
                Carlos Encarregado
              </div>
            </div>

            <div>
              <label className="text-[10px] font-semibold text-gray-600 uppercase">
                Chave da Frente de Trabalho
              </label>
              <div className="mt-1 bg-white border-2 border-blue-500 rounded-lg px-3 py-2 text-[15px] font-mono font-bold tracking-widest text-blue-700 flex items-center justify-between shadow-sm">
                <span>{chave}</span>
                {frame >= 15 && frame < 45 && (
                  <span className="w-0.5 h-4 bg-blue-600 animate-pulse" />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <div
            className={`w-full py-2.5 rounded-xl font-bold text-[12px] text-center shadow-md transition-all ${
              isButtonActive
                ? "bg-blue-600 text-white scale-[1.02] shadow-blue-500/40"
                : "bg-blue-400 text-white/90"
            }`}
          >
            Entrar no Painel →
          </div>
        </div>
      </div>
    </Screen>
  );
};
