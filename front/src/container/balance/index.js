import React from "react";
import { useState, useEffect } from "react";
import Page from "../../page/Page";
import PageBalance from "../../page/PageBalance";
import { useNavigate } from "react-router-dom";

import BackButton from "../../component/back-button";
import Field from "../../component/field";
import { saveSession } from "../../script/session";

import AuthBox from "../../component/authBox";
import Header from "../../component/header";
import Button from "../../component/button";
import BoxField from "../../component/boxFiled";
import TransactionBox from "../../component/transaction-notification";
import { useAuth } from "../../App";
import axios from "axios";
import BoxInfo from "../../component/boxInfo";

import { Link } from "react-router-dom";

import "./index.scss";

//===

// import "./index.scss";
// import NotificationsButton from "../../component/button-notifications";
// import SettingsButton from "../../component/button-settings";
// import ReceiveButton from "../../component/button-receive";
// import SendButton from "../../component/button-send";
// import { useState, useEffect } from "react";
// // import { useAuth } from "../../context/AuthContext";
// import { useAuth } from "../../App";
// import axios from "axios";
// import { Navigate } from "react-router-dom";
// import Transaction from "../../component/transaction-notification";

// import img from "../../../public/svg/settings-button.svg";

const Balance = ({ data }) => {
  return (
    <PageBalance>
      {/* <AuthBox> */}
      <div className="balance__background">
        <Header />
        <header className="balance__header">
          <Link to="/settings" className="balance__settings">
            <img src="/svg/settings-button.svg" alt="" width="25" height="25" />
          </Link>
          {/* <SettingsButton /> */}

          <div className="balance__title">Main wallet</div>

          <Link to="/notifications" className="balance__notifications">
            <img
              src="/svg/notifications-button.svg"
              alt=""
              width="25"
              height="25"
            />
          </Link>
          {/* <NotificationsButton /> */}
        </header>

        {/* {data && <div className="balance__balance">{data.balance}</div>} */}
        <div className="balance__balance">{data?.balance}</div>

        <div className="balance__main">
          {/* {data && <div className="balance__balance">{data.balance}</div>} */}

          <div className="balance__operations">
            <div className="balance-button-operations">
              <Link to="/receive" className="balance__receive">
                <img
                  src="/svg/button-receive.svg"
                  alt=""
                  width="30"
                  height="30"
                />
              </Link>
            </div>

            <div className="balance-button-operations">
              <Link to="/send" className="balance__send">
                <img
                  // src="../../../public/svg/button-send.svg"
                  src="/svg/button-send.svg"
                  alt=""
                  width="30"
                  height="30"
                />
              </Link>
            </div>
            {/* <ReceiveButton /> */}
            {/* <SendButton /> */}
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

          {/* {data.transactions.map((transaction) => (
            <TransactionBox
              key={transaction.id}
              id={transaction.id}
              sender={transaction.sender}
              time={transaction.date}
              type={transaction.type}
              amount={transaction.amount}
            />
          ))} */}
        </div>
      </div>
      {/* </AuthBox> */}
    </PageBalance>
  );

  //   const [data, setData] = useState(null);
  //   const { authState, logout } = useAuth();

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get("/balance", {
  //           params: {
  //             token: authState.token,
  //           },
  //         });

  //         setData(response.data);
  //         authState.user.isConfirm = true;
  //       } catch (error) {
  //         logout();
  //         console.error("Error fetching balance data:", error);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  //   if (!authState.user.isConfirm) {
  //     return <Navigate to="/signup-confirm" />;
  //   }

  //   return (
  //     <div className="page__wallet-background">
  //       <div className="page">
  //         <header className="wallet-page__header">
  //           <SettingsButton />
  //           <div className="wallet-page__title">Main wallet</div>
  //           <NotificationsButton />
  //         </header>

  //         <div className="wallet-page__main">
  //           {data && <div className="wallet-page__balance">{data.balance}</div>}

  //           <div className="wallet-page__operations">
  //             <ReceiveButton />
  //             <SendButton />
  //           </div>
  //         </div>

  //         <div className="wallet-page__transactions-list">
  //           {data &&
  //             data.transactions &&
  //             data.transactions.map((transaction) => (
  //               <Transaction
  //                 key={transaction.id}
  //                 id={transaction.id}
  //                 sender={transaction.sender}
  //                 time={transaction.date}
  //                 type={transaction.type}
  //                 amount={transaction.amount}
  //               />
  //             ))}
  //         </div>
  //       </div>
  //     </div>
  //   );
};

export default Balance;
