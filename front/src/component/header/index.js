import "./index.css";

import Img from "../img";

import Connection from "./Connection.svg";
import Wifi from "./Wifi.svg";
import buttery from "./buttery.svg";

export default function Header() {
  return (
    <div className="header">
      <div className="time">9:01</div>
      <div className="right-box">
        <Img imageSrc={Connection} />
        <Img imageSrc={Wifi} />
        <Img imageSrc={buttery} />
      </div>
    </div>
  );
}
