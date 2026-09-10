import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { IPhoneMockup } from "./IPhoneMockup";

interface IPhoneEntradaProps {
  direction?: "bottom" | "top" | "left" | "right";
  children?: React.ReactNode;
  scale?: number;
}

export const IPhoneEntrada: React.FC<IPhoneEntradaProps> = ({
  direction = "bottom",
  children,
  scale = 2.1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });

  let translateY = 0;
  let translateX = 0;

  if (direction === "bottom") {
    translateY = interpolate(entrance, [0, 1], [600, 0]);
  } else if (direction === "top") {
    translateY = interpolate(entrance, [0, 1], [-600, 0]);
  } else if (direction === "left") {
    translateX = interpolate(entrance, [0, 1], [-600, 0]);
  } else if (direction === "right") {
    translateX = interpolate(entrance, [0, 1], [600, 0]);
  }

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${translateX}px) translateY(${translateY}px)`,
      }}
      className="w-full h-full flex items-center justify-center"
    >
      <IPhoneMockup scale={scale}>
        {children || (
          <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center text-white px-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 19V5M12 19V10M20 19V3"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="text-[12px] uppercase font-bold tracking-widest text-blue-400">
              MetricLab
            </span>
            <h2 className="text-[18px] font-black mt-1">Consórcio Lote 15</h2>
          </div>
        )}
      </IPhoneMockup>
    </div>
  );
};
