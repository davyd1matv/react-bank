import BackButton from "../../component/back-button";
import Divider from "../../component/divider";
// import axios from "axios";
import "./index.scss";

import Page from "../../page/Page";
import AuthBox from "../../component/authBox";
import HeaderDark from "../../component/header-dark";
// import Button from "../../component/button";
// import BoxField from "../../component/boxFiled";

const Transaction = ({ data }) => {
  return (
    <Page>
      <AuthBox>
        <HeaderDark />
        <header className="account-page__header">
          <BackButton />

          <div className="auth__title">Transaction</div>
        </header>

        <h1 className="transaction__amount">{data?.transaction?.amount}</h1>

        <div className="auth__field">
          <div className="transaction__box">
            <div className="transaction__box__info">
              <div className="transaction__box__date">
                <div>Date</div>
                <div>{data?.transaction?.date}</div>
              </div>

              <Divider />

              <div className="transaction__box__address">
                <div>Address</div>
                <div>{data?.getter}</div>
              </div>

              <Divider />

              <div className="transaction__box__type">
                <div>Type</div>
                <div className="transaction-type">
                  {data?.transaction?.type}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthBox>
    </Page>
  );
};

export default Transaction;
