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
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState(0);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const width = Math.round(entries[0].contentRect.width);
      setSize(width);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    if (size > 0) {
      chartDataFromDt(dt, latitude, longitude, natalDt, natalLatitude, natalLongitude);
    }
  }, [dt, latitude, longitude, natalDt, natalLatitude, natalLongitude, size]);

  return (
    <div>
      <div id="chart" ref={containerRef}></div>
    </div>
  );
};

export default CChart;
