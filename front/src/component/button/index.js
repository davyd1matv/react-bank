import "./index.scss";

export default function Button({
  children,
  pink,
  red,
  style,
  onClick,
  type,
  disabled,
}) {
  return (
    <button
      type={type}
      style={style}
      className={`button ${pink ? "button--pink" : ""} ${
        red ? "button--red" : ""
      }
	  ${disabled ? "button--disabled" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
