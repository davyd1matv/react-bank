import "./index.scss";

import { useNavigate } from "react-router-dom";

const BoxInfo = ({ id, sender, time, type, amount, text, notf }) => {
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

  const locateTransaction = (event) => {
    const element = event.currentTarget;
    const transactionId = element.getAttribute("id");
    navigate(`/transaction/${transactionId}`);
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
