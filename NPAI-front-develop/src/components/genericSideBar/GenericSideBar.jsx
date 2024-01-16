import React from "react";
import "./style.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import typeIcon from "../../assets/icons/type-icon.svg";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import CameraIndoorIcon from "@mui/icons-material/CameraIndoor";
import CameraRollIcon from "@mui/icons-material/CameraRoll";
import StorageIcon from "@mui/icons-material/Storage";
import { toast, Flip } from "react-toastify";

function GenericSideBar(props) {
  const role = sessionStorage.getItem("UserRole");
  let accessAdmin = false;
  let updatingWebcam = props.updateWebcam;
  let updatingCenter = props.updateCenter;

  if (updatingWebcam === undefined) {
    updatingWebcam = true;
  }
  if (updatingCenter === undefined) {
    updatingCenter = true;
  }
  if (role === "SUPER_USER") {
    accessAdmin = true;
  }

  return (
    <div id="sideBar-specifics" className="sidebar">
      <div className="sidebar-items">
        <img src={typeIcon} alt="Icon" className="type-icon" />
        <div className="center">
          <ul>
            <Link to="/user-center">
              <li>
                <DashboardIcon className="icon" />
                <span id="hoverIcon">User Center</span>
              </li>
            </Link>
            {accessAdmin && (
              <Link to="/all-webcams">
                <li>
                  <CameraIndoorIcon className="icon" />
                  <span id="hoverIcon">All Cameras</span>
                </li>
              </Link>
            )}
            {accessAdmin && (
              <Link to="/webcamtype">
                <li>
                  <CameraRollIcon className="icon" />
                  <span id="hoverIcon">Webcam Type</span>
                </li>
              </Link>
            )}
            {accessAdmin && (
              <Link to="/all-logs">
                <li>
                  <StorageIcon className="icon" />
                  <span id="hoverIcon">All Logs</span>
                </li>
              </Link>
            )}
            {updatingCenter && accessAdmin && (
              <Link to="/register-center">
                <li>
                  <MapsHomeWorkIcon className="icon" />
                  <span id="hoverIcon">Register Center</span>
                </li>
              </Link>
            )}
            {accessAdmin && (
              <Link to="/register-user">
                <li>
                  <PersonAddIcon className="icon" />
                  <span id="hoverIcon">Register User</span>
                </li>
              </Link>
            )}
            {updatingWebcam && (
              <Link to="/register-webcam">
                <li>
                  <VideoCallIcon className="icon" />
                  <span id="hoverIcon">Register Webcam</span>
                </li>
              </Link>
            )}
            <Link to="/user-setting">
              <li>
                <SettingsApplicationsIcon className="icon" />
                <span id="hoverIcon">Settings</span>
              </li>
            </Link>
            <div className="logout">
              <Link
                to="/"
                onClick={() => [
                  sessionStorage.removeItem("Token"),
                  sessionStorage.removeItem("UserRole"),
                  sessionStorage.removeItem("Username"),
                  sessionStorage.removeItem("CenterId"),
                  toast("Logged Out", {
                    autoClose: 500,
                    hideProgressBar: true,
                    theme: "colored",
                    closeOnClick: true,
                    draggable: false,
                    transition: Flip,
                  }),
                ]}
              >
                <li>
                  <ExitToAppIcon className="icon" />
                  <span id="hoverIcon">Logout</span>
                </li>
              </Link>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GenericSideBar;
