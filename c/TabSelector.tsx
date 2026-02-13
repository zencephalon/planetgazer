import React from "react";

type Mode = "chart" | "transit";

interface Props {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const TabSelector: React.FC<Props> = ({ mode, setMode }) => {
  return (
    <div style={{ display: "flex", gap: "4px", marginBottom: "8px" }}>
      <button
        onClick={() => setMode("chart")}
        style={{
          fontWeight: mode === "chart" ? "bold" : "normal",
          textDecoration: mode === "chart" ? "underline" : "none",
        }}
      >
        Chart
      </button>
      <button
        onClick={() => setMode("transit")}
        style={{
          fontWeight: mode === "transit" ? "bold" : "normal",
          textDecoration: mode === "transit" ? "underline" : "none",
        }}
      >
        Transits
      </button>
    </div>
  );
};

export default TabSelector;
