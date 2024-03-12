import "./index.css";

import Page from "../../component/page";
import HeaderDark from "../../component/header-dark";
import Button from "../../component/button";
import Back from "../../component/back";
import SignTitle from "../../component/signTitle";
import SignBox from "../../component/signBox";

import { Link } from "react-router-dom";

import { Form, REG_EXP_PASSWORD, REG_EXP_EMAIL } from "../../script/form";

import { saveSession } from "../../script/session";

export default function SignupPage({ link_three }) {
  class SignupForm extends Form {
    FIELD_NAME = {
      EMAIL: "email",
      PASSWORD: "password",
    };

    FIELD_ERROR = {
      IS_EMPTY: "Введіть значення в поле",
      IS_BIG: "Дуже довге значення, приберіть зайве",
      EMAIL: "Введіть коректне значення e-mail адреси",
    };

    validate = (name, value) => {
      if (String(value).length < 1) {
        return this.FIELD_ERROR.IS_EMPTY;
      }

      if (String(value).length > 20) {
        return this.FIELD_ERROR.IS_BIG;
      }

      if (name === this.FIELD_NAME.EMAIL) {
        if (!REG_EXP_EMAIL.test(String(value))) {
          return this.FIELD_ERROR.EMAIL;
        }
      }
    };

    submit = async () => {
      if (this.disabled === true) {
        this.validateAll();
      } else {
        console.log(this.value);

        this.setAlert("progress", "Loading...");

        try {
          const res = await fetch("/signup", {
            // можливо слід додати варіант з тпом 4000
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: this.convertData(),
          });

          const data = await res.json();

          if (res.ok) {
            this.setAlert("success", data.message);
            saveSession(data.session);
            window.location.assign("/"); // показувало помилку

            //   alert(data.session.token)
          } else {
            this.setAlert("error", data.message);
          }
        } catch (error) {
          this.setAlert("error", error.message);
        }
      }
    };

    convertData = () => {
      return JSON.stringify({
        [this.FIELD_NAME.EMAIL]: this.value[this.FIELD_NAME.EMAIL],
        [this.FIELD_NAME.PASSWORD]: this.value[this.FIELD_NAME.PASSWORD],
      });
    };

    static change = (name, value) => {
      console.log(name, value);
      if (this.validate(name, value)) this.value[name] = value;
    };
  }

  window.signupForm = new SignupForm();

  document.addEventListener("DOMContentLoaded", () => {
    if (window.session) {
      //   location.assign("/"); // показувало помилку
    }
  });

  return (
    <Page>
      <SignBox>
        <HeaderDark />

        <Back />

        {/* <h1 className="sign-title">Sign Up</h1> */}
        {/* <p className="sign-text sign-text-gray">Choose a registration method</p> */}

        <SignTitle title={"Sign Up"} info={"Choose a registration method"} />

        <div className="sign__box">
          <div className="sign__box-mini">
            <p className="sign-text padding-text">Email</p>
            <input
              action="signupForm.change"
              id="email"
              type="email"
              placeholder="Email"
              className="sign-input"
            ></input>
          </div>

          <div className="sign__box-mini">
            <p className="sign-text padding-text">Password</p>
            <input
              action="signupForm.change"
              id="password"
              type="password"
              placeholder="Password"
              className="sign-input"
            ></input>
          </div>

          <div className="sing-question-box">
            <p className="sign-text">Already have an account? </p>
            <a href="/singin">Sign in</a>
          </div>

          <Link to={link_three}>
            <Button onClick={SignupForm.submit} pink>
              Continue
            </Button>
          </Link>
        </div>
      </SignBox>
    </Page>
  );
}
