import React from "react";

const Input = ({
  name,
  placeholder,
  value,
  onChange,
  type = "text",
  disabled,
}) => {
  return (
    <input
      type={type}
      className=''
      onChange={onChange}
      value={value}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

export default Input;
