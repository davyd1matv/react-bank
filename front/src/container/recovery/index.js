import "./index.css";

import Page from "../../component/page";
import HeaderDark from "../../component/header-dark";
import Button from "../../component/button";
import Back from "../../component/back";
import SignTitle from "../../component/signTitle";
import SignBox from "../../component/signBox";

export default function Recovery({}) {
  return (
    <Page>
      <SignBox>
        <HeaderDark />

        <Back />

        <SignTitle
          title={"Recovery password"}
          info={"Choose a recovery method"}
        />

        <div className="sign__box">
          <div className="sign__box-mini">
            <p className="sign-text padding-text">Email</p>
            <input className="sign-input"></input>
          </div>

          {/* <div className="sign__box-mini">
            <p className="sign-text padding-text">Password</p>
            <input className="sign-input"></input>
          </div> */}

          {/* <div className="sing-question-box">
            <p className="sign-text">Forgot your password? </p>
            <a href="/recovery">Restore</a>
          </div> */}

          <Button pink>Send code</Button>
        </div>
      </SignBox>
    </Page>
  );
}
