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
    <div>
      <button onClick={() => setDt(dt.minus({ year: 1 }))}>Year</button>
      <button onClick={() => setDt(dt.minus({ month: 1 }))}>Month</button>
      <button onClick={() => setDt(dt.minus({ day: 1 }))}>Day</button>
      <button onClick={() => setDt(dt.minus({ hour: 1 }))}>Hour</button>
      <ValidatingInput
        value={dt}
        setValue={(date) => {
          const dt = DateTime.fromJSDate(date);
          setDt(dt);
        }}
        parse={(val) => {
          return chrono.parseDate(val);
        }}
        format={(val) => {
          console.log(DateTime.DATETIME_MED);
          return val.toLocaleString(DateTime.DATETIME_MED);
        }}
      >
        {({ value, isError, onChange, onBlur }) => (
          <input value={value} onChange={onChange} onBlur={onBlur} />
        )}
      </ValidatingInput>
      <button onClick={() => setDt(dt.plus({ hour: 1 }))}>Hour</button>
      <button onClick={() => setDt(dt.plus({ day: 1 }))}>Day</button>
      <button onClick={() => setDt(dt.plus({ month: 1 }))}>Month</button>
      <button onClick={() => setDt(dt.plus({ year: 1 }))}>Year</button>
    </div>
  );
};

export default DateInput;
