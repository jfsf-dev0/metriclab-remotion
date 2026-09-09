import React from "react";
import { Screen } from "../../components/Screen";

export const VistoriaSplashScreen: React.FC = () => {
  return (
    <Screen bg="#0f172a" dark={true} hasStatusBar={true}>
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-500/30 mb-4 animate-bounce">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <div className="text-[26px] font-black text-white tracking-tight leading-none mb-1">
          15 & 15
        </div>
        <div className="text-[12px] font-bold text-blue-400 tracking-wide uppercase mb-2">
          Vistoria Cautelar Digital
        </div>
        <p className="text-[10px] text-gray-400 max-w-[200px]">
          Sistema oficial de auditoria estrutural e perícia técnica pré-obra.
        </p>

        <div className="mt-8 flex items-center space-x-1.5 text-[10px] text-gray-500">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
          <span>Carregando aplicação PWA...</span>
        </div>
      </div>
    </Screen>
  );
};
