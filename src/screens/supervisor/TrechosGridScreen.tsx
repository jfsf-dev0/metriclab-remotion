import React from "react";
import { useCurrentFrame } from "remotion";
import { Screen } from "../../components/Screen";
import { AppHeader } from "../../components/AppHeader";
import { Badge } from "../../components/Badge";

export const TrechosGridScreen: React.FC = () => {
  const frame = useCurrentFrame();

  const isTrecho1Tapped = frame > 40;

  const trechos = [
    {
      id: "01",
      name: "Trecho 01 — Acesso Norte",
      badgeText: "RDO Enviado",
      badgeVariant: "green" as const,
      pulse: false,
      info: "Carlos Encarregado • 3 trab.",
      highlight: true,
    },
    {
      id: "02",
      name: "Trecho 02 — Viaduto Sul",
      badgeText: "Aguardando",
      badgeVariant: "amber" as const,
      pulse: true,
      info: "Previsão envio: 11:30",
      highlight: false,
    },
    {
      id: "03",
      name: "Trecho 03 — Drenagem",
      badgeText: "Ocorrência",
      badgeVariant: "red" as const,
      pulse: false,
      info: "Chuva / Interrupção parcial",
      highlight: false,
    },
    {
      id: "04",
      name: "Trecho 04 — Pavimentação",
      badgeText: "RDO Enviado",
      badgeVariant: "green" as const,
      pulse: false,
      info: "Marcos Engenharia • 14 trab.",
      highlight: false,
    },
    {
      id: "05",
      name: "Trecho 05 — Ponte Seca",
      badgeText: "Aprovado",
      badgeVariant: "green" as const,
      pulse: false,
      info: "Fiscalização validada",
      highlight: false,
    },
  ];

  return (
    <Screen bg="#090d16" dark={true} hasStatusBar={true}>
      <AppHeader
        title="Frentes de Trabalho"
        subtitle="5 Trechos Monitorados"
        dark
        rightElement={
          <Badge variant="blue" size="sm">
            5 Ativos
          </Badge>
        }
      />

      <div className="flex-1 px-4 py-3 space-y-2 overflow-y-auto">
        <div className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wide">
          Visão Geral por Frente
        </div>

        <div className="space-y-2">
          {trechos.map((t) => {
            const isTarget = t.highlight && isTrecho1Tapped;

            return (
              <div
                key={t.id}
                className={`p-3 rounded-xl border transition-all ${
                  isTarget
                    ? "bg-[#1d2b4f] border-blue-500 ring-2 ring-blue-400/50 shadow-lg scale-[1.02]"
                    : "bg-[#131b2e] border-gray-800"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] font-bold text-white">
                    {t.name}
                  </span>
                  <Badge
                    variant={t.badgeVariant}
                    size="sm"
                    pulse={t.pulse}
                  >
                    {t.badgeText}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-[10px] text-gray-400">
                  <span>{t.info}</span>
                  {t.highlight && (
                    <span className="text-blue-400 font-bold text-[9.5px]">
                      {isTrecho1Tapped ? "Abrindo Detalhes..." : "Toque p/ Ver →"}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Screen>
  );
};
