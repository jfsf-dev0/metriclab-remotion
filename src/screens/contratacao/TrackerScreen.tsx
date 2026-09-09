import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { Screen } from "../../components/Screen";
import { AppHeader } from "../../components/AppHeader";
import { Badge } from "../../components/Badge";

interface TrackerScreenProps {
  stage?: "documentacao" | "aprovada";
}

export const TrackerScreen: React.FC<TrackerScreenProps> = ({
  stage = "documentacao",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Toast animation spring
  const toastSpring = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { damping: 12, mass: 0.5 },
  });

  const toastTranslateY = interpolate(toastSpring, [0, 1], [-40, 0]);
  const toastOpacity = interpolate(toastSpring, [0, 1], [0, 1]);

  const isAprovada = stage === "aprovada";

  const phases = [
    {
      id: 1,
      title: "Fase 1: Identificação",
      status: "done",
      desc: "Dados cadastrais e contato registrados",
      time: "10:14",
    },
    {
      id: 2,
      title: "Fase 2: Documentação",
      status: isAprovada ? "done" : "current",
      desc: isAprovada ? "RG e CPF validados" : "Aguardando upload via WhatsApp",
      time: isAprovada ? "10:16" : "Em andamento",
    },
    {
      id: 3,
      title: "Fase 3: Validação IA",
      status: isAprovada ? "done" : "pending",
      desc: isAprovada ? "Aprovado com 98% de precisão" : "OCR e Biometria facial",
      time: isAprovada ? "10:18" : "Pendente",
    },
    {
      id: 4,
      title: "Fase 4: Agendamento",
      status: isAprovada ? "current" : "pending",
      desc: isAprovada ? "Exame admissional em agendamento" : "Aguardando aprovação IA",
      time: isAprovada ? "Próxima etapa" : "Pendente",
    },
  ];

  return (
    <Screen bg="#f8fafc">
      <AppHeader
        title="Tracker de Contratação"
        subtitle="Candidato: João Silva"
        rightElement={
          isAprovada ? (
            <Badge variant="green" pulse size="sm">
              IA aprovou ✓
            </Badge>
          ) : (
            <Badge variant="blue" pulse size="sm">
              Em andamento
            </Badge>
          )
        }
      />

      <div className="flex-1 px-4 py-3 flex flex-col justify-between overflow-hidden">
        {/* Candidate Summary Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                JS
              </div>
              <div>
                <div className="text-[13px] font-bold text-gray-900 leading-tight">
                  João Silva
                </div>
                <div className="text-[10px] text-gray-500">
                  Analista de Planejamento • Lote 15
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[9px] font-semibold text-gray-400 uppercase">
                Protocolo
              </div>
              <div className="text-[11px] font-mono font-bold text-gray-700">
                #CTR-4892
              </div>
            </div>
          </div>
        </div>

        {/* Phase Steps Timeline */}
        <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-sm space-y-3.5 my-1">
          <div className="text-[11px] font-bold text-gray-800 uppercase tracking-wide">
            Linha do Tempo das Fases
          </div>

          <div className="space-y-3 relative">
            {/* Vertical connector line */}
            <div className="absolute left-[13px] top-2 bottom-2 w-0.5 bg-gray-200" />

            {phases.map((p) => {
              const isDone = p.status === "done";
              const isCurrent = p.status === "current";

              return (
                <div key={p.id} className="flex items-start space-x-3 relative z-10">
                  {/* Status Circle */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 transition-all ${
                      isDone
                        ? "bg-green-600 text-white shadow-sm shadow-green-500/30"
                        : isCurrent
                        ? "bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse"
                        : "bg-gray-100 text-gray-400 border border-gray-300"
                    }`}
                  >
                    {isDone ? "✓" : isCurrent ? "●" : "○"}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[11.5px] font-bold ${
                          isDone
                            ? "text-green-700"
                            : isCurrent
                            ? "text-blue-600"
                            : "text-gray-400"
                        }`}
                      >
                        {p.title}
                      </span>
                      <span className="text-[9.5px] font-medium text-gray-400">
                        {p.time}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 leading-tight mt-0.5">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Notification Toast */}
        <div
          style={{
            transform: `translateY(${toastTranslateY}px)`,
            opacity: toastOpacity,
          }}
          className={`w-full rounded-xl p-3 shadow-lg border flex items-center space-x-2.5 ${
            isAprovada
              ? "bg-emerald-50 border-emerald-300 text-emerald-900"
              : "bg-blue-50 border-blue-300 text-blue-900"
          }`}
        >
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${
              isAprovada ? "bg-emerald-600" : "bg-blue-600"
            }`}
          >
            {isAprovada ? "✓" : "💬"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-bold leading-tight">
              {isAprovada
                ? "Notificação enviada ao Gestor"
                : "Disparo automático realizado"}
            </div>
            <div className="text-[10px] leading-tight opacity-90 truncate mt-0.5">
              {isAprovada
                ? "João Silva — IA aprovada. Aguarda agendamento."
                : "WhatsApp enviado ao candidato ✓"}
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
};
