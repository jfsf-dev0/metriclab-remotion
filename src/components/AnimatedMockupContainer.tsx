import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { IPhoneMockup } from "./IPhoneMockup";

interface AnimatedMockupContainerProps {
  children: React.ReactNode;
  entry?: "bottom" | "left" | "right" | "flip" | "none";
  exit?: "top" | "fade" | "none";
  exitStartFrame?: number;
  scale?: number;
}

export const AnimatedMockupContainer: React.FC<AnimatedMockupContainerProps> = ({
  children,
  entry = "bottom",
  exit = "none",
  exitStartFrame = 9999,
  scale = 2.1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring animation (20 frames)
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 120 },
  });

  let translateX = 0;
  let translateY = 0;
  let rotateY = 0;
  let enterOpacity = 1;

  if (entry === "bottom") {
    translateY = interpolate(enterSpring, [0, 1], [120, 0]);
    enterOpacity = interpolate(frame, [0, 20], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  } else if (entry === "left") {
    translateX = interpolate(enterSpring, [0, 1], [-120, 0]);
    enterOpacity = interpolate(frame, [0, 20], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  } else if (entry === "right") {
    translateX = interpolate(enterSpring, [0, 1], [120, 0]);
    enterOpacity = interpolate(frame, [0, 20], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  } else if (entry === "flip") {
    rotateY = interpolate(enterSpring, [0, 1], [90, 0]);
    enterOpacity = interpolate(frame, [0, 15], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }

  // Exit animation (15 frames)
  let exitTranslateY = 0;
  let exitOpacity = 1;

  if (exit !== "none" && frame >= exitStartFrame) {
    const exitProgress = Math.min(1, Math.max(0, (frame - exitStartFrame) / 15));
    if (exit === "top") {
      exitTranslateY = interpolate(exitProgress, [0, 1], [0, -120]);
      exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);
    } else if (exit === "fade") {
      exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);
    }
  }

  const finalOpacity = Math.min(enterOpacity, exitOpacity);
  const finalTranslateY = translateY + exitTranslateY;

  return (
    <div
      style={{
        opacity: finalOpacity,
        transform: `translateX(${translateX}px) translateY(${finalTranslateY}px) rotateY(${rotateY}deg)`,
        transformStyle: "preserve-3d",
      }}
      className="flex items-center justify-center"
    >
      <IPhoneMockup scale={scale}>{children}</IPhoneMockup>
    </div>
  );
};
