import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface VideoBackgroundProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  children,
  title,
  subtitle,
  showLogo = true,
}) => {
  const frame = useCurrentFrame();

  // Subtle animated ambient gradient glow
  const glowX = interpolate(Math.sin(frame / 60), [-1, 1], [20, 80]);
  const glowY = interpolate(Math.cos(frame / 60), [-1, 1], [20, 70]);

  return (
    <div
      className="w-full h-full relative overflow-hidden flex flex-col items-center select-none font-sans"
      style={{
        width: 1080,
        height: 1920,
        background: "linear-gradient(135deg, #f0f4ff 0%, #f9fafb 50%, #f0fdf4 100%)",
      }}
    >
      {/* Ambient background glows */}
      <div
        className="absolute rounded-full pointer-events-none filter blur-[120px] opacity-40"
        style={{
          width: "600px",
          height: "600px",
          background: "#3b82f6",
          left: `${glowX}%`,
          top: `${glowY}%`,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none filter blur-[140px] opacity-30"
        style={{
          width: "500px",
          height: "500px",
          background: "#10b981",
          left: "20%",
          bottom: "10%",
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top Header Bar with MetricLab branding */}
      {showLogo && (
        <div className="w-full pt-16 pb-6 px-16 flex flex-col items-center justify-center z-30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 19V5M12 19V10M20 19V3"
                  stroke="white"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span
              style={{
                color: "#2563eb",
                fontSize: "36px",
                fontWeight: 900,
                letterSpacing: "-1px",
              }}
            >
              MetricLab
            </span>
          </div>

          {(title || subtitle) && (
            <div className="text-center mt-2">
              {title && (
                <h2 className="text-[28px] font-extrabold text-gray-900 tracking-tight">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-[18px] font-medium text-gray-500 mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Video Content Canvas (e.g. Mockup or Fullscreen scenes) */}
      <div className="flex-1 w-full flex items-center justify-center relative z-20 pb-12">
        {children}
      </div>
    </div>
  );
};
