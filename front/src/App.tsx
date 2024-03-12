import React, { createContext, useContext, useReducer, useState } from "react";

import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import WelcomePage from "./container/homePage";
import SignupPage from "./container/signup";
import Home from "./container/homePage";
import SigninPage from "./container/signin";
import RecoveryPage from "./container/recovery";
import RecoveryConfirmPage from "./container/recovery-confirm";
import SignupConfirmPage from "./container/signup-confirm";

import { AuthProvider } from "./auth/authContext";
import AuthRoute from "./auth/authRoute";
import PrivateRoute from "./auth/privateRoute";

function App() {
  return (
    <div>
      <AuthProvider
        elem={
          <BrowserRouter>
            <Routes>
              <Route
                index
                element={
                  <AuthRoute>
                    <WelcomePage />
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
                element={<PrivateRoute children={<SignupConfirmPage />} />}
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

              {/* <Route
            path="/balance/:id"
            element={<PrivateRoute children={<BalancePage />} />}
          />

          <Route
            path="/receive/:id"
            element={<PrivateRoute children={<RecivePage />} />}
          />

          <Route
            path="/send/:id"
            element={<PrivateRoute children={<SendPage />} />}
          />

          <Route
            path="/settings/:id"
            element={<PrivateRoute children={<SettingsPage />} />}
          />

          <Route
            path="/transaction/:transactionId"
            element={<PrivateRoute children={<TransactionPage />} />}
          />

          <Route
            path="/notifications/:id"
            element={<PrivateRoute children={<NotificationsPage />} />}
          /> */}
            </Routes>
          </BrowserRouter>
        }
      />
    </div>
  );
}

export default App;
