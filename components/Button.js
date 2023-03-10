import classNames from "classnames";
import Spinner from "react-bootstrap/Spinner";

const Button = ({
  onClick,
  title,
  primary,
  marginTop,
  width,
  type = "button",
  onLoading,
}) => {
  const style = { marginTop, width };
  return (
    <button
      onClick={onClick}
      type={type}
      style={style}
      className={classNames("button", {
        "primary-bg-color": primary,
      })}
      disabled={onLoading}
    >
      {/* <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner> */}
      {onLoading ? (
        <Spinner
          animation='border'
          role='status'
          style={{ height: "1rem", width: "1rem" }}
        >
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      ) : (
        title
      )}
    </button>
  );
};

export default Button;
