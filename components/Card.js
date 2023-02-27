import classnames from "classnames";

const Card = ({ primary, peach }) => {
  return (
    <div
      className={classnames("card", {
        "primary-bg-color": primary,
        "peach-bg": peach,
      })}
    >
      <h4>P 5000,000.00</h4>
      <p>Total Collection</p>
    </div>
  );
};

export default Card;
