import BackButton from "../../component/back-button";
import BoxNumber from "../../component/boxNumber";
import Divider from "../../component/divider";
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { saveSession } from "../../script/session";
// import { useAuth } from "../../context/AuthContext";
// import { validateAmount } from "../../script/utilities";
import "./index.scss";
import Page from "../../page/Page";
import AuthBox from "../../component/authBox";
import HeaderDark from "../../component/header-dark";

const Receive = ({
  value,
  onChange,
  errorMessages,
  onClickStripe,
  onClickCoin,
}) => {
  return (
    <Page>
      <AuthBox>
        <HeaderDark />

        <header className="account-page__header">
          <BackButton />

          <h2 className="auth__title">Receive</h2>
        </header>

        <div className="auth__field">
          <BoxNumber
            name="amount"
            type="number"
            // labelClassName="field__label--bold"
            label="Receive amount"
            value={value}
            onChange={onChange}
            errorMessages={errorMessages}
          />

          <Divider />

          <div className="payment-card__box">
            <div className="page__section--title">Payment system</div>

            <button
              onClick={onClickStripe}
              id="stripeCard"
              className="card card--disabled"
            >
              <img
                src="/svg/stripe.svg"
                className="card__image"
                alt=""
                width="40"
                height="40"
              />
              <div className="card__info">
                <div className="card__title">Stripe</div>
                <div className="card__types">
                  <img src="/svg/stripe-info.svg" alt="Stripe Info" />
                </div>
              </div>
            </button>

            <button
              onClick={onClickCoin}
              id="coinCard"
              className="card card--disabled"
            >
              <img
                src="/svg/coin.svg"
                className="card__image"
                alt=""
                width="40"
                height="40"
              />
              <div className="card__info">
                <div className="card__title">Coin</div>
                <div className="card__types">
                  <img src="/svg/coin-info.svg" alt="Coin Info" />
                </div>
              </div>
            </button>
          </div>

          <span className={"alert alert--disabled"} />
        </div>
      </AuthBox>
    </Page>
  );
};

export default Receive;
