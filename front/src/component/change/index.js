import { useEffect, useState } from "react";
import { getTokenSession, saveSession } from "../../script/session";

import { useNavigate } from "react-router-dom";
import Button from "../../component/button";

import { setAlert } from "../../component/alert";

import { useAuth } from "../../App";
import BoxField from "../../component/boxFiled";

export const EmailForm = () => {
  const { authState, login } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    checkDisabled();
  }, [values]);

  const checkDisabled = () => {
    const isDisabled = Object.values(values).some((value) => value === "");
    setDisabled(isDisabled);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (stop) => {
    stop.preventDefault();

    setAlert("progress", "Loading");

    try {
      const res = await fetch("http://localhost:4000/change-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          //   token: authState.token,
          token: getTokenSession(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setAlert("success", data.message);
        saveSession(data.session);
        login(data.session.user, data.session.token);

        navigate("/balance");
      } else {
        setAlert("error", data.message);
      }
    } catch (error) {
      //   setAlert("error", error.message);
      setAlert("error", "Помилка");
    }
  };

  return (
    <div className="auth__box">
      <p className="auth__title--small">Change email</p>

      <div className="auth__field">
        <BoxField
          emailform
          name="email"
          type="email"
          placeholder="test@test.com"
          label="Email"
          errorMessage="Enter the correct email address"
          VE={values.email}
          onChange={onChange}
          disabled={disabled}
        />

        <BoxField
          disabled={disabled}
          name="password"
          type="password"
          placeholder="Your password"
          label="Password"
          errorMessage="Please enter the value"
          VP={values.password}
          onChange={onChange}
        />
      </div>

      <Button pink type={"button"} disabled={disabled} onClick={handleSubmit}>
        Save email
      </Button>

      <span className={"alert alert--disabled"} />
    </div>
  );
};

export const PasswordForm = () => {
  const { authState, login } = useAuth();

  const navigate = useNavigate();
  const [values, setValues] = useState({
    password: "",
    passwordNew: "",
  });

  const [disabled, setDisabled] = useState(false);
  //   const [alert, setAlert] = useState({ status: "", text: "" });

  useEffect(() => {
    checkDisabled();
  }, [values]);

  const checkDisabled = () => {
    const isDisabled = Object.values(values).some((value) => value === "");
    setDisabled(isDisabled);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (stop) => {
    stop.preventDefault();

    setAlert("progress", "Loading");

    try {
      const res = await fetch("http://localhost:4000/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: values.password,
          passwordNew: values.passwordNew,
          token: getTokenSession(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setAlert("success", data.message);
        saveSession(data.session);
        login(data.session.user, data.session.token);

        navigate("/balance");
      } else {
        setAlert("error", data.message);
      }
    } catch (error) {
      setAlert("error", error.message);
    }
  };

  return (
    <div className="auth__box">
      <p className="auth__title--small">Change password</p>

      <div className="auth__field">
        <BoxField
          name="password"
          type="password"
          placeholder="Your password"
          label="Password"
          errorMessage="Please enter the value"
          VP={values.password}
          onChange={onChange}
          disabled={disabled}
        />

        <BoxField
          disabled={disabled}
          name="passwordNew"
          type="password"
          placeholder="Your password"
          label="New password"
          errorMessage="The password must consist of at least 8 characters, including at least one number, lowercase and uppercase letters"
          //   pattern={`^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$`}
          VP={values.passwordNew}
          onChange={onChange}
          required={true}
        />
      </div>

      <Button pink type="button" onClick={handleSubmit} disabled={disabled}>
        Save password
      </Button>

      <span className={"alert alert--disabled"} />
    </div>
  );
};
