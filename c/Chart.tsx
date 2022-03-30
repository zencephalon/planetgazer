import React from "react";
import chartDataFromDt from "~/lib/chartDataFromDt";
import { DateTime } from "luxon";

interface Props {
  dt: DateTime;
}

const CChart: React.FC<Props> = ({ dt }) => {
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
