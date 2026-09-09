import React from "react";
import { Screen } from "../../components/Screen";
import { WhatsAppBubble } from "../../components/WhatsAppBubble";

export const WhatsAppScreen: React.FC = () => {
  return (
    <Screen bg="#efeae2" hasStatusBar={true}>
      {/* WhatsApp Chat Top Header */}
      <div className="w-full bg-[#075e54] text-white px-3 py-2.5 flex items-center justify-between shadow-sm z-20">
        <div className="flex items-center space-x-2">
          {/* Back arrow */}
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>

          {/* Avatar */}
          <div className="w-7 h-7 rounded-full bg-emerald-700 border border-white/40 flex items-center justify-center font-bold text-xs">
            🤖
          </div>

          <div className="flex flex-col">
            <div className="text-[12px] font-bold leading-tight flex items-center space-x-1">
              <span>Jota IA</span>
              <span className="text-[9px] bg-emerald-800/80 px-1 rounded text-emerald-200">
                MetricLab
              </span>
            </div>
            <span className="text-[9px] text-emerald-100/90 leading-tight">
              online
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-white/90">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </div>
      </div>

      {/* Date badge */}
      <div className="w-full flex justify-center py-2">
        <span className="bg-white/80 text-gray-600 text-[9px] px-2 py-0.5 rounded-md shadow-xs uppercase font-medium">
          Hoje
        </span>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 px-1 overflow-y-auto flex flex-col justify-start">
        <WhatsAppBubble
          side="left"
          delay={15}
          message="Olá João! Sou o Jota, assistente da MetricLab. Vamos iniciar o envio de documentos para sua contratação no Consórcio Lote 15?"
          time="09:21"
          avatar="J"
        />

        <WhatsAppBubble
          side="right"
          delay={60}
          message="Tudo bem!"
          time="09:22"
        />

        <WhatsAppBubble
          side="left"
          delay={95}
          message="Perfeito. Pode enviar uma foto ou PDF do seu RG frente e verso?"
          time="09:22"
          avatar="J"
        />

        <WhatsAppBubble
          side="right"
          delay={135}
          isDocument={true}
          documentName="RG_Joao_Silva.pdf"
          message=""
          time="09:23"
        />

        <WhatsAppBubble
          side="left"
          delay={175}
          message="✅ Documento recebido com sucesso! IA validando dados e biometria..."
          time="09:23"
          avatar="J"
        />
      </div>

      {/* Fake Chat Input Bar */}
      <div className="p-2 bg-[#f0f2f5] border-t border-gray-200 flex items-center space-x-2">
        <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-[11px] text-gray-400 border border-gray-200 flex items-center justify-between">
          <span>Mensagem</span>
          <span className="text-gray-400">📎</span>
        </div>
        <div className="w-7 h-7 rounded-full bg-[#00a884] text-white flex items-center justify-center text-xs shadow-sm">
          🎙️
        </div>
      </div>
    </Screen>
  );
};
