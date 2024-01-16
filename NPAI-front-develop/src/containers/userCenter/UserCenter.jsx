import React, { useState } from "react";
import GenericSideBar from "../../components/genericSideBar/GenericSideBar";
import GenericUserHeader from "../../components/genericUserHeader/GenericUserHeader";
import UserTable from "../../components/userTable/UserTable";
import { Navigate } from "react-router-dom";
import "./style.css";

function UserCenter() {
  const [counter, setCounter] = useState("");
  const userRole = sessionStorage.getItem("UserRole");
  const username = sessionStorage.getItem("Username");
  const navigate = true;
  const accessToken = sessionStorage.getItem("Token");

  if (!accessToken) {
    return <Navigate to="/" />;
  }
  if (userRole === "SUPER_USER") {
    var api = `${process.env.REACT_APP_USER_CENTER}`;
    var editAccess = true;
  } else {
    api = `${process.env.REACT_APP_USER_BY_USERNAME}/${username}`;
    editAccess = false;
  }

  return (
    <div className="User-center-container">
      <div className="user-center-sidebar">
        <GenericSideBar />
      </div>
      <div className="user-center-header">
        <GenericUserHeader counter={counter} name="List of all center" />
        <div className="user-center-table">
          <UserTable
            row1="Name"
            row2="Owner"
            row3="Address"
            row4="Telephone"
            row5="Contact Person"
            fetchapi={api}
            accessToken={accessToken}
            handleCount={(data) => setCounter(data)}
            navigate={navigate}
            button
            editAccess={editAccess}
            openSearch={true}
          />
        </div>
      </div>
    </div>
  );
}
export default UserCenter;
