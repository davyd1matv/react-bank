import React from "react";
import "./index.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../App";
import axios from "axios";

const BoxInfo = ({ id, sender, time, type, amount, text, notf }) => {
  const [data, setData] = useState(null);
  const { stateAuth } = useAuth();
  const navigate = useNavigate();

  const getDate = (time) => {
    let hours = time.getHours();
    let minutes = time.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes}`;
  };

  const getDateDifferent = (time) => {
    const currentTime = new Date();
    const timeCreate = new Date(time);
    const timeAge = Math.floor((currentTime - timeCreate) / 1000);

    if (timeAge <= 10) {
      return "Now";
    } else if (timeAge < 60) {
      return `${timeAge} seconds ago`;
    } else {
      const timeAgeMin = Math.floor(timeAge / 60, 0);
      return `${timeAgeMin} minutes ago`;
    }
  };

  const getImageSource = (sender) => {
    if (sender === "Stripe") {
      return "/svg/stripe.svg";
    } else if (sender === "Coin") {
      return "/svg/coin.svg";
    } else {
      return "/svg/person.svg";
    }
  };

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get("/balance", {
  //           params: {
  //             token: stateAuth.token,
  //           },
  //         });

  //         // const response = await fetch("http://localhost:4000/balance", {
  //         //   method: "POST",
  //         //   body: JSON.stringify({
  //         //     token: stateAuth.token,
  //         //   }),
  //         // });

  //         // if (response.ok) {
  //         //   const data = await response.json();
  //         //   setData(data);
  //         //   stateAuth.user.isConfirm = true;
  //         // } else {
  //         //   console.error(`Error fetching balance data: ${response.statusText}`);
  //         // }

  //         setData(response.data);
  //         stateAuth.user.isConfirm = true;
  //       } catch (error) {
  //         console.error("Error fetching balance data:", error);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  //   useEffect(() => {
  //     let cardElements = document.querySelectorAll(".card-transaction");

  //     cardElements.forEach((el) => {
  //       let transactionTypeElement = el.querySelector(".card-transaction__type");
  //       let cardAmountElement = el.querySelector(".card-transaction__amount");

  //       let transactionType = transactionTypeElement.textContent;

  //       if (transactionType === "Receipt") {
  //         cardAmountElement.classList.add("card-transaction__amount-plus");
  //         cardAmountElement.classList.remove("card-transaction__amount-minus");
  //       } else {
  //         cardAmountElement.classList.add("card-transaction__amount-minus");
  //         cardAmountElement.classList.remove("card-transaction__amount-plus");
  //       }
  //     });
  //   }, []);

  const locateTransaction = (event) => {
    const element = event.currentTarget;
    const transactionId = element.getAttribute("id");
    navigate(`/transaction/${transactionId}`);

    // if (stateAuth.token) {
    //   const transactionId = element.getAttribute("id");
    //   //   navigate(
    //   //     `/transaction?token=${stateAuth.token}&transactionId=${transactionId}`
    //   // 	);
    //   navigate(`/transaction?transactionId=${transactionId}`);
    //   //   navigate(`/transaction/${transactionId}`);
    //   //   navigate(`/transaction`);
    // } else {
    //   navigate("/transaction");
    // }
  };

  return (
    <>
      {notf ? (
        <div className="box-card">
          <div className="box-info ">
            <img
              src={
                type === "Warning"
                  ? "/svg/warning.svg"
                  : "/svg/announcement.svg"
              }
              alt=""
              width="40"
              height="40"
            />

            <div className="box-info__info">
              <div className="box-info__title">{text}</div>
              <div className="box-info__details">
                {/* {convertTimeDifference(time)} */}
                <>{getDateDifferent(time)}</>

                <div className="box-info__type">{type}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="box-info box-info__click"
          onClick={locateTransaction}
          id={id}
        >
          <img src={getImageSource(sender)} alt="" width="48" height="48" />
          <div className="box-info__info">
            <div className="box-info__title">{sender}</div>
            <div className="box-info__details">
              {/* {convertTime(new Date(time))} */}
              {getDate(new Date(time))}

              <div className="box-info__type">{type}</div>
            </div>
          </div>

          <div className="box-info__amount-box">
            <div
              className={`box-info__amount ${
                type === "Receipt"
                  ? "box-info__amount-plus"
                  : "box-info__amount-minus"
              }`}
            >
              {amount}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BoxInfo;
