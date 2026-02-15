import React from "react";
import ValidatingInput from "~/c/ValidatingInput";
import { DateTime } from "luxon";
import * as chrono from "chrono-node";

interface Props {
  dt: DateTime;
  setDt: Function;
}

const DateInput: React.FC<Props> = ({ dt, setDt }) => {
  return (
    <div className="date-input-row">
      <button onClick={() => setDt(dt.minus({ year: 1 }))}>&#171;Y</button>
      <button onClick={() => setDt(dt.minus({ month: 1 }))}>&#8249;M</button>
      <button onClick={() => setDt(dt.minus({ day: 1 }))}>&#8249;D</button>
      <button onClick={() => setDt(dt.minus({ hour: 1 }))}>&#8249;H</button>
      <ValidatingInput
        value={dt}
        setValue={(date: Date) => {
          const dt = DateTime.fromJSDate(date);
          setDt(dt);
        }}
        parse={(val: string) => {
          return chrono.parseDate(val);
        }}
        format={(val: DateTime) => {
          return val.toLocaleString(DateTime.DATETIME_MED);
        }}
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
            className={isError ? "error" : ""}
          />
        )}
      />
      <button onClick={() => setDt(dt.plus({ hour: 1 }))}>H&#8250;</button>
      <button onClick={() => setDt(dt.plus({ day: 1 }))}>D&#8250;</button>
      <button onClick={() => setDt(dt.plus({ month: 1 }))}>M&#8250;</button>
      <button onClick={() => setDt(dt.plus({ year: 1 }))}>Y&#187;</button>
    </div>
  );
};

export default DateInput;
