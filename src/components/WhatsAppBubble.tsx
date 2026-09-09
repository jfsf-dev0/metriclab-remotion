import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export interface WhatsAppBubbleProps {
  message: string | React.ReactNode;
  side: "left" | "right";
  delay?: number;
  time?: string;
  senderName?: string;
  avatar?: string;
  statusIcon?: "sent" | "delivered" | "read";
  isDocument?: boolean;
  documentName?: string;
}

export const WhatsAppBubble: React.FC<WhatsAppBubbleProps> = ({
  message,
  side,
  delay = 0,
  time = "09:21",
  senderName,
  avatar,
  statusIcon = "read",
  isDocument = false,
  documentName = "documento.pdf",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animate slide + fade based on delay
  const adjustedFrame = Math.max(0, frame - delay);
  const enterSpring = spring({
    frame: adjustedFrame,
    fps,
    config: {
      damping: 14,
      mass: 0.6,
      stiffness: 120,
    },
  });

  const opacity = interpolate(adjustedFrame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(enterSpring, [0, 1], [18, 0]);

  if (frame < delay) {
    return null;
  }

  const isRight = side === "right";

  return (
    <div
      className={`w-full flex mb-2.5 px-3 items-end ${
        isRight ? "justify-end" : "justify-start"
      }`}
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      {/* Optional Left Avatar */}
      {!isRight && avatar && (
        <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold mr-1.5 flex-shrink-0 shadow-sm">
          {avatar}
        </div>
      )}

      {/* Bubble Container */}
      <div
        style={{
          maxWidth: "82%",
          backgroundColor: isRight ? "#dcf8c6" : "#ffffff",
          borderRadius: isRight
            ? "12px 2px 12px 12px"
            : "2px 12px 12px 12px",
          boxShadow: "0 1px 1.5px rgba(0,0,0,0.12)",
          padding: "6px 9px 4px 9px",
        }}
        className="flex flex-col text-[#111827] text-[12px] leading-[1.35] relative"
      >
        {/* Sender Name if on left in group or bot */}
        {!isRight && senderName && (
          <span className="text-[10px] font-bold text-blue-600 mb-0.5 tracking-tight">
            {senderName}
          </span>
        )}

        {/* Document attachment style */}
        {isDocument ? (
          <div className="flex items-center space-x-2 bg-black/5 p-2 rounded-lg my-0.5 border border-black/5">
            <div className="w-7 h-8 bg-red-500 rounded flex items-center justify-center text-white font-bold text-[9px] shadow-sm">
              PDF
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[11px] truncate text-gray-900">
                {documentName}
              </div>
              <div className="text-[9px] text-gray-500">1 página • 245 KB</div>
            </div>
          </div>
        ) : typeof message === "string" ? (
          <span className="whitespace-pre-line break-words font-normal">
            {message}
          </span>
        ) : (
          message
        )}

        {/* Footer: Time + Read Receipts */}
        <div className="flex items-center justify-end space-x-1 mt-0.5 self-end">
          <span className="text-[9px] text-gray-500 font-normal">{time}</span>
          {isRight && (
            <svg
              className="w-3.5 h-3 text-[#34B7F1]"
              viewBox="0 0 16 11"
              fill="currentColor"
            >
              <path d="M11.07 0.93a.75.75 0 0 0-1.06 0L5.3 5.64l-2.01-2a.75.75 0 0 0-1.06 1.06l2.54 2.53a.75.75 0 0 0 1.06 0l5.24-5.24a.75.75 0 0 0 0-1.06z" />
              <path d="M15.07 0.93a.75.75 0 0 0-1.06 0L9.3 5.64l-.94-.94a.75.75 0 1 0-1.06 1.06l1.47 1.47a.75.75 0 0 0 1.06 0l5.24-5.24a.75.75 0 0 0 0-1.06z" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};
