import React from "react";

export type BadgeVariant = "blue" | "green" | "red" | "amber" | "gray";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  pulse?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "blue",
  pulse = false,
  size = "md",
  className = "",
}) => {
  const styles: Record<BadgeVariant, { bg: string; text: string; dot: string; border: string }> = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      dot: "bg-blue-600",
      border: "border-blue-200",
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-700",
      dot: "bg-green-600",
      border: "border-green-200",
    },
    red: {
      bg: "bg-red-50",
      text: "text-red-700",
      dot: "bg-red-600",
      border: "border-red-200",
    },
    amber: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      dot: "bg-amber-600",
      border: "border-amber-200",
    },
    gray: {
      bg: "bg-gray-100",
      text: "text-gray-700",
      dot: "bg-gray-500",
      border: "border-gray-200",
    },
  };

  const current = styles[variant];
  const sizeClasses = size === "sm" ? "px-1.5 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border ${current.bg} ${current.text} ${current.border} ${sizeClasses} ${className}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${current.dot}`}
          />
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${current.dot}`}
          />
        </span>
      )}
      {children}
    </span>
  );
};
