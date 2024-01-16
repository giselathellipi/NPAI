import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Navbar() {
  return (
    <div className="navbar-container" style={{ display: "flex" }}>
      <Link to="/">
        <div>Login</div>
      </Link>
      &nbsp;&nbsp;
      <Link to="/register-user">
        <div>Register user</div>
      </Link>
      &nbsp;&nbsp;
      <Link to="/register-camera">
        <div>Register Camera</div>
      </Link>
      &nbsp;&nbsp;
      <Link to="/register-webcam">
        <div>Register Webcam</div>
      </Link>
    </div>
  );
}

export default Navbar;
