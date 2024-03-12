import "./index.css";

export default function Button({
  children,
  pink,
  style,
  condition,
  onClick,
  type,
}) {
  return (
    <button
      type={type}
      style={style}
      className={`button ${pink ? "button-pink" : "button-white"}
	 
	  `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
