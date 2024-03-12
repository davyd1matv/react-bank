import { useState } from "react";

import { Link } from "react-router-dom";

import Button from "../../component/button";
import InputField from "../inputField";

import "./index.css";

export default function EmailForm({
  label,
  error_text,
  placeholder,
  onChange,
}) {
  const REG_EXP_EMAIL = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/);
  const REG_EXP_PASSWORD = new RegExp(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  );

  const [error, setError] = useState(null);

  const validateEmail = (email) => {
    return REG_EXP_EMAIL.test(email);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    const isValidEmail = validateEmail(value);

    onChange(value, isValidEmail);
    setError(!isValidEmail ? error_text : null);
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

  //   const handleSubmit = () => {
  //     if (email.length === 0 || password.length === 0) return null;

  //     if (onSubmit) {
  //       // onSubmit - це handleClickTest з signup
  //       onSubmit(email, password);
  //     } else {
  //       throw new Error("onSubmit props is undefinded");
  //     }

  // setEmail("");
  // setPassword("");
  //   };

  // const isDisabled = email.length === 0 || password.length === 0;
  //   const isDisabled = email.length === 0;

  return (
    <div className="email__box">
      <div className="email__box-mini">
        <p className="email__text email__padding-text">{label}</p>
        {/* <input
          //   onChange={handleChange}
          placeholder={placeholder}
          onChange={handleInputChange}
          //   onChange={(e) => setEmail(e.target.value)}
          //   rows={2}
          className="email-input"
        /> */}
        <InputField placeholder={placeholder} onChange={handleInputChange} />
        {error && <span className="error">{error}</span>}
      </div>

      {/* <Link to={link_three}>
        <Button onClick={handleSubmit} pink>
          Continue
        </Button>
      </Link> */}
    </div>
  );
}
