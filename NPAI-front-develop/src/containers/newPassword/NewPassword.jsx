import React, { useState } from "react";
import "./style.css";
import GenericButton from "../../components/genericButton/GenericButton";
import GenericInput from "../../components/genericInput/GenericInput";
import Password_Icon from "../../assets/icons/password_icon.svg";
import showPassword from "../../assets/icons/showPassword.svg";
import hidePassword from "../../assets/icons/hidePassword.svg";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
function NewPassword() {
  const [typeOldPassword, setTypeOldPassword] = useState(true);
  const [typeNewPassword, setTypeNewPassword] = useState(true);
  const [typeConfirmPassword, setTypeConfirmPassword] = useState(true);
  const token = sessionStorage.getItem("Token");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!token) {
    return <Navigate to="/" />;
  }

  const showHideOldPassword = () => {
    setTypeOldPassword(!typeOldPassword);
  };
  const showHideNewPassword = () => {
    setTypeNewPassword(!typeNewPassword);
  };
  const showHideConfirmPassword = () => {
    setTypeConfirmPassword(!typeConfirmPassword);
  };

  const handleConfirmPassword = async (e) => {
    e.preventDefault();
    if (newPassword === "" || confirmPassword === "") {
      toast.warning("You have to add a password for this user");
    } else if (newPassword === confirmPassword) {
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_API_CHANGE_PASSWORD}`,
          {
            userId: sessionStorage.getItem("UserId"),
            username: sessionStorage.getItem("Username"),
            oldPassword: password,
            newPassword: newPassword,
          },

          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if ((response.status = 200)) {
          toast.success("User registered succesfully");
          setTimeout(() => {
            window.location.href = "http://localhost:3000/user-center";
          }, 2000);
        }
      } catch (error) {
        if (error.response.status === 417) {
          toast.error(error.response.data);
        }
      }
    } else {
      toast.warning("New password and confirm password should match");
    }
  };

  return (
    <div className="confirm-pass-container">
      <form
        className="confirm-pass-modal-holder"
        onSubmit={handleConfirmPassword}
      >
        <h1>Change password</h1>
        <div className="confirm-pass-input">
          <GenericInput
            icon={Password_Icon}
            passwordIcon={typeOldPassword ? hidePassword : showPassword}
            input_label="Old password "
            asterik="*"
            placeholder="********"
            label="Password"
            required={true}
            passwordInput={true}
            type={typeOldPassword ? "password" : "text"}
            isPassword={true}
            onClickIcon={showHideOldPassword}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="confirm-pass-input">
          <GenericInput
            icon={Password_Icon}
            passwordIcon={typeNewPassword ? hidePassword : showPassword}
            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
            input_label="New Password "
            asterik="*"
            placeholder="********"
            label="Password"
            required={true}
            passwordInput={true}
            type={typeNewPassword ? "password" : "text"}
            isPassword={true}
            onClickIcon={showHideNewPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="confirm-pass-input">
          <GenericInput
            icon={Password_Icon}
            passwordIcon={typeConfirmPassword ? hidePassword : showPassword}
            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
            input_label="Confirm Password "
            asterik="*"
            placeholder="********"
            label="Password"
            required={true}
            passwordInput={true}
            type={typeConfirmPassword ? "password" : "text"}
            isPassword={true}
            onClickIcon={showHideConfirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="change-password-info">
          <p> Password must contain a minimum of 8 characters </p>
          <p> Password must contain at least one letter and one number ! </p>
        </div>
        <GenericButton className="confirm-pass-button" name="Submit" />
      </form>
    </div>
  );
}

export default NewPassword;
