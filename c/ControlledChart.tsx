import React from "react";
import Chart from "~/c/Chart";
import DateInput from "~/c/DateInput";

import { DateTime } from "luxon";

const ControlledChart: React.FC = () => {
  const [dt, setDt] = React.useState(DateTime.now());

  return (
    <>
      <DateInput dt={dt} setDt={setDt} />
      <button
        onClick={() => {
          setDt(dt.plus({ week: 1 }));
        }}
      >
        Press me
      </button>
      <Chart dt={dt} />
    </>
  );
};

export default ControlledChart;
