import React from "react";
import ValidatingInput from "~/c/ValidatingInput";

/*
<ValidatingInput
  parse={parseNumber} format={formatNumber}
  value={number}    setValue={setNumber}
>{
  */

const JsonEditor: React.FC = () => {
  const [json, setJson] = React.useState(null);

  return (
    <div>
      <code>{JSON.stringify(json, null, 2)}</code>
      <ValidatingInput
        value={json}
        setValue={setJson}
        parse={JSON.parse}
        format={(j: any) => JSON.stringify(j, null, 2)}
      >
        {({
          value,
          isError,
          onChange,
          onBlur,
        }: {
          value: string;
          isError: boolean;
          onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
          onBlur: React.ChangeEventHandler<HTMLTextAreaElement>;
        }) => {
          return <textarea value={value} onChange={onChange} onBlur={onBlur} />;
        }}
      </ValidatingInput>
    </div>
  );
};

export default JsonEditor;
