import React from "react";

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  rightElement?: React.ReactNode;
  bg?: string;
  dark?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  rightElement,
  bg = "bg-white",
  dark = false,
}) => {
  return (
    <div
      className={`w-full px-4 py-3 border-b flex items-center justify-between ${bg} ${
        dark ? "border-gray-800 text-white" : "border-gray-200 text-gray-900"
      }`}
    >
      <div className="flex items-center space-x-2.5 min-w-0">
        {showBack && (
          <button
            type="button"
            className="p-1 -ml-1 text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
        <div className="flex flex-col min-w-0">
          <h1 className="text-[14px] font-bold tracking-tight truncate leading-tight">
            {title}
          </h1>
          {subtitle && (
            <span
              className={`text-[10px] leading-tight truncate ${
                dark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {subtitle}
            </span>
          )}
        </div>
      </div>
      {rightElement && (
        <div className="flex items-center space-x-1.5 flex-shrink-0">
          {rightElement}
        </div>
      )}
    </div>
  );
};
