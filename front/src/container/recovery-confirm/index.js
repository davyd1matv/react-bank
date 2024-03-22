import Page from "../../page/Page";

import BackButtonComponent from "../../component/back-button";

import AuthBox from "../../component/authBox";
import HeaderDark from "../../component/header-dark";
import Button from "../../component/button";
import BoxField from "../../component/boxFiled";

import "./index.scss";

const RecoveryConfirmForm = ({
  handleSubmit,
  VC,
  VP,
  onChange,
  handleRenewLinkClick,
  disabled,
  confirmationCode,
}) => {
  return (
    <Page>
      <AuthBox>
        <HeaderDark />

        <BackButtonComponent />

        <form onSubmit={handleSubmit} className="auth__box">
          <h1 className="auth__title">Recover password</h1>

          <p className="auth__subtext">Write the code you received</p>

          <div className="auth__field">
            <BoxField
              emailform
              name="code"
              type="number"
              placeholder="Your code"
              label="Code"
              errorMessage="Enter the correct value of the code"
              value={VC}
              onChange={onChange}
              required={true}
            />
            <BoxField
              name="password"
              type="password"
              placeholder="Your password"
              label="Password"
              errorMessage="The password must consist of at least 8 characters, including at least one number, lowercase and uppercase letters"
              pattern={`^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$`}
              value={VP}
              onChange={onChange}
              required={true}
            />
          </div>

          <div className="signup__question">
            <p className="signup__question-text">Lost your code?</p>
            <button onClick={handleRenewLinkClick} className="signup__link">
              Send it again
            </button>
          </div>

          <Button pink type="submit" disabled={disabled}>
            Restore password
          </Button>

          <span className={"alert alert--disabled"} />

          <div>{confirmationCode}</div>
        </form>
      </AuthBox>
    </Page>
  );
};

export default RecoveryConfirmForm;
