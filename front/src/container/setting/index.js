import React from "react";
import { useState, useEffect } from "react";

import BackButton from "../../component/back-button";
import Divider from "../../component/divider";
// import Field from "../../component/field";
// import FieldPassword from "../../component/field-password";
// import { saveSession } from "../../script/session";

import "./index.scss";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
import { ChangeEmailForm, ChangePasswordForm } from "../../component/change";
import Page from "../../page/Page";
import AuthBox from "../../component/authBox";
import HeaderDark from "../../component/header-dark";
import Button from "../../component/button";

/////////////////////////////////

const Settings = ({ logout }) => {
  return (
    <Page>
      <AuthBox>
        <HeaderDark />
        <header className="account-page__header">
          <BackButton />

          <div className="auth__title--small">Settings</div>
        </header>

        <div className="auth__box">
          <ChangeEmailForm />

          <Divider />

          <ChangePasswordForm />

          <Divider />

          <Button red onClick={logout}>
            Logout
          </Button>
        </div>
      </AuthBox>
    </Page>
  );
};

export default Settings;
