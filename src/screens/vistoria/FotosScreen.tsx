import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Screen } from "../../components/Screen";
import { AppHeader } from "../../components/AppHeader";
import { Badge } from "../../components/Badge";

export const VistoriaFotosScreen: React.FC = () => {
  const frame = useCurrentFrame();

  const shutterFlash = interpolate(frame, [25, 27, 35], [0, 0.9, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const hasPhoto1 = frame > 30;
  const hasPhoto2 = frame > 65;

  return (
    <Screen bg="#0f172a" dark={true}>
      <AppHeader
        title="Passo 3: Registro Fotográfico"
        subtitle="Evidências de Fachada e Paredes"
        dark
        rightElement={
          <Badge variant="blue" size="sm">
            2/4 Fotos
          </Badge>
        }
      />

      <div className="flex-1 px-4 py-3 flex flex-col justify-between overflow-hidden relative">
        {/* Shutter White Flash Effect */}
        <div
          className="absolute inset-0 bg-white pointer-events-none z-40"
          style={{ opacity: shutterFlash }}
        />

        {/* Viewfinder simulation */}
        <div className="w-full aspect-[4/3] bg-gray-900 rounded-xl border-2 border-dashed border-gray-700 relative overflow-hidden flex items-center justify-center">
          {/* Mock House photo view */}
          <div
            className="w-full h-full bg-cover bg-center flex flex-col justify-between p-2.5"
            style={{
              background:
                "linear-gradient(180deg, rgba(30,58,138,0.4) 0%, rgba(15,23,42,0.8) 100%), #1e293b",
            }}
          >
            {/* Viewfinder crosshairs */}
            <div className="flex justify-between text-yellow-400/70 text-xs">
              <span>┌</span>
              <span>┐</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-full border-2 border-yellow-400/80 flex items-center justify-center text-yellow-300 font-mono text-[9px] mb-1">
                AI FOCUS
              </div>
              <span className="text-[10px] text-gray-300 font-medium">
                Enquadramento Conforme • GPS Ativo
              </span>
            </div>
            <div className="flex justify-between text-yellow-400/70 text-xs">
              <span>└</span>
              <span>┘</span>
            </div>
          </div>
        </div>

        {/* Captured Gallery Grid */}
        <div className="space-y-1.5">
          <div className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wider">
            Evidências Salvas no PWA
          </div>
          <div className="grid grid-cols-3 gap-2">
            {/* Slot 1 */}
            <div className="aspect-square rounded-lg bg-gray-800 border border-gray-700 overflow-hidden relative flex items-center justify-center">
              {hasPhoto1 ? (
                <div className="w-full h-full bg-blue-900/60 p-1 flex flex-col justify-between">
                  <span className="text-[8px] font-bold text-emerald-400">✓ Fachada</span>
                  <span className="text-[8px] text-gray-300">10:22:15</span>
                </div>
              ) : (
                <span className="text-gray-500 text-xs">📷</span>
              )}
            </div>

            {/* Slot 2 */}
            <div className="aspect-square rounded-lg bg-gray-800 border border-gray-700 overflow-hidden relative flex items-center justify-center">
              {hasPhoto2 ? (
                <div className="w-full h-full bg-emerald-900/60 p-1 flex flex-col justify-between">
                  <span className="text-[8px] font-bold text-emerald-400">✓ Muro Ext.</span>
                  <span className="text-[8px] text-gray-300">10:22:42</span>
                </div>
              ) : (
                <span className="text-gray-500 text-xs">📷</span>
              )}
            </div>

            {/* Slot 3: Empty */}
            <div className="aspect-square rounded-lg bg-gray-900/50 border border-dashed border-gray-700 flex items-center justify-center text-gray-600 text-xs">
              + Mais
            </div>
          </div>
        </div>

        {/* Camera Shutter Button */}
        <div className="flex items-center justify-center py-1">
          <div className="w-14 h-14 rounded-full border-4 border-white flex items-center justify-center cursor-pointer shadow-lg shadow-white/10">
            <div className="w-10 h-10 rounded-full bg-blue-500 active:scale-95 transition-transform" />
          </div>
        </div>
      </div>
    </Screen>
  );
};
