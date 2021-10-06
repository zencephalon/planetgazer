import React from "react";
import chartDataFromDt from "~/lib/chartDataFromDt";
import { DateTime } from "luxon";

const CChart: React.FC = (props) => {
  React.useEffect(() => {
    const dt = DateTime.now();
    chartDataFromDt(dt);
  });

  return (
    <div>
      <div id="chart"></div>
    </div>
  );
};

export default CChart;
