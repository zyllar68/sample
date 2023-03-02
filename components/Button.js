import classNames from "classnames";

const Button = ({ title, primary, marginTop, width, type = "button" }) => {
  const style = { marginTop, width };
  return (
    <button
      type={type}
      style={style}
      className={classNames("button", {
        "primary-bg-color": primary,
      })}
    >
      {title}
    </button>
  );
};

export default Button;
