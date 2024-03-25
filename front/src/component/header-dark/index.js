import "./index.css";

import Img from "../img";

import Connection from "./Connection.svg";
import Wifi from "./Wifi.svg";
import buttery from "./buttery.svg";

export default function HeaderDark() {
  const getTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes}`;
  };
  return (
    <div className="header">
      <div className="time-dark">{getTime(new Date())}</div>
      <div className="right-box">
        <Img imageSrc={Connection} />
        <Img imageSrc={Wifi} />
        <Img imageSrc={buttery} />
      </div>
    </div>
  );
}
