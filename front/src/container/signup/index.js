import { Link } from "react-router-dom";
import Page from "../../page/Page";

import BackButtonComponent from "../../component/back-button";

import BoxField from "../../component/boxFiled";

import AuthBox from "../../component/authBox";
import HeaderDark from "../../component/header-dark";
import Button from "../../component/button";

import "./index.scss";

const Signup = ({ handleSubmit, onChange, VE, VP, disabled }) => {
  return (
    <Page>
      <AuthBox>
        <HeaderDark />

        <BackButtonComponent />

        <form onSubmit={handleSubmit} className="auth__box">
          <h1 className="auth__title">Sign up</h1>

          <p className="auth__subtext">Choose a registration method</p>

          <div className="auth__field">
            <BoxField
              emailform
              name="email"
              type="email"
              placeholder="test@test.com"
              label="Email"
              errorMessage="Enter the correct value of the e-mail address"
              VE={VE}
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
              VP={VP}
              onChange={onChange}
              required={true}
            />
          </div>

          <div className="signup__question">
            <p className="signup__question-text">Already have an account?</p>
            <Link to={"/signin"} className="signup__link">
              Sign In
            </Link>
          </div>

          <Button pink type={"submit"} disabled={disabled}>
            Continue
          </Button>

          <span className={"alert alert--disabled"} />
        </form>
      </AuthBox>
    </Page>
  );
};

export default Signup;
