import React from "react";

interface IPhoneMockupProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  scale?: number;
}

export const IPhoneMockup: React.FC<IPhoneMockupProps> = ({
  children,
  style,
  scale = 1,
}) => {
  return (
    <div
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "center center",
        position: "relative",
        ...style,
      }}
    >
      {/* Outer Titanium Frame */}
      <div
        style={{
          width: "320px",
          height: "693px",
          background: "linear-gradient(145deg, #3a3a3c 0%, #2c2c2e 50%, #1c1c1e 100%)",
          borderRadius: "54px",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.15), 0 40px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
          padding: "12px",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        {/* Power Button (Right) */}
        <div
          style={{
            width: "3px",
            height: "80px",
            background: "#3a3a3c",
            borderRadius: "2px",
            position: "absolute",
            right: "-4px",
            top: "160px",
          }}
        />

        {/* Mute Button (Left) */}
        <div
          style={{
            width: "3px",
            height: "30px",
            background: "#3a3a3c",
            borderRadius: "2px",
            position: "absolute",
            left: "-4px",
            top: "120px",
          }}
        />

        {/* Volume Up Button (Left) */}
        <div
          style={{
            width: "3px",
            height: "50px",
            background: "#3a3a3c",
            borderRadius: "2px",
            position: "absolute",
            left: "-4px",
            top: "170px",
          }}
        />

        {/* Volume Down Button (Left) */}
        <div
          style={{
            width: "3px",
            height: "50px",
            background: "#3a3a3c",
            borderRadius: "2px",
            position: "absolute",
            left: "-4px",
            top: "235px",
          }}
        />

        {/* Inner Screen */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "44px",
            overflow: "hidden",
            background: "#f9fafb",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Dynamic Island */}
          <div
            style={{
              position: "absolute",
              top: "14px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "120px",
              height: "34px",
              background: "#000000",
              borderRadius: "20px",
              zIndex: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 12px",
            }}
          >
            {/* Camera sensor subtle lens reflection */}
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#0a0d16",
                boxShadow: "inset 0 0 2px #1e293b",
                marginLeft: "auto",
              }}
            />
          </div>

          {/* Children / Rendered Screen */}
          <div className="w-full h-full relative overflow-hidden flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
