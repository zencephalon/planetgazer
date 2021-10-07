import React from "react";
import ValidatingInput from "~/c/ValidatingInput";
import { DateTime } from "luxon";
import * as chrono from "chrono-node";

interface Props {
  dt: DateTime;
  setDt: Function;
}

const DateInput: React.FC = ({ dt, setDt }) => {
  return (
    <ValidatingInput
      value={dt.toJSDate().toLocaleString()}
      setValue={(date) => {
        const dt = DateTime.fromJSDate(date);
        setDt(dt);
      }}
      parse={(val) => {
        return chrono.parseDate(val);
      }}
      format={(val) => val.toLocaleString()}
    >
      {({ value, isError, onChange, onBlur }) => (
        <input value={value} onChange={onChange} onBlur={onBlur} />
      )}
    </ValidatingInput>
  );
};

export default DateInput;
