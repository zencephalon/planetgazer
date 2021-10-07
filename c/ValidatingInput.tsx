import React from "react";

/*
<ValidatingInput
  parse={parseNumber} format={formatNumber}
  value={number}    setValue={setNumber}
>{
  */

interface Props {
  children: Function;
  parse: Function;
  value: any;
  setValue: Function;
}

const ValidatingInput: React.FC<Props> = ({
  parse,
  format,
  value,
  setValue,
  children,
}) => {
  const [_value, _setValue] = React.useState(value);
  // Maybe we shouldn't assume the input has a valid value to start with?
  const [isError, setIsError] = React.useState(false);

  const onChange = React.useCallback(
    (event) => {
      const val = event.target.value;
      _setValue(val);

      try {
        parse(val);
      } catch (e) {
        setIsError(true);
      }
    },
    [setValue, setIsError, parse]
  );

  const onBlur = React.useCallback(() => {
    console.log("On blur");
    let parsed;
    try {
      parsed = parse(_value);
    } catch {}

    if (!parsed) {
      return;
    }

    const formatted = format(parsed);

    setValue(formatted);
    _setValue(formatted);
  }, [parse, format, _value, setValue, _setValue]);

  return children({ value: _value, isError, onChange, onBlur });
};

export default ValidatingInput;
