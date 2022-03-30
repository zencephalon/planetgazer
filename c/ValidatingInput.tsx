import React from "react";

/*
<ValidatingInput
  parse={parseNumber} format={formatNumber}
  value={number}    setValue={setNumber}
>{
  */

interface Props {
  children: (arg: any) => any;
  parse: Function;
  format: Function;
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

  React.useEffect(() => {
    _setValue(format(value));
  }, [value, format]);
  // Maybe we shouldn't assume the input has a valid value to start with?
  const [isError, setIsError] = React.useState(false);

  const onChange = React.useCallback(
    (event) => {
      const val = event.target.value;
      _setValue(val);

      try {
        parse(val);
        setIsError(false);
      } catch (e) {
        setIsError(true);
      }
    },
    [setIsError, parse]
  );

  const onBlur = React.useCallback(() => {
    let parsed;
    try {
      parsed = parse(_value);
    } catch {}

    if (!parsed) {
      return;
    }

    setValue(parsed);
  }, [parse, _value, setValue]);

  return children({ value: _value, isError, onChange, onBlur });
};

export default ValidatingInput;
