import React from "react";
import { Screen } from "../../components/Screen";

export const RdoSplashScreen: React.FC = () => {
  return (
    <Screen bg="#090d16" dark={true} hasStatusBar={true}>
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-500/30 mb-4 animate-pulse">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>

        <div className="text-[26px] font-black text-white tracking-tight leading-none mb-1">
          15 & 19
        </div>
        <div className="text-[12px] font-bold text-blue-400 tracking-wide uppercase mb-2">
          RDO Digital • Canteiro de Obras
        </div>
        <p className="text-[10px] text-gray-400 max-w-[210px]">
          Relatório Diário de Obra georreferenciado e integrado ao ERP.
        </p>

        <div className="mt-8 flex items-center space-x-1.5 text-[10px] text-gray-500">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>Sincronizando com Consórcio Lote 15...</span>
        </div>
      </div>
    </Screen>
  );
};
