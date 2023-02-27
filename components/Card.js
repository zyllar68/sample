import classnames from "classnames";

const Card = ({ bgColor }) => {
  return (
    <div
      className={classnames("card", {
        "primary-bg-color": bgColor === "primary",
        "peach-bg": bgColor === "peach",
        "light-black-bg": bgColor === "light-black",
      })}
    >
      <h4>P 5000,000.00</h4>
      <p>Total Collection</p>
    </div>
  );
};

export default Card;
