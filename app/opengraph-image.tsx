import { ImageResponse } from "next/og";

export const alt = "DeathGuess — How many died?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "radial-gradient(circle at 75% 20%, #383d18 0, #111316 32%, #090a0c 75%)",
        color: "#f4f2ea",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 970 }}>
        <div style={{ color: "#e8ff47", display: "flex", fontSize: 26, letterSpacing: 8 }}>
          JOGO DE ESTIMATIVAS HISTÓRICAS
        </div>
        <div style={{ display: "flex", fontSize: 112, fontWeight: 900, letterSpacing: -8 }}>
          DEATH<span style={{ color: "#e8ff47" }}>GUESS</span>
        </div>
        <div style={{ color: "#b9bbb5", display: "flex", fontSize: 42 }}>How many died?</div>
      </div>
    </div>,
    size,
  );
}
