import Notification from "../../component/notification";
import BackButton from "../../component/back-button";

import React, { useEffect, useState } from "react";
import "./index.scss";
// import axios from "axios";
// import { useAuth } from "../../context/AuthContext";
import Page from "../../page/Page";
import AuthBox from "../../component/authBox";
import HeaderDark from "../../component/header-dark";
import BoxInfo from "../../component/boxInfo";

const Notifications = ({ notifications }) => {
  return (
    <Page>
      <AuthBox>
        <HeaderDark />
        <header className="account-page__header">
          <BackButton />
          <div className="auth__title">Notifications</div>
        </header>

        <main className="page__section">
          {notifications && notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <BoxInfo
                notf
                key={index}
                text={notification.text}
                time={notification.date}
                type={notification.type}
              />
            ))
          ) : (
            <p>No notifications available</p>
          )}
        </main>
      </AuthBox>
    </Page>
  );
};

export default Notifications;
