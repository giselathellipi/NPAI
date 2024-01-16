import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import GenericButton from "../../components/genericButton/GenericButton";
import GenericInput from "../../components/genericInput/GenericInput";
import Email_Icon from "../../assets/icons/email-icon.svg";
import Camera_Icon from "../../assets/icons/camera_new.svg";
import Circle_Icon from "../../assets/icons/shape_new.svg";
// import axios from "axios";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const buttonHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="forgotpass-container">
      <form className="forgotpass-modal-holder" onSubmit={buttonHandler}>
        <h1>Forgot Password?</h1>
        <h2>We will send you an email to confirm the new password !</h2>
        <div className="forgotpass-input">
          <GenericInput
            icon={Email_Icon}
            input_label="Email "
            placeholder="yourname@email.com"
            label="Firstname"
            asterik="*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <GenericButton name="Submit" />
        <div className="forgotpass-text">
          <Link to="/">
            <p>Back Login</p>
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

export default ForgotPassword;
