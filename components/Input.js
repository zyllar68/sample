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
}) => {
  const style = {
    marginTop,
    width,
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
