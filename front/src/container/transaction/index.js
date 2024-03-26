import BackButton from "../../component/back-button";
import Divider from "../../component/divider";
import "./index.scss";

import Page from "../../page/Page";
import PageBalance from "../../page/PageBalance";
import AuthBox from "../../component/authBox";
import HeaderDark from "../../component/header-dark";

const Transaction = ({ data, transactionType }) => {
  return (
    <PageBalance>
      <AuthBox>
        <HeaderDark />
        <header className="balanceBox-title">
          <BackButton />

          <div className="auth__title--medium">Transaction</div>
        </header>

        <h1
          className={`transaction__amount ${
            transactionType === "Receipt"
              ? "transaction__amount--plus"
              : "transaction__amount--minus"
          }`}
        >
          {data?.transaction?.amount}
        </h1>

        <div className="auth__field">
          <div className="transaction__box">
            <div className="transaction__box__info">
              <div className="transaction__box__date">
                <div className="transaction__box__title">Date</div>
                <div>{data?.transaction?.date}</div>
              </div>

              <Divider />

              <div className="transaction__box__email">
                <div className="transaction__box__title">Email</div>
                <div>{data?.getter}</div>
              </div>

              <Divider />

              <div className="transaction__box__type">
                <div className="transaction__box__title">Type</div>
                <div className="transaction-type">
                  {data?.transaction?.type}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthBox>
    </PageBalance>
  );
};

export default Transaction;
