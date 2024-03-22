import Page from "../../page/Page";

import BoxField from "../../component/boxFiled";
import AuthBox from "../../component/authBox";
import HeaderDark from "../../component/header-dark";
import BackButtonComponent from "../../component/back-button";
import Button from "../../component/button";
import "./index.scss";

const SignupConfirm = ({
  handleSubmit,
  VC,
  onChange,
  handleRenewLinkClick,
  disabled,
  AS,
  AT,
  confirmationCode,
  logout,
}) => {
  return (
    <Page>
      <AuthBox>
        <HeaderDark />

        <BackButtonComponent />

        <form onSubmit={handleSubmit} className="auth__box">
          <h1 className="auth__title">Confirm account</h1>

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
          </div>

          <div className="signup__question">
            <p className="signup__question-text">Lost your code?</p>
            <button onClick={handleRenewLinkClick} className="signup__link">
              Send it again
            </button>
          </div>

          <Button pink type="submit" disabled={disabled}>
            Send
          </Button>

          <Button red onClick={logout}>
            Logout
          </Button>

          <span className={"alert alert--disabled"} />

          <div>{confirmationCode}</div>
        </form>
      </AuthBox>
    </Page>
  );
};

export default SignupConfirm;
