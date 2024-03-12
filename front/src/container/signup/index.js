import "./index.css";

import Page from "../../component/page";
import HeaderDark from "../../component/header-dark";
import Button from "../../component/button";
import Back from "../../component/back";
import SignTitle from "../../component/signTitle";
import SignBox from "../../component/signBox";
import EmailForm from "../../component/email";
import PasswordForm from "../../component/password";

import { Link, useNavigate } from "react-router-dom";

import { Form, REG_EXP_PASSWORD, REG_EXP_EMAIL } from "../../script/form";

import { saveSession } from "../../script/session";
import { useReducer, useState } from "react";

import { useAuth } from "../../auth/authContext";

export default function SignupPage({}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isEmailValid, setEmailValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [userExists, setUserExists] = useState(false);

  const [errorMessage, setErrorMessage] = useState(false);

  //
  //
  //
  //
  //

  const navigate = useNavigate();
  const { state, dispatch } = useAuth();

  const handleEmailChange = (value, isValid) => {
    setEmail(value);
    setEmailValid(isValid);
  };

  const handlePasswordChange = (value, isValid) => {
    setPassword(value);
    setPasswordValid(isValid);
  };

  //

  const handleSubmitTest = async () => {
    // if (!email || !password) {
    //   setErrorMessage("Введіть email та пароль");
    //   return;
    // }
    // Розкоментувати за потреби. Начебто проблем не має.

    try {
      const res = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        // body: convertData(email),
      });

      if (res.status === 400) {
        setErrorMessage(true);
      }

      //   console.log(email);

      const data = await res.json();

      console.log("data:", data);

      if (res.ok) {
        // Збережіть токен сесії (якщо надійшов) за допомогою saveSession
        dispatch({
          type: "LOGIN",
          token: data.session.token,
          user: data.session.user,
        });
        navigate(`/signup-confirm?id=${data.session.user.id}`);
      }
      //   else {
      //     setErrorMessage(data.message);
      //   }
    } catch (error) {
      console.error("Помилка при завантаженніє", error);
    }
  };

  //   const convertData = ({ email }) => {
  //     JSON.stringify({ email: email });
  //   };

  const isButtonActive =
    email !== "" && password !== "" && isEmailValid && isPasswordValid;

  return (
    <Page>
      <SignBox>
        <HeaderDark />

        <Back />

        {/* <h1 className="sign-title">Sign Up</h1> */}
        {/* <p className="sign-text sign-text-gray">Choose a registration method</p> */}

        <SignTitle title={"Sign Up"} info={"Choose a registration method"} />

        {/* <div className="sign__box">
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
        </div> */}

        <EmailForm
          //   email={email}
          //   password={password}
          //   setEmail={setEmail}
          //   setPassword={setPassword}
          //   //   onChange={(newEmail, newPassword) => {
          //   //     setEmail(newEmail);
          //   //     setPassword(newPassword);
          //   //   }}
          //   onSubmit={handleSubmitTest} // Можливо потрібно onSubmit
          //   link_three={link_three}
          //
          label={"Email"}
          placeholder={"email@test"}
          type="email"
          error_text="Помилка, введіть коректний email. Має бути такого виду: test@test.com"
          onChange={handleEmailChange}
        />

        <PasswordForm
          //   email={email}
          //   password={password}
          //   setEmail={setEmail}
          //   setPassword={setPassword}
          //   //   onChange={(newEmail, newPassword) => {
          //   //     setEmail(newEmail);
          //   //     setPassword(newPassword);
          //   //   }}
          //   onSubmit={handleSubmitTest} // Можливо потрібно onSubmit
          //   link_three={link_three}
          //
          label={"Password"}
          placeholder={"password"}
          error_text="Пароль має складатися з щонайменше однієї цифри, однієї літери у нижньому регістрі, однієї літери у верхньому регістрі. Довжина не менше 8 символів"
          onChange={handlePasswordChange}
        />

        <div className="sing-question-box">
          <p className="sign-text">Already have an account? </p>
          <a href="/singin">Sign in</a>
        </div>

        <div>
          <Button onClick={handleSubmitTest} pink condition={isButtonActive}>
            Continue
          </Button>
          {/* <button type="submit" className={`button `}>
            Continue
          </button> */}

          {errorMessage && (
            <span className="block">
              <span className="error__icon"></span>
              Користувач з таким email вже існує
            </span>
          )}
        </div>
      </SignBox>
    </Page>
  );
}
