import React from "react";
import chartDataFromDt from "~/lib/chartDataFromDt";
import { DateTime } from "luxon";

interface Props {
  dt: DateTime;
  latitude: number;
  longitude: number;
}

const CChart: React.FC<Props> = ({ dt, latitude, longitude }) => {
  React.useEffect(() => {
    chartDataFromDt(dt, latitude, longitude);
  }, [dt, latitude, longitude]);

  return (
    <div>
      <div id="chart"></div>
    </div>
  );
};

export default CChart;
