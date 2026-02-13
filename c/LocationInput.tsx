import React from "react";
import ValidatingInput from "~/c/ValidatingInput";
import { Location } from "~/c/ControlledChart";

interface Props {
  latitude: number;
  longitude: number;
  setLocation: (loc: Location) => void;
}

const parseLatitude = (val: string) => {
  const n = parseFloat(val);
  if (isNaN(n) || n < -90 || n > 90) {
    throw new Error("Latitude must be between -90 and 90");
  }
  return n;
};

const parseLongitude = (val: string) => {
  const n = parseFloat(val);
  if (isNaN(n) || n < -180 || n > 180) {
    throw new Error("Longitude must be between -180 and 180");
  }
  return n;
};

const formatCoord = (val: number) => val.toFixed(4);

const LocationInput: React.FC<Props> = ({ latitude, longitude, setLocation }) => {
  return (
    <div>
      <label>
        Lat{" "}
        <ValidatingInput
          value={latitude}
          setValue={(lat: number) => setLocation({ latitude: lat, longitude })}
          parse={parseLatitude}
          format={formatCoord}
          render={({
            value,
            isError,
            onChange,
            onBlur,
          }: {
            value: string;
            isError: boolean;
            onChange: React.ChangeEventHandler<HTMLInputElement>;
            onBlur: React.ChangeEventHandler<HTMLInputElement>;
          }) => (
            <input
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              style={isError ? { borderColor: "red" } : {}}
              size={10}
            />
          )}
        />
      </label>
      <label>
        {" "}Lon{" "}
        <ValidatingInput
          value={longitude}
          setValue={(lon: number) => setLocation({ latitude, longitude: lon })}
          parse={parseLongitude}
          format={formatCoord}
          render={({
            value,
            isError,
            onChange,
            onBlur,
          }: {
            value: string;
            isError: boolean;
            onChange: React.ChangeEventHandler<HTMLInputElement>;
            onBlur: React.ChangeEventHandler<HTMLInputElement>;
          }) => (
            <input
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              style={isError ? { borderColor: "red" } : {}}
              size={10}
            />
          )}
        />
      </label>
    </div>
  );
};

export default LocationInput;
