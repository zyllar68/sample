import classNames from "classnames";

const Button = ({ title, primary, marginTop, width }) => {
  const style = { marginTop, width };
  return (
    <button
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
