import React from "react";
import Chart from "~/c/Chart";
import DateInput from "~/c/DateInput";
import LocationInput from "~/c/LocationInput";

import { DateTime } from "luxon";

export interface Location {
  latitude: number;
  longitude: number;
}

const DEFAULT_LOCATION: Location = {
  latitude: 40.6782,
  longitude: -73.9442,
};

const ControlledChart: React.FC = () => {
  const [dt, setDt] = React.useState(DateTime.now());
  const [location, setLocation] = React.useState<Location>(DEFAULT_LOCATION);

  React.useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {},
      { timeout: 5000 }
    );
  }, []);

  return (
    <>
      <DateInput dt={dt} setDt={setDt} />
      <LocationInput
        latitude={location.latitude}
        longitude={location.longitude}
        setLocation={setLocation}
      />
      <Chart dt={dt} latitude={location.latitude} longitude={location.longitude} />
    </>
  );
};

export default ControlledChart;
