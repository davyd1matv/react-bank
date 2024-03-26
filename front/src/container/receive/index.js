import BackButton from "../../component/back-button";
import BoxNumber from "../../component/boxNumber";
import Divider from "../../component/divider";
import "./index.scss";
import Page from "../../page/Page";
import PageBalance from "../../page/PageBalance";
import AuthBox from "../../component/authBox";
import HeaderDark from "../../component/header-dark";

const Receive = ({
  value,
  onChange,
  errorMessages,
  onClickStripe,
  onClickCoin,
  disabled,
}) => {
  return (
    <PageBalance>
      <AuthBox>
        <HeaderDark />

        <header className="balanceBox-title">
          <BackButton />

          <h2 className="auth__title--medium">Receive</h2>
        </header>

        <div className="auth__field">
          <BoxNumber
            name="amount"
            type="number"
            label="Receive amount"
            value={value}
            onChange={onChange}
            errorMessages={errorMessages}
          />

          <span className={"alert alert--disabled"} />

          <Divider />

          <div className="receive__box">
            <div className="receive--title">Payment system</div>

            <button
              onClick={onClickStripe}
              className={`receive-card ${
                disabled ? "receive-card--disabled" : ""
              }`}
            >
              <img
                src="/svg/stripe.svg"
                className="receive-card__image"
                alt=""
                width="40"
                height="40"
              />
              <div className="receive-card__info">
                <div className="receive-card__title">Stripe</div>
                <div className="receive-card__types">
                  <img src="/svg/stripe-info.svg" alt="Stripe Info" />
                </div>
              </div>
            </button>

            <button
              onClick={onClickCoin}
              className={`receive-card ${
                disabled ? "receive-card--disabled" : ""
              }`}
            >
              <img
                src="/svg/coin.svg"
                className="receive-card__image"
                alt=""
                width="40"
                height="40"
              />
              <div className="receive-card__info">
                <div className="receive-card__title">Coin</div>
                <div className="receive-card__types">
                  <img src="/svg/coin-info.svg" alt="Coin Info" />
                </div>
              </div>
            </button>
          </div>
        </div>
      </AuthBox>
    </PageBalance>
  );
};

export default Receive;
