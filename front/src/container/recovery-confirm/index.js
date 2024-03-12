import "./index.css";

import Page from "../../component/page";
import HeaderDark from "../../component/header-dark";
import Button from "../../component/button";
import Back from "../../component/back";
import SignTitle from "../../component/signTitle";
import SignBox from "../../component/signBox";

export default function SigninRecoveryConfirm({}) {
  return (
    <Page>
      <SignBox>
        <HeaderDark />

        <Back />

        <SignTitle
          title={"Recovery password"}
          info={"Whrite the code you received"}
        />

        <div className="sign__box">
          <div className="sign__box-mini">
            <p className="sign-text padding-text">Code</p>
            <input className="sign-input"></input>
          </div>

          <div className="sign__box-mini">
            <p className="sign-text padding-text">New password</p>
            <input className="sign-input"></input>
          </div>

          {/* <div className="sing-question-box">
            <p className="sign-text">Forgot your password? </p>
            <a href="/recovery">Restore</a>
          </div> */}

          <Button pink>Restore password</Button>
        </div>
      </SignBox>
    </Page>
  );
}
