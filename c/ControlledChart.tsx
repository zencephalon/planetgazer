import React from "react";
import Chart from "~/c/Chart";
import DateInput from "~/c/DateInput";
// import JsonEditor from "~/c/JsonEditor";

import { DateTime } from "luxon";

const ControlledChart: React.FC = () => {
  const [dt, setDt] = React.useState(DateTime.now());

  return (
    <>
      {/*<JsonEditor />*/}
      <DateInput dt={dt} setDt={setDt} />
      <Chart dt={dt} />
    </>
  );
};

export default ControlledChart;
