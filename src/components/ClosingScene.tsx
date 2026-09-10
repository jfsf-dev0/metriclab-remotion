import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

interface ClosingSceneProps {
  lines?: string[];
  tagline?: string;
  finalBrand?: string;
}

export const ClosingScene: React.FC<ClosingSceneProps> = ({
  lines,
  tagline,
  finalBrand = "MetricLab",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.6 },
  });

  const scale = interpolate(logoSpring, [0, 1], [0.85, 1]);
  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const allLines = lines || (tagline ? [tagline] : ["Decisão com base em dados de campo."]);

  return (
    <div
      style={{ opacity }}
      className="w-full h-full flex flex-col items-center justify-center text-center px-12 z-30"
    >
      <div
        style={{ transform: `scale(${scale})` }}
        className="flex flex-col items-center"
      >
        {/* MetricLab Brand Icon */}
        <div className="w-24 h-24 rounded-3xl bg-blue-600 flex items-center justify-center shadow-2xl shadow-blue-500/40 mb-8">
          <svg width="54" height="54" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 19V5M12 19V10M20 19V3"
              stroke="white"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h1 className="text-[64px] font-black text-gray-950 tracking-tight leading-none mb-6">
          {finalBrand}
        </h1>

        {/* Bullet Lines / Tagline */}
        <div className="space-y-4 max-w-[800px]">
          {allLines.map((line, index) => {
            const lineOpacity = interpolate(
              frame,
              [5 + index * 8, 15 + index * 8],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }
            );

            return (
              <div
                key={index}
                style={{ opacity: lineOpacity }}
                className="text-[38px] font-extrabold text-blue-900 tracking-tight leading-snug"
              >
                {line}
              </div>
            );
          })}
        </div>

        <div className="mt-12 pt-6 border-t border-gray-300/80 flex items-center space-x-3 text-gray-500 font-bold text-[20px]">
          <span>www.metriclab.com.br</span>
          <span>•</span>
          <span>Consórcio Lote 15</span>
        </div>
      </div>
    </div>
  );
};
