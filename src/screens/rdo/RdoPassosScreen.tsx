import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Screen } from "../../components/Screen";
import { AppHeader } from "../../components/AppHeader";
import { Badge } from "../../components/Badge";

interface RdoPassosScreenProps {
  stepGroup: "1-2" | "3-4" | "5";
}

export const RdoPassosScreen: React.FC<RdoPassosScreenProps> = ({
  stepGroup = "1-2",
}) => {
  const frame = useCurrentFrame();

  // Typing effect for activities text in step 3-4
  const activityText = () => {
    const full = "Concretagem laje bloco A e terraplenagem talude oeste...";
    const count = Math.floor(Math.max(0, frame - 30) / 2);
    return full.slice(0, Math.min(count, full.length));
  };

  // Signature drawing in step 5
  const strokeOffset = interpolate(frame, [15, 60], [300, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isQrScanned = frame > 35;
  const isSendActive = frame > 65;

  return (
    <Screen bg="#f8fafc">
      <AppHeader
        title={
          stepGroup === "1-2"
            ? "RDO — Clima e Equipe"
            : stepGroup === "3-4"
            ? "RDO — Máquinas e Atividades"
            : "RDO — Resumo e Assinatura"
        }
        subtitle="Trecho 01 — Acesso Norte"
        showBack
        rightElement={
          <Badge variant="blue" size="sm">
            {stepGroup === "1-2"
              ? "Passos 1-2"
              : stepGroup === "3-4"
              ? "Passos 3-4"
              : "Passo 5"}
          </Badge>
        }
      />

      <div className="flex-1 px-4 py-3 space-y-3 overflow-y-auto">
        {stepGroup === "1-2" && (
          <>
            {/* Clima Card */}
            <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-500 uppercase">
                  Passo 1: Condições Climáticas
                </span>
                <Badge variant="green" size="sm">
                  Capturado automaticamente
                </Badge>
              </div>

              <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-2.5 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <span className="text-2xl">☀️</span>
                  <div>
                    <div className="text-[13px] font-bold text-gray-900">
                      24°C • Ensolarado
                    </div>
                    <div className="text-[9.5px] text-gray-500">
                      Umidade: 65% • Vento: 12km/h
                    </div>
                  </div>
                </div>
                <div className="px-2 py-1 bg-white rounded border border-blue-200 text-[10px] font-bold text-blue-700">
                  Turno Manhã ✓
                </div>
              </div>
            </div>

            {/* Equipe / Crachá QR Code */}
            <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-500 uppercase">
                  Passo 2: Efetivo em Campo
                </span>
                <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {isQrScanned ? "3 colaboradores" : "2 colaboradores"}
                </span>
              </div>

              {/* QR Scanner mini card */}
              <div className="p-2.5 rounded-lg border-2 border-dashed border-blue-400 bg-blue-50/40 flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-lg border border-gray-300 flex items-center justify-center shadow-xs">
                  <span className="text-xl">📷</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-bold text-gray-900">
                    {isQrScanned
                      ? "✓ Crachá Escaneado!"
                      : "Aponte a câmera para o crachá"}
                  </div>
                  <div className="text-[9.5px] text-gray-500">
                    Leitura instantânea de QR Code
                  </div>
                </div>
              </div>

              {/* Collaborator scanned item */}
              {isQrScanned && (
                <div className="p-2 bg-emerald-50 border border-emerald-300 rounded-lg flex items-center justify-between animate-fadeIn">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center">
                      JS
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-emerald-950">
                        João Silva
                      </div>
                      <div className="text-[9.5px] text-emerald-700">
                        Função: Pedreiro Especializado
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600">
                    Presente ✓
                  </span>
                </div>
              )}
            </div>
          </>
        )}

        {stepGroup === "3-4" && (
          <>
            {/* Máquinas em Operação */}
            <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-500 uppercase">
                  Passo 3: Equipamentos & Máquinas
                </span>
                <span className="text-[10px] font-semibold text-gray-500">
                  3 cadastrados
                </span>
              </div>

              <div className="space-y-1.5">
                {/* Escavadeira CAT */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <span>🚜</span>
                    <span className="text-[11px] font-bold text-gray-800">
                      Escavadeira CAT 320
                    </span>
                  </div>
                  <Badge variant="green" size="sm">
                    Operando
                  </Badge>
                </div>

                {/* Caminhão */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <span>🚚</span>
                    <span className="text-[11px] font-bold text-gray-800">
                      Caminhão Basculante 04
                    </span>
                  </div>
                  <Badge variant="green" size="sm">
                    Operando
                  </Badge>
                </div>

                {/* Rolo Compactador */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <span>🚜</span>
                    <span className="text-[11px] font-bold text-gray-800">
                      Rolo Compactador Dynapac
                    </span>
                  </div>
                  <Badge variant="amber" size="sm">
                    Manutenção
                  </Badge>
                </div>
              </div>
            </div>

            {/* Atividades e Fotos */}
            <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-500 uppercase">
                  Passo 4: Atividades Realizadas
                </span>
                <span className="text-[9.5px] text-blue-600 font-semibold">
                  Foto salva ✓
                </span>
              </div>

              <div className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-[11px] font-medium text-gray-800 min-h-[50px]">
                <span>{activityText()}</span>
                {frame >= 30 && frame < 75 && (
                  <span className="w-0.5 h-3 bg-blue-600 inline-block animate-pulse ml-0.5" />
                )}
              </div>
            </div>
          </>
        )}

        {stepGroup === "5" && (
          <>
            {/* Resumo do RDO */}
            <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-xs space-y-1.5">
              <div className="text-[10.5px] font-bold text-gray-600 uppercase">
                Resumo Geral da Produção
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="p-1.5 rounded bg-gray-50 border border-gray-200">
                  <span className="text-gray-400 block">Efetivo</span>
                  <strong className="text-gray-800 text-[11px]">3 Colaboradores</strong>
                </div>
                <div className="p-1.5 rounded bg-gray-50 border border-gray-200">
                  <span className="text-gray-400 block">Equipamentos</span>
                  <strong className="text-gray-800 text-[11px]">2 Operando / 1 Parado</strong>
                </div>
              </div>
            </div>

            {/* Assinatura e GPS */}
            <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-500 uppercase">
                  Assinatura do Encarregado
                </span>
                <Badge variant="green" size="sm">
                  📍 GPS Confirmado
                </Badge>
              </div>

              <div className="w-full h-24 bg-gray-50 rounded-lg border border-dashed border-gray-300 relative flex items-center justify-center overflow-hidden">
                <svg className="w-full h-full p-2" viewBox="0 0 240 80" fill="none">
                  <path
                    d="M 20 50 Q 50 15 80 45 T 140 30 T 190 60 Q 210 20 230 45"
                    stroke="#1e3a8a"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="300"
                    strokeDashoffset={strokeOffset}
                  />
                </svg>
              </div>
            </div>

            {/* Enviar RDO Button */}
            <div className="pt-1">
              <div
                className={`w-full py-2.5 rounded-xl font-bold text-[12px] text-center shadow-md transition-all ${
                  isSendActive
                    ? "bg-blue-600 text-white shadow-blue-500/30 scale-[1.02]"
                    : "bg-blue-400 text-white/90"
                }`}
              >
                Enviar RDO Diário →
              </div>
            </div>
          </>
        )}
      </div>
    </Screen>
  );
};
