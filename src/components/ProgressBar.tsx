import React from "react";

interface ProgressBarProps {
  progress: number; // 0 to 100
  color?: string;
  label?: string;
  height?: number;
  showPercent?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = "#2563eb",
  label,
  height = 6,
  showPercent = false,
}) => {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full flex flex-col gap-1">
      {(label || showPercent) && (
        <div className="flex justify-between items-center text-[10px] text-gray-500 font-medium">
          {label && <span>{label}</span>}
          {showPercent && <span>{Math.round(clamped)}%</span>}
        </div>
      )}
      <div
        className="w-full bg-gray-200/80 rounded-full overflow-hidden"
        style={{ height: `${height}px` }}
      >
        <div
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{
            width: `${clamped}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
};
