import React, { useState } from "react";
import GenericSideBar from "../../components/genericSideBar/GenericSideBar";
import GenericUserHeader from "../../components/genericUserHeader/GenericUserHeader";
import UserTable from "../../components/userTable/UserTable";
import { Navigate } from "react-router-dom";
import CenterDetails from "../../components/detailsOfCenter/CenterDetails";
import { useLocation } from "react-router-dom";
import "./style.css";

function UserWebcam(props, { route }) {
  const location = useLocation();
  const [counter, setCounter] = useState("");
  const accessToken = sessionStorage.getItem("Token");
  const userRole = sessionStorage.getItem("UserRole");
  const username = sessionStorage.getItem("Username");
  const centerId = sessionStorage.getItem("CenterId");
  const centerClicked = location.state ? location.state.centerClicked : "";
  let index = location.state?.data.map((e) => e.id).indexOf(centerClicked);
  console.log(location);
  const centerData = location.state ? location.state.data[index] : "";
  const dontNavigate = false;
  if (!accessToken) {
    return <Navigate to="/" />;
  }
  if (userRole === "SUPER_USER") {
    var api = `${process.env.REACT_APP_GET_USER_WEBCAM_ID}/${centerId}`;
  } else {
    api = `${process.env.REACT_APP_USER_WEBCAM}/${centerId}/${username}`;
  }

  return (
    <div className="User-center-container">
      <div className="user-center-sidebar">
        <GenericSideBar />
      </div>

      <div className="user-center-header">
        <GenericUserHeader counter={counter} name="List of all webcam" />
        <CenterDetails
          name={centerData.name}
          owner={centerData.owner}
          address={centerData.address}
          tel={centerData.tel}
          contact={centerData.contact}
        />

        <div className="user-center-table">
          <UserTable
            row1="Name"
            row2="Type"
            row3="Model"
            row4="Physical Address"
            row5="Protocol"
            button
            fetchapi={api}
            accessToken={accessToken}
            handleCount={(data) => setCounter(data)}
            navigate={dontNavigate}
            openSearch={true}
            editAccess
          />
        </div>
      </div>
    </div>
  );
}
export default UserWebcam;
