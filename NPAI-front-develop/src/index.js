import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { toast, ToastContainer, Flip } from "react-toastify";
const root = ReactDOM.createRoot(document.getElementById("root"));
setTimeout(() => {
  sessionStorage.removeItem("Token");
  toast("Logged Out", {
    autoClose: 500,
    hideProgressBar: true,
    theme: "colored",
    closeOnClick: true,
    draggable: false,
    transition: Flip,
  });
}, 18000000);
root.render(
  <BrowserRouter>
    <App />
    <ToastContainer limit={1} />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
