import BackButton from "../../component/back-button";
import Field from "../../component/field";
import BoxNumber from "../../component/boxNumber";
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { saveSession } from "../../script/session";
// import { useAuth } from "../../context/AuthContext";
// import { validateAmount } from "../../script/utilities";
import "./index.scss";

import Page from "../../page/Page";
import AuthBox from "../../component/authBox";
import HeaderDark from "../../component/header-dark";
import Button from "../../component/button";
import BoxField from "../../component/boxFiled";

const Send = ({
  valueEmail,
  valueAmount,
  errorMessages,
  onClick,
  onChange,
  handleInputChange,
  disabled,
}) => {
  return (
    <Page>
      <AuthBox>
        <HeaderDark />
        <header className="account-page__header">
          <BackButton />

          <div className="auth__title">Send</div>
        </header>

        <div className="auth__field">
          <BoxField
            emailform
            name="email"
            type="email"
            placeholder="Test@test.com"
            label="Email"
            errorMessage="Enter the correct value of the e-mail address"
            value={valueEmail}
            onChange={onChange}
          />

          <BoxNumber
            name="amount"
            type="number"
            label="Sum"
            value={valueAmount}
            onChange={handleInputChange}
            labelClassName="field__label"
            errorMessages={errorMessages}
          />

          <Button type="button" pink onClick={onClick} disabled={disabled}>
            Send
          </Button>

          <span className={"alert alert--disabled"} />
        </div>
      </AuthBox>
    </Page>
  );
};

export default Send;
