import React from "react";
import Chart from "~/c/Chart";
import DateInput from "~/c/DateInput";
// import JsonEditor from "~/c/JsonEditor";

import { DateTime } from "luxon";

interface Location {
  latitude: number;
  longitude: number;
}

const DEFAULT_LOCATION: Location = {
  latitude: 40.0,
  longitude: -70.0,
};

const ControlledChart: React.FC = () => {
  const [dt, setDt] = React.useState(DateTime.now());
  const [location, setLocation] = React.useState<Location | null>(null);

  React.useEffect(() => {
    if (!navigator.geolocation) {
      setLocation(DEFAULT_LOCATION);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        setLocation(DEFAULT_LOCATION);
      }
    );
  }, []);

  if (!location) {
    return <div>Requesting location access...</div>;
  }

  return (
    <>
      {/*<JsonEditor />*/}
      <DateInput dt={dt} setDt={setDt} />
      <Chart dt={dt} latitude={location.latitude} longitude={location.longitude} />
    </>
  );
};

export default ControlledChart;
