import React, { useState, useRef } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import GenericButton from "../../components/genericButton/GenericButton";
import GenericInput from "../../components/genericInput/GenericInput";
import Email_Icon from "../../assets/icons/email-icon.svg";
import Password_Icon from "../../assets/icons/password_icon.svg";
import showPassword from "../../assets/icons/showPassword.svg";
import hidePassword from "../../assets/icons/hidePassword.svg";
import Camera_Icon from "../../assets/icons/camera_new.svg";
import Circle_Icon from "../../assets/icons/shape_new.svg";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [typePassword, setTypePassword] = useState(true);
  const username = useRef();
  const password = useRef();

  const changeIcon = () => {
    setTypePassword(!typePassword);
  };

  const buttonHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_LOGIN}`,
        {
          username: username.current.value,
          password: password.current.value,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      //decode the jwt token
      sessionStorage.setItem("UserId", response.data.user_id);
      const accessToken = response.data.access_token;
      sessionStorage.setItem("Token", accessToken);
      sessionStorage.setItem("Username", response.data.username);
      function parseJwt(token) {
        var base64Url = token.split(".")[1];
        var base64 = decodeURIComponent(
          atob(base64Url)
            .split("")
            .map((c) => {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );

        return JSON.parse(base64);
      }
      const userInfo = parseJwt(accessToken);
      sessionStorage.setItem("UserRole", userInfo.roles[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Bad credentials", {
        autoClose: 1000,
        hideProgressBar: true,
        theme: "light",
      });
    }
  };
  const auth = sessionStorage.getItem("Token");
  const userRole = sessionStorage.getItem("UserRole");
  if (userRole !== "CENTER" && auth) {
    return <Navigate to="/user-center" />;
  }

  return (
    <div className="login-container">
      <form className="login-modal-holder" onSubmit={buttonHandler}>
        <h1>Login</h1>
        <div className="login-input">
          <GenericInput
            icon={Email_Icon}
            input_label="Username"
            placeholder="yourname@email.com"
            label="Firstname"
            asterik="*"
            inputRef={username}
          />
        </div>
        <div className="login-input">
          <GenericInput
            icon={Password_Icon}
            passwordIcon={typePassword ? hidePassword : showPassword}
            input_label="Password "
            placeholder="********"
            label="Password"
            passwordInput={true}
            type={typePassword ? "password" : "text"}
            isPassword={true}
            inputRef={password}
            onClickIcon={changeIcon}
          />
        </div>
        <GenericButton name="Submit" />
        <div className="login-text">
          <Link to="/forgot-password">
            <p>Forgot password?</p>
          </Link>
        </div>
      </form>
      <div className="div-camera">
        <img className="img-camera" alt="camera" src={Camera_Icon} />
      </div>
      <div className="div-circle">
        <img className="img-circle" alt="circle" src={Circle_Icon} />
      </div>
    </div>
  );
}

export default Login;
