import React from "react";

import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
} from "react";
import { saveSession, getSession } from "./script/session";
import { Navigate } from "react-router-dom";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  WellcomePage,
  SigninPage,
  SignupConfirmPage,
  SignupPage,
  RecoveryPage,
  RecoveryConfirmPage,
} from "./group";

import {
  BalancePage,
  NotificationsPage,
  SettingsPage,
  SendPage,
  ReceivePage,
  TransactionPage,
} from "./group/balance";

const AuthContext = createContext<any>(null);

const initialState = {
  token: null,
  user: null,
};

const ActionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

function authReducer(state: any, action: any) {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        token: null,
        user: null,
      };
    default:
      return state;
  }
}

const AuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { stateAuth } = useContext(AuthContext);

  return stateAuth.token && stateAuth.user.isConfirm ? (
    <Navigate to="/balance" />
  ) : (
    <>{children}</>
  );
};
//

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { stateAuth } = useContext(AuthContext);

  return stateAuth.token && stateAuth.user ? (
    <>{children}</>
  ) : (
    <Navigate to="/" />
  );
};
//

export const useAuth = () => {
  return useContext(AuthContext);
};

function App() {
  const [stateAuth, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const session = getSession();
    if (session) {
      dispatch({
        type: ActionTypes.LOGIN,
        payload: { user: session.user, token: session.token },
      });
    }
  }, []);

  const login = (user: any, token: number) => {
    saveSession({ user, token });
    dispatch({
      type: ActionTypes.LOGIN,
      payload: { user, token },
    });
  };

  const logout = () => {
    saveSession(null);
    dispatch({
      type: ActionTypes.LOGOUT,
    });
  };

  const authContextData = {
    stateAuth,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={authContextData}>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <AuthRoute>
                <WellcomePage />
              </AuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRoute>
                <SignupPage />
              </AuthRoute>
            }
          />
          <Route
            path="/signup-confirm"
            element={
              <PrivateRoute>
                <SignupConfirmPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <AuthRoute>
                <SigninPage />
              </AuthRoute>
            }
          />
          <Route
            path="/recovery"
            element={
              <AuthRoute>
                <RecoveryPage />
              </AuthRoute>
            }
          />
          <Route
            path="/recovery-confirm"
            element={
              <AuthRoute>
                <RecoveryConfirmPage />
              </AuthRoute>
            }
          />
          <Route
            path="/balance"
            element={
              <PrivateRoute>
                <BalancePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <PrivateRoute>
                <NotificationsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/receive"
            element={
              <PrivateRoute>
                <ReceivePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/send"
            element={
              <PrivateRoute>
                <SendPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/transaction/:transactionId"
            element={
              <PrivateRoute>
                <TransactionPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
