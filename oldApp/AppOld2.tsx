// import React, { createContext, useContext, useReducer, useState } from "react";

// import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

// import Signup from "./container/signup";
// import Home from "./container/homePage";
// import SignUp from "./container/signup";
// import SignIn from "./container/signin";
// import Recovery from "./container/recovery";
// import RecoveryConfirm from "./container/recovery-confirm";
// import SignUpConfirm from "./container/signup-confirm";

// const WellcomePage: React.FC = () => {
//   return <Home link_one={"/signup"} link_two={"/signin"} />;
// };

// const SignupPage: React.FC = () => {
//   //   const [state, dispatch] = useReducer(reducer, initialState);
//   //   const { state, dispatch } = useContext(AuthContext);

//   //   dispatch({
//   //     type: "LOGIN",
//   //     payload: {
//   //       token: "test", // Замініть на реальний token
//   //       user: { email: string }, // Оновлення лише email
//   //     },
//   //   });

//   //   const [email, setEmail] = useState("");

//   //   const handleSignup = async (email: string) => {
//   //     // ... ваш код реєстрації
//   //     // ... отримання token та даних користувача

//   //     dispatch({
//   //       type: "LOGIN",
//   //       payload: {
//   //         token: "new-token", // Замініть на реальний token
//   //         user: { email }, // Оновлення лише email
//   //       },
//   //     });
//   //   };

//   return <Signup link_three={"/recovery"} />;
// };

// const SigninPage: React.FC = () => {
//   return <SignIn />;
// };

// const SignupConfirmPage: React.FC = () => {
//   return <SignUpConfirm />;
// };

// const RecoveryPage: React.FC = () => {
//   return <Recovery />;
// };

// const RecoveryConfirmPage: React.FC = () => {
//   return <RecoveryConfirm />;
// };

// const BalancePage: React.FC = () => {
//   return <BalancePage />;
// };

// //new
// const AuthContext = createContext(null);

// const ActionTypes = {
//   LOGIN: "LOGIN",
//   LOGOUT: "LOGOUT",
// };

// // можливо слід змінити fuction на const
// function reducer(state, action) {
//   switch (action.type) {
//     case ActionTypes.LOGIN:
//       return {
//         ...state,
//         // isAuthenticated: true,
//         token: action.payload.token,
//         user: action.payload.user,
//       };

//     case ActionTypes.LOGOUT:
//       //   return initialState;
//       return {
//         ...state,
//         token: null,
//         user: null,
//       };

//     default:
//       return state;
//   }
// }

// ///

// //ok
// // const AuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
// //   const { state } = useContext(AuthContext);

// //   return state.token && state.user.isConfirm ? (
// //     <Navigate to={`/balance/${state.user.id}`} />
// //   ) : (
// //     children
// //   );

// //   console.log(state.token);
// // };

// //ok
// // const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
// //   children,
// // }) => {
// //   const { state } = useContext(AuthContext);

// //   // 	}
// //   return state.token ? children : <Navigate to="/signin" />;

// //   //   return state.isAuthenticated ? children : <Navigate to="/signin" replace />;
// // };

// //new
// const initialState = {
//   token: null,
//   user: null,
// };

// function App() {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const useAuth = () => useContext(AuthContext);

//   const AuthRoute = ({ children }) => {
//     const { state } = useAuth();
//     return state.token ? children : <Navigate to="/signin" />;
//   };

//   const PrivateRoute = ({ children }) => {
//     const { state } = useAuth();
//     return state.token ? children : <Navigate to="/signin" />;
//   };

//   const authContextData = { state, dispatch };

//   console.log(authContextData);

//   return (
//     <AuthContext.Provider value={authContextData}>
//       <BrowserRouter>
//         <Routes>
//           <Route
//             index
//             element={
//               <AuthRoute>
//                 <WellcomePage />
//               </AuthRoute>
//             }
//           />
//           <Route
//             path="/signup"
//             element={
//               <AuthRoute>
//                 {/* <SignupPage onSubmit={handleSignup} /> */}
//                 <SignupPage />
//               </AuthRoute>
//             }
//           />
//           <Route
//             path="/signup-confirm"
//             s
//             element={
//               <PrivateRoute>
//                 <SignupConfirmPage />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/signin"
//             element={
//               <AuthRoute>
//                 <SigninPage />
//               </AuthRoute>
//             }
//           />
//           <Route
//             path="/recovery"
//             element={
//               <AuthRoute>
//                 <RecoveryPage />
//               </AuthRoute>
//             }
//           />
//           <Route
//             path="/recovery-confirm"
//             element={
//               <AuthRoute>
//                 <RecoveryConfirmPage />
//               </AuthRoute>
//             }
//           />
//           <Route
//             path="/balance"
//             element={
//               <PrivateRoute>
//                 <BalancePage />
//               </PrivateRoute>
//             }
//           />
//           {/* <Route
//             path="/notifications"
//             element={
//               <PrivateRoute>
//                 <NotificationsPage />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/settings"
//             element={
//               <PrivateRoute>
//                 <SettingsPage />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/recive"
//             element={
//               <PrivateRoute>
//                 <RecivePage />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/send"
//             element={
//               <PrivateRoute>
//                 <SendPage />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/transaction/:transactionId"
//             element={
//               <PrivateRoute>
//                 <TransactionPage />
//               </PrivateRoute>
//             }
//           />
//           <Route path="*" Component={Error} /> */}
//         </Routes>
//       </BrowserRouter>
//     </AuthContext.Provider>
//   );
// }

// export default App;
