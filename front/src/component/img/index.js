import "./index.css";

export default function Img({ imageSrc }) {
  return <div>{imageSrc && <img alt="Icon" src={imageSrc} />}</div>;
}
