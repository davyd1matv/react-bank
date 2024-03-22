import Page from "../../page/Page";
import { Link } from "react-router-dom";
import BackButtonComponent from "../../component/back-button";

import BoxField from "../../component/boxFiled";
import AuthBox from "../../component/authBox";
import HeaderDark from "../../component/header-dark";
import Button from "../../component/button";

import "./index.scss";

const Signin = ({ handleSubmit, VE, VP, onChange, disabled }) => {
  return (
    <Page>
      <AuthBox>
        <HeaderDark />

        <BackButtonComponent />

        <form onSubmit={handleSubmit} className="auth__box">
          <h1 className="auth__title">Sign in</h1>

          <p className="auth__subtext">Select login method</p>

          <div className="auth__field">
            <BoxField
              emailform
              name="email"
              type="email"
              placeholder="Your e-mail"
              label="Email"
              errorMessage="Enter the correct value of the e-mail address"
              value={VE}
              onChange={onChange}
              required={true}
            />
            <BoxField
              name="password"
              type="password"
              placeholder="Your password"
              label="Password"
              errorMessage="Please enter the value"
              value={VP}
              onChange={onChange}
              required={true}
            />
          </div>

          <div className="signup__question">
            <p className="signup__question-text">Forgot your password?</p>
            <Link to={"/recovery"} className="signup__link">
              Restore
            </Link>
          </div>

          <Button pink type="submit" disabled={disabled}>
            Continue
          </Button>

          <span className={"alert alert--disabled"} />
        </form>
      </AuthBox>
    </Page>
  );
};

export default Signin;
