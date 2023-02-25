import React from "react";

const Input = ({
  name,
  placeholder,
  value,
  onChange,
  type = "text",
  disabled,
  marginTop,
}) => {
  const style = {
    marginTop,
  };

  return (
    <input
      style={style}
      type={type}
      className='borderedInput'
      onChange={onChange}
      value={value}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

export default Input;
