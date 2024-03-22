import { useEffect, useState } from "react";
import { saveSession, getTokenSession } from "../script/session";
import { Navigate } from "react-router-dom";

import Wellcome from "../container/welcome";
import Signup from "../container/signup";
import Signin from "../container/signin";
import Recovery from "../container/recovery";
import RecoveryConfirm from "../container/recovery-confirm";
import SignupConfirm from "../container/signup-confirm";

import { useNavigate, useLocation } from "react-router-dom";

import { setAlert } from "../component/alert";

import { useAuth } from "../App";

// Pages
export const WellcomePage = () => {
  const { stateAuth, logout } = useAuth();
  return <Wellcome stateAuth={stateAuth} logout={logout} />;
};

export const SignupPage = () => {
  const { login } = useAuth();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();

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

    setAlert("progress", "Loading...");

    try {
      const res = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setAlert("success", data.message);
        saveSession(data.session);
        login(data.session.user, data.session.token);

        navigate("/signup-confirm");
      } else {
        setAlert("error", data.message);
      }
    } catch (error) {
      setAlert("error", error.message);
    }
  };

  return (
    <Signup
      handleSubmit={handleSubmit}
      onChange={onChange}
      VE={values.email}
      VP={values.password}
      VPA={values.passwordAgain}
      disabled={disabled}
      alert={alert}
    />
  );
};

export const SignupConfirmPage = () => {
  const [values, setValues] = useState({
    code: "",
  });

  const { stateAuth, logout } = useAuth();

  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");

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

    setAlert("progress", "Loading...");

    try {
      const res = await fetch("http://localhost:4000/signup-confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: Number(values.code), // Можливо слід прописати лише values.code
          token: getTokenSession(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setAlert("success", data.message);
        stateAuth.user.isConfirm = true;
        saveSession(data.session);
        navigate(`/balance`);
      } else {
        setAlert("error", data.message);
      }
    } catch (error) {
      setAlert("error", error.message);
    }
  };

  const handleRenewLinkClick = async (stop) => {
    stop.preventDefault(); // начебто onSubmit немає, то ж  може слід прибрати

    try {
      const response = await fetch(
        `http://localhost:4000/signup-confirm-code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: stateAuth.user.email }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.confirm !== undefined) {
          const newCode = data.confirm.code;
          setConfirmationCode(newCode);
        } else {
          console.error("Confirmation code not found in response");
        }
      } else {
        console.error(
          `Error fetching confirmation code: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error fetching confirmation code:", error);
    }
  };

  return (
    <SignupConfirm
      handleSubmit={handleSubmit}
      VC={values.code}
      onChange={onChange}
      handleRenewLinkClick={handleRenewLinkClick}
      disabled={disabled}
      AS={alert.status}
      AT={alert.text}
      confirmationCode={confirmationCode}
      logout={logout}
    />
  );
};

export const SigninPage = () => {
  const { login } = useAuth();

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

    setAlert("progress", "Loading...");

    try {
      const res = await fetch("http://localhost:4000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await res.json();

      console.log("Data: ", data);

      if (res.ok) {
        setAlert("success", data.message);
        saveSession(data.session);
        login(data.session.user, data.session.token);

        navigate(`/balance`);
      } else {
        setAlert("error", data.message);
      }
    } catch (error) {
      setAlert("error", error.message);
    }
  };

  return (
    <Signin
      handleSubmit={handleSubmit}
      VE={values.email}
      VP={values.password}
      onChange={onChange}
      disabled={disabled}
      AS={alert.status}
      AT={alert.text}
    />
  );
};

export const RecoveryPage = () => {
  const navigate = useNavigate();
  const [emails, setEmails] = useState("");
  const [disabled, setDisabled] = useState(false);
  const { login } = useAuth();

  useEffect(() => {
    checkDisabled();
  }, [emails]);

  const checkDisabled = () => {
    const isDisabled = Object.values(emails).some((value) => value === "");
    setDisabled(isDisabled);
  };

  const onChange = (e) => {
    setEmails({ ...emails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (stop) => {
    stop.preventDefault(); // не дає перезавантажити сторінку

    setAlert("progress", "Loading...");

    try {
      const res = await fetch("http://localhost:4000/recovery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emails.email,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setAlert("success", data.message);

        saveSession(data.session);
        login(data.session.user, data.session.token);
        navigate(`/recovery-confirm`);
      } else {
        setAlert("error", data.message);
      }
    } catch (error) {
      setAlert("error", error.message);
    }
  };

  return (
    <Recovery
      handleSubmit={handleSubmit}
      VE={emails.email}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export const RecoveryConfirmPage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    code: "",
    password: "",
  });
  const { stateAuth, login } = useAuth();
  const [disabled, setDisabled] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");

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

    setAlert("progress", "Loading...");

    try {
      const res = await fetch("http://localhost:4000/recovery-confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: Number(values.code),
          password: values.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setAlert("success", data.message);
        login(data.session.token);
        saveSession(data.session);
        navigate("/balance");
      } else {
        setAlert("error", data.message);
      }
    } catch (error) {
      setAlert("error", error.message);
    }
  };

  const handleRenewLinkClick = async (stop) => {
    stop.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:4000/recovery-confirm-code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: getTokenSession() }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.confirm !== undefined) {
          const newCode = data.confirm.code;
          setConfirmationCode(newCode);
        } else {
          console.error("Confirmation code not found in response");
        }
      } else {
        console.error(
          `Error fetching confirmation code: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error fetching confirmation code:", error);
    }
  };

  return (
    <RecoveryConfirm
      handleSubmit={handleSubmit}
      VC={values.code}
      onChange={onChange}
      VP={values.password}
      handleRenewLinkClick={handleRenewLinkClick}
      disabled={disabled}
      AS={alert.status}
      AT={alert.text}
      confirmationCode={confirmationCode}
    />
  );
};
