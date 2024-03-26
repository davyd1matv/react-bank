import PageBalance from "../../page/PageBalance";

import Header from "../../component/header";

import BoxInfo from "../../component/boxInfo";

import { Link } from "react-router-dom";

import "./index.scss";

const Balance = ({ data }) => {
  return (
    <PageBalance>
      <div className="balance__background">
        <Header />
        <header className="balance__header">
          <Link to="/settings" className="balance__settings">
            <img src="/svg/settings.svg" alt="" width="25" height="25" />
          </Link>

          <div className="balance__title">Main wallet</div>

          <Link to="/notifications" className="balance__notifications">
            <img src="/svg/notifications.svg" alt="" width="25" height="25" />
          </Link>
        </header>

        <div className="balance__balance">{data?.balance}</div>

        <div className="balance__main">
          <div className="balance__operations">
            <div className="balance-button-operations">
              <Link to="/receive" className="balance__receive">
                <img src="/svg/receive.svg" alt="" width="30" height="30" />
              </Link>
            </div>

            <div className="balance-button-operations">
              <Link to="/send" className="balance__send">
                <img src="/svg/send.svg" alt="" width="30" height="30" />
              </Link>
            </div>
          </div>
        </div>

        <div className="balance__transactions-list">
          {data &&
            data.transactions &&
            data.transactions.map((transaction) => (
              <BoxInfo
                key={transaction.id}
                id={transaction.id}
                sender={transaction.sender}
                time={transaction.date}
                type={transaction.type}
                amount={transaction.amount}
              />
            ))}
        </div>
      </div>
    </PageBalance>
  );
};

export default Balance;
