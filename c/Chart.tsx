import React from "react";
import chartDataFromDt from "~/lib/chartDataFromDt";
import { DateTime } from "luxon";

interface Props {
  dt: DateTime;
  latitude: number;
  longitude: number;
  natalDt?: DateTime;
  natalLatitude?: number;
  natalLongitude?: number;
}

const CChart: React.FC<Props> = ({ dt, latitude, longitude, natalDt, natalLatitude, natalLongitude }) => {
  React.useEffect(() => {
    chartDataFromDt(dt, latitude, longitude, natalDt, natalLatitude, natalLongitude);
  }, [dt, latitude, longitude, natalDt, natalLatitude, natalLongitude]);

  return (
    <div>
      <div id="chart"></div>
    </div>
  );
};

export default CChart;
