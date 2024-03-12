import "./index.css";

import Page from "../../component/page";
import HeaderDark from "../../component/header-dark";
import Button from "../../component/button";
import Back from "../../component/back";
import SignTitle from "../../component/signTitle";
import SignBox from "../../component/signBox";

export default function SignupConfirm({}) {
  return (
    <Page>
      <SignBox>
        <HeaderDark />

        <Back />

        <SignTitle
          title={"Confirm account"}
          info={"Write the code you received"}
        />

        <div className="sign__box">
          <div className="sign__box-mini">
            <p className="sign-text padding-text">Code</p>
            <input className="sign-input"></input>
          </div>

          {/* <div className="sign__box-mini">
            <p className="sign-text padding-text">Email</p>
            <input className="sign-input"></input>
          </div> */}

          {/* <div className="sing-question-box">
            <p className="sign-text">Already have an account? </p>
            <a href="/singin">Sign in</a>
          </div> */}

          <Button pink>Continue</Button>
        </div>
      </SignBox>
    </Page>
  );
}
