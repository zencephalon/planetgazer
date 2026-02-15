import React from "react";

type Mode = "chart" | "transit";

interface Props {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const TabSelector: React.FC<Props> = ({ mode, setMode }) => {
  return (
    <div className="tab-selector">
      <button
        onClick={() => setMode("chart")}
        className={mode === "chart" ? "active" : ""}
      >
        Chart
      </button>
      <button
        onClick={() => setMode("transit")}
        className={mode === "transit" ? "active" : ""}
      >
        Transits
      </button>
    </div>
  );
};

export default TabSelector;
