import "./index.css";
import { useState } from "react";
import { Link } from "react-router-dom";

import back from "./arrow-back.svg";

export default function Back() {
  const [currentPage, setCurrentPage] = useState("/");

  function handleBackButtonClick() {
    setCurrentPage((prevState) => (prevState === "/" ? "/home" : "/"));
  }

  return (
    <div className="back__button" onClick={handleBackButtonClick}>
      <img src={back} alt="back" width="24" height="24" />
    </div>
  );
}
