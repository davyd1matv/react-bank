import "./index.css";

export default function SignTitle({ title, info }) {
  return (
    <div className="sign__box">
      <h1 className="sign__title">{title}</h1>
      <p className="sign__text">{info}</p>
    </div>
  );
}
