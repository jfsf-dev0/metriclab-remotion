import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Screen } from "../../components/Screen";
import { WhatsAppBubble } from "../../components/WhatsAppBubble";

export const WhatsAppNotificationScreen: React.FC = () => {
  const frame = useCurrentFrame();

  // Simulated finger tap on the link at frame 60
  const fingerOpacity = interpolate(frame, [45, 55, 70, 80], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fingerScale = interpolate(frame, [50, 60, 70], [1.2, 0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Screen bg="#efeae2" hasStatusBar={true}>
      {/* WhatsApp Header */}
      <div className="w-full bg-[#075e54] text-white px-3 py-2.5 flex items-center justify-between shadow-sm z-20">
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs text-white">
            ML
          </div>
          <div>
            <div className="text-[12px] font-bold">MetricLab Sistema</div>
            <div className="text-[9px] text-emerald-200">Notificações Automáticas</div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-2 py-4 flex flex-col justify-start relative">
        <WhatsAppBubble
          side="left"
          delay={10}
          senderName="MetricLab Notificações"
          message={
            <div className="space-y-1.5 py-0.5">
              <div className="font-bold text-emerald-700 text-[12.5px] flex items-center space-x-1">
                <span>🟢 Trecho Liberado para Vistoria</span>
              </div>
              <div className="text-[11.5px] font-semibold text-gray-800">
                Trecho 01 — Acesso Norte
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded px-2 py-1 text-[11px] font-mono font-bold text-amber-900 inline-block">
                🔑 Sua chave: 590770
              </div>
              <div className="text-[11px] text-blue-600 underline font-medium pt-1">
                https://vistoria.metriclab.com.br
              </div>
            </div>
          }
          time="09:20"
        />

        {/* Simulated Finger Pointer Tap */}
        <div
          className="absolute z-50 pointer-events-none"
          style={{
            top: "140px",
            left: "140px",
            opacity: fingerOpacity,
            transform: `scale(${fingerScale})`,
          }}
        >
          <div className="w-9 h-9 rounded-full bg-blue-500/40 border-2 border-white flex items-center justify-center shadow-lg">
            <div className="w-4 h-4 rounded-full bg-blue-600" />
          </div>
        </div>
      </div>
    </Screen>
  );
};
