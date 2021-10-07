import React from "react";
import chartDataFromDt from "~/lib/chartDataFromDt";
import { DateTime } from "luxon";

const CChart: React.FC = ({ dt }) => {
  React.useEffect(() => {
    chartDataFromDt(dt);
  }, [dt]);

  return (
    <div>
      <div id="chart"></div>
    </div>
  );
};

export default CChart;
