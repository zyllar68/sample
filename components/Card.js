import classnames from "classnames";

const Card = ({ bgColor, numberTitle, bottomTitle, minWidth, width }) => {
  const style = { width };
  return (
    <div
      className={classnames("card", {
        "primary-bg-color": bgColor === "primary",
        "peach-bg": bgColor === "peach",
        "light-black-bg": bgColor === "light-black",
      })}
      style={style}
    >
      <h4>P {numberTitle}</h4>
      <p>{bottomTitle}</p>
    </div>
  );
};

export default Card;
