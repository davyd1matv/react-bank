import { useState } from "react";

import { Link } from "react-router-dom";

import Button from "../../component/button";
import InputField from "../inputField";

import "./index.css";

export default function PasswordForm({
  label,
  error_text,
  style,
  placeholder,
  onChange,
}) {
  const REG_EXP_EMAIL = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/);
  const REG_EXP_PASSWORD = new RegExp(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  );

  const [error, setError] = useState(null);

  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (password) => {
    return REG_EXP_PASSWORD.test(password);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    const isValidPassword = validatePassword(value);

    onChange(value, isValidPassword);
    setError(!isValidPassword ? error_text : null);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  //   const [email1, setValues] = useState("");
  //   const [password1, setValues2] = useState("");

  //   const handleChange = (e) => {
  //     setValues(e.target.velue);
  //     setValues2(e.target.velue);
  //   };

  //   const handleChange = (e) => {
  //     const newEmail = e.target.email;
  //     const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
  //       e.target.email
  //     );
  //     setValues(e.target.isValidEmail); // Оновлення стану лише у разі дійсності
  //     setValues2(e.target.password); // Оновлення стану пароля
  //   };

  //=============

  //   const handleSubmit = () => {
  //     if (email.length === 0 || password.length === 0) return null;

  //     if (onSubmit) {
  //       // onSubmit - це handleClickTest з signup
  //       onSubmit(email, password);
  //     } else {
  //       throw new Error("onSubmit props is undefinded");
  //     }

  //     // setEmail("");
  //     // setPassword("");
  //   };

  // const isDisabled = email.length === 0 || password.length === 0;
  //   const isDisabled = email.length === 0;

  return (
    <div className="password__box">
      <div className="password__box-mini">
        <p className="password__text password__padding-text">{label}</p>
        {/* <input
          // onChange={handleChange}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          onChange={handleInputChange}
          className="password-input"
        /> */}
        <InputField
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          onChange={handleInputChange}
        />
        <button
          className="field__icon-password"
          onClick={toggleShowPassword}
          aria-label={showPassword ? "Hide password" : "Show password"}
          show={showPassword ? "show" : null}
        />
      </div>
      {error && <span className="error-password">{error}</span>}

      {/* <button
        disabled={isDisabled}
        onClick={handleSubmit}
        className="field-form__button"
      >
        {button}
      </button> */}

      {/* <Link to={link_three}>
        <Button onClick={handleSubmit} pink>
          Continue
        </Button>
      </Link> */}
    </div>
  );
}
