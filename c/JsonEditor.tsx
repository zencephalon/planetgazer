import React from "react";
import ValidatingInput from "~/c/ValidatingInput";

/*
<ValidatingInput
  parse={parseNumber} format={formatNumber}
  value={number}    setValue={setNumber}
>{
  */

const JsonEditor: React.FC<Props> = () => {
  const [json, setJson] = React.useState(null);

  return (
    <div>
      <code>{JSON.stringify(json, null, 2)}</code>
      <ValidatingInput
        value={json}
        setValue={setJson}
        parse={JSON.parse}
        format={(j) => JSON.stringify(j, null, 2)}
      >
        {({ value, isError, onChange, onBlur }) => {
          return <textarea value={value} onChange={onChange} onBlur={onBlur} />;
        }}
      </ValidatingInput>
    </div>
  );
};

export default JsonEditor;
