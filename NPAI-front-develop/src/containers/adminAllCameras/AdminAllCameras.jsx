import React, { useState } from "react";
import GenericSideBar from "../../components/genericSideBar/GenericSideBar";
import GenericUserHeader from "../../components/genericUserHeader/GenericUserHeader";
import UserTable from "../../components/userTable/UserTable";
import { Navigate } from "react-router-dom";
import "./style.css";

function AdminAllCameras(props) {
  const [counter, setCounter] = useState("");
  const accessToken = sessionStorage.getItem("Token");
  const dontNavigate = false;

  var api = `${process.env.REACT_APP_API_GET_ALL_CAMERAS}`;

  if (!accessToken) {
    return <Navigate to="/" />;
  }

  return (
    <div className="User-center-container">
      <div className="user-center-sidebar">
        <GenericSideBar />
      </div>
      <div className="user-center-header">
        <GenericUserHeader counter={counter} name="List of all webcam" />
        <div className="user-center-table">
          <UserTable
            row1="Name"
            row2="Type"
            row3="Model"
            row4="Physical Address"
            row5="Protocol"
            row6="Center to Associate"
            button
            fetchapi={api}
            accessToken={accessToken}
            handleCount={(data) => setCounter(data)}
            navigate={dontNavigate}
            openSearch={true}
          />
        </div>
      </div>
    </div>
  );
}
export default AdminAllCameras;
