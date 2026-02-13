import React from "react";
import Chart from "~/c/Chart";
import DateInput from "~/c/DateInput";
import LocationInput from "~/c/LocationInput";
import TabSelector from "~/c/TabSelector";

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
  const [mode, setMode] = React.useState<"chart" | "transit">("chart");
  const [natalDt, setNatalDt] = React.useState(DateTime.now());
  const [natalLocation, setNatalLocation] = React.useState<Location>(DEFAULT_LOCATION);

  React.useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setLocation(loc);
        setNatalLocation(loc);
      },
      () => {},
      { timeout: 5000 }
    );
  }, []);

  return (
    <>
      <TabSelector mode={mode} setMode={setMode} />
      <DateInput dt={dt} setDt={setDt} />
      <LocationInput
        latitude={location.latitude}
        longitude={location.longitude}
        setLocation={setLocation}
      />
      {mode === "transit" && (
        <div style={{ marginTop: "8px", padding: "8px", border: "1px solid #ccc" }}>
          <div style={{ marginBottom: "4px", fontSize: "0.9em", color: "#666" }}>
            Birth data
          </div>
          <DateInput dt={natalDt} setDt={setNatalDt} />
          <LocationInput
            latitude={natalLocation.latitude}
            longitude={natalLocation.longitude}
            setLocation={setNatalLocation}
          />
        </div>
      )}
      <Chart
        dt={dt}
        latitude={location.latitude}
        longitude={location.longitude}
        {...(mode === "transit"
          ? {
              natalDt,
              natalLatitude: natalLocation.latitude,
              natalLongitude: natalLocation.longitude,
            }
          : {})}
      />
    </>
  );
};

export default ControlledChart;
