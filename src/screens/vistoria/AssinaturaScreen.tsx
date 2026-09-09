import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Screen } from "../../components/Screen";
import { AppHeader } from "../../components/AppHeader";
import { Badge } from "../../components/Badge";

export const VistoriaAssinaturaScreen: React.FC = () => {
  const frame = useCurrentFrame();

  // SVG stroke-dashoffset signature drawing animation
  const strokeOffset = interpolate(frame, [15, 60], [300, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isGpsReady = frame > 40;
  const isButtonActive = frame > 65;

  return (
    <Screen bg="#f8fafc">
      <AppHeader
        title="Passo 4: Encerramento"
        subtitle="Assinatura e Georreferenciamento"
        showBack
      />

      <div className="flex-1 px-4 py-3 flex flex-col justify-between overflow-hidden">
        <div className="space-y-3">
          {/* GPS Badge Section */}
          <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-base">📍</span>
              <div>
                <div className="text-[11.5px] font-bold text-gray-900 leading-tight">
                  Localização GPS RTK
                </div>
                <div className="text-[9.5px] font-mono text-gray-500">
                  -23.550520, -46.633308 (Precisão 1.2m)
                </div>
              </div>
            </div>
            {isGpsReady ? (
              <Badge variant="green" size="sm">
                📍 Capturado
              </Badge>
            ) : (
              <Badge variant="amber" size="sm" pulse>
                Obtendo...
              </Badge>
            )}
          </div>

          {/* Signature Box */}
          <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-500 uppercase">
                Assinatura do Morador / Responsável
              </span>
              <span className="text-[9px] text-blue-600 font-semibold">
                Tela Sensível
              </span>
            </div>

            {/* Signature Canvas Area */}
            <div className="w-full h-32 bg-gray-50 rounded-lg border border-dashed border-gray-300 relative flex items-center justify-center overflow-hidden">
              <svg
                className="w-full h-full p-2"
                viewBox="0 0 260 100"
                fill="none"
              >
                <path
                  d="M 20 60 Q 50 10 70 50 T 120 40 T 170 70 Q 210 20 240 55"
                  stroke="#1e3a8a"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="300"
                  strokeDashoffset={strokeOffset}
                />
              </svg>
              <div className="absolute bottom-2 left-3 text-[9px] text-gray-400 font-medium">
                Assinado digitalmente por João Silva
              </div>
            </div>
          </div>
        </div>

        {/* Action Button: Enviar Vistoria */}
        <div className="pt-2">
          <div
            className={`w-full py-2.5 rounded-xl font-bold text-[12px] flex items-center justify-center space-x-1.5 shadow-md transition-all ${
              isButtonActive
                ? "bg-green-600 text-white shadow-green-500/30 scale-[1.02]"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            <span>✓ Enviar Vistoria</span>
          </div>
        </div>
      </div>
    </Screen>
  );
};
