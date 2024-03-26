import { useEffect, useState } from "react";
import { saveSession, getTokenSession } from "../script/session";
import { Navigate, useParams } from "react-router-dom";

import { useNavigate, useLocation } from "react-router-dom";
import { setAlert } from "../component/alert";
import { useAuth } from "../App";

import Balance from "../container/balance";
import Settings from "../container/settings";
import Receive from "../container/receive";
import Notifications from "../container/notifications";
import Send from "../container/send";
import Transaction from "../container/transaction";

// Pages

export const BalancePage = () => {
  const [data, setData] = useState(null);
  const { stateAuth, logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/balance?token=${stateAuth.token}`
        );

        const data = await response.json();

        setData(data);
        stateAuth.user.isConfirm = true;
      } catch (error) {
        logout();
        console.error("Error fetching balance data:", error);
      }
    };

    fetchData();
  }, []);

  if (!stateAuth.user.isConfirm) {
    return <Navigate to="/signup-confirm" />;
  }

  return <Balance data={data} />;
};

export const SettingsPage = () => {
  const { logout } = useAuth();
  return <Settings logout={logout} />;
};

export const ReceivePage = () => {
  const { stateAuth } = useAuth();
  const [errorMessages, setErrorMessages] = useState([]);

  const navigate = useNavigate();
  const [values, setValues] = useState({
    amount: "",
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

  const handleSubmitStripe = async (stop) => {
    stop.preventDefault();

    setAlert("progress", "Loading");

    try {
      const res = await fetch("http://localhost:4000/receive-stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: values.amount,
          token: stateAuth.token,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setAlert("success", data.message);
        saveSession(data.session);
        navigate("/balance");
      } else {
        setAlert("error", data.message);
      }
    } catch (error) {
      setAlert("error", error.message);
    }
  };

  const handleSubmitCoin = async (stop) => {
    stop.preventDefault();

    setAlert("progress", "Loading");

    try {
      const res = await fetch("http://localhost:4000/receive-coin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: values.amount,
          token: stateAuth.token,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setAlert("success", data.message);
        saveSession(data.session);
        navigate("/balance");
      } else {
        setAlert("error", data.message);
      }
    } catch (error) {
      setAlert("error", error.message);
    }
  };

  return (
    <Receive
      value={values.amount}
      //   onChange={handleInputChange}
      onChange={onChange}
      errorMessages={errorMessages}
      onClickStripe={handleSubmitStripe}
      onClickCoin={handleSubmitCoin}
      disabled={disabled}
    />
  );
};

export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const { stateAuth } = useAuth();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/notifications?token=${stateAuth.token}`
        );

        const data = await response.json();

        if (Array.isArray(data.notifications)) {
          setNotifications(data.notifications);
        } else {
          console.error(
            "Error fetching notifications:",
            data.error || "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    if (stateAuth.token) {
      fetchNotifications();
    }
  }, [stateAuth.token]);

  return <Notifications notifications={notifications} />;
};

export const SendPage = () => {
  const { stateAuth, login } = useAuth();
  const [errorMessages, setErrorMessages] = useState([]);

  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    amount: "",
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
      const res = await fetch("http://localhost:4000/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          amount: values.amount,
          token: stateAuth.token,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setAlert("success", data.message);
        saveSession(data.session);

        navigate("/balance");
      } else {
        setAlert("error", data.message);
      }
    } catch (error) {
      setAlert("error", error.message);
    }
  };

  return (
    <Send
      valueEmail={values.email}
      valueAmount={values.amount}
      onChange={onChange}
      errorMessages={errorMessages}
      onClick={handleSubmit}
      disabled={disabled}
    />
  );
};

export const TransactionPage = () => {
  const [data, setData] = useState(null);
  const [transactionType, setTransactionType] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);

  const { transactionId } = useParams();

  const { stateAuth } = useAuth();
  const location = useLocation();

  const convertDate = (date) => {
    if (!date) {
      return "N/A";
    }

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate().toString();
    const month = months[date.getMonth()];
    const hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();

    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${day} ${month}, ${hours}:${minutes}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/transaction?token=${stateAuth.token}&transactionId=${transactionId}`
        );

        const data = await response.json();
        const transactionData = data.transaction;
        const formattedDate = convertDate(new Date(transactionData.date));

        setData({
          ...data,
          transaction: {
            ...transactionData,
            date: formattedDate,
          },
        });
        setTransactionType(transactionData.type);
        setFormattedDate(formattedDate);
      } catch (error) {
        console.error("Error fetching balance data:", error);
      }
    };

    if (stateAuth.token && transactionId) {
      fetchData();
    }
  }, []);

  return <Transaction data={data} transactionType={transactionType} />;
};

// ===========================================
