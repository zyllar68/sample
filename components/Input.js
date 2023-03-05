import React from "react";

const Input = ({
  name,
  placeholder,
  value,
  onChange,
  type = "text",
  disabled,
  marginTop,
  width,
  onInput,
  defaultValue,
}) => {
  const style = {
    marginTop,
    width,
  };

  return (
    <input
      onInput={onInput}
      type={type}
      className='borderedInput'
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

export default Input;
