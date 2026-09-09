import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

interface OpeningSceneProps {
  title: string;
  subtitle?: string;
  tagline?: string;
}

export const OpeningScene: React.FC<OpeningSceneProps> = ({
  title,
  subtitle = "Sistema Integrado de Engenharia e Gestão",
  tagline = "CONSORCIO LOTE 15",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.6 },
  });

  const scale = interpolate(logoSpring, [0, 1], [0.8, 1]);
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center px-8 z-30">
      <div
        style={{
          transform: `scale(${scale})`,
          opacity,
        }}
        className="flex flex-col items-center"
      >
        {/* MetricLab Brand Mark */}
        <div className="w-24 h-24 rounded-3xl bg-blue-600 flex items-center justify-center shadow-2xl shadow-blue-500/40 mb-6">
          <svg width="54" height="54" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 19V5M12 19V10M20 19V3"
              stroke="white"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <span className="text-[20px] tracking-widest font-black text-blue-700 uppercase mb-2 bg-blue-100/70 px-4 py-1 rounded-full border border-blue-200">
          {tagline}
        </span>

        <h1 className="text-[72px] font-black text-gray-950 tracking-tight leading-none mb-3">
          MetricLab
        </h1>

        <div
          style={{ opacity: subtitleOpacity }}
          className="flex flex-col items-center mt-2"
        >
          <div className="text-[38px] font-extrabold text-blue-600 tracking-tight">
            {title}
          </div>
          <p className="text-[22px] font-medium text-gray-600 mt-2 max-w-[650px] leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};
