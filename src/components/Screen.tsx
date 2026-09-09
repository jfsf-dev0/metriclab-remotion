import React from "react";
import { StatusBar } from "./StatusBar";

interface ScreenProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  dark?: boolean;
  hasStatusBar?: boolean;
  bg?: string;
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  className = "",
  style,
  dark = false,
  hasStatusBar = true,
  bg = "#f9fafb",
}) => {
  return (
    <div
      className={`w-full h-full flex flex-col relative overflow-hidden select-none ${className}`}
      style={{
        backgroundColor: bg,
        ...style,
      }}
    >
      {hasStatusBar && <StatusBar dark={dark} />}

      {/* Main Screen Body, accounting for Dynamic Island padding */}
      <div className="flex-1 w-full flex flex-col relative overflow-hidden pt-4">
        {children}
      </div>

      {/* Home Indicator Bar */}
      <div className="w-full flex justify-center pb-2 pt-1 pointer-events-none">
        <div
          className={`w-28 h-1 rounded-full ${
            dark ? "bg-white/40" : "bg-gray-400/50"
          }`}
        />
      </div>
    </div>
  );
};
