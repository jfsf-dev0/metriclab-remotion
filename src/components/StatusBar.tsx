import React from "react";

interface StatusBarProps {
  dark?: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({ dark = false }) => {
  const textColor = dark ? "text-white" : "text-gray-900";
  const fillColor = dark ? "#ffffff" : "#111827";

  return (
    <div
      className={`w-full flex items-center justify-between px-6 pt-3 pb-1 select-none z-30 ${textColor}`}
      style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "-0.2px" }}
    >
      {/* Time */}
      <span className="font-semibold tracking-tight">9:20</span>

      {/* Right Icons: Signal + WiFi */}
      <div className="flex items-center space-x-1.5">
        {/* Cellular bars */}
        <svg width="14" height="10" viewBox="0 0 17 11" fill="none">
          <rect x="0" y="8" width="2.5" height="3" rx="0.5" fill={fillColor} />
          <rect x="4.5" y="5.5" width="2.5" height="5.5" rx="0.5" fill={fillColor} />
          <rect x="9" y="3" width="2.5" height="8" rx="0.5" fill={fillColor} />
          <rect x="13.5" y="0.5" width="2.5" height="10.5" rx="0.5" fill={fillColor} />
        </svg>

        {/* Wi-Fi */}
        <svg width="13" height="10" viewBox="0 0 16 12" fill={fillColor}>
          <path d="M8 9.6a1.6 1.6 0 100 3.2 1.6 1.6 0 000-3.2zm-4.35-3.15a6.15 6.15 0 018.7 0 .8.8 0 001.13-1.13 7.75 7.75 0 00-10.96 0 .8.8 0 001.13 1.13zm-2.26-2.26a9.35 9.35 0 0113.22 0 .8.8 0 001.13-1.13 10.95 10.95 0 00-15.48 0 .8.8 0 101.13 1.13z" />
        </svg>

        {/* Battery Outline without real percentage */}
        <div className="flex items-center">
          <div
            className="w-5 h-2.5 rounded-[3px] border border-current p-0.5 flex items-center"
            style={{ opacity: 0.9 }}
          >
            <div className="h-full w-3 bg-current rounded-[1px]" />
          </div>
          <div className="w-0.5 h-1 bg-current rounded-r-sm opacity-90" />
        </div>
      </div>
    </div>
  );
};
