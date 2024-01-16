import React, { useState, useEffect } from "react";
import "./style.css";
import { useCallback } from "react";
import GenericInput from "../../components/genericInput/GenericInput";
import Name_Icon from "../../assets/icons/name-icon.svg";
import Password_Icon from "../../assets/icons/password_icon.svg";
import showPassword from "../../assets/icons/showPassword.svg";
import hidePassword from "../../assets/icons/hidePassword.svg";
import GenericButton from "../../components/genericButton/GenericButton";
import "react-phone-number-input/style.css";
import Type_Icon from "../../assets/icons/type-icon.svg";
import Model_Icon from "../../assets/icons/model-icon.svg";
import Address_Icon from "../../assets/icons/address.svg";
import Protocol_Icon from "../../assets/icons/protocol-icon.svg";
import CentertoAssociate_Icon from "../../assets/icons/centerToAssociate.svg";
import Camera_Icon from "../../assets/icons/camera_new.svg";
import Circle_Icon from "../../assets/icons/shape_new.svg";
import DropDownList from "../../components/dropDownList/DropDownList";
import axios from "axios";
import GenericSideBar from "../../components/genericSideBar/GenericSideBar";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
function RegisterWebcam() {
  const location = useLocation();
  const webcam = location.state ? location.state.webcam : "";
  const [buttonDisable, setButtonDisable] = useState(true);
  const [typePassword, setTypePassword] = useState(true);
  const [dataModelCamera, setDataModelCamera] = useState([]);
  const [dataModelType, setDataModelType] = useState([]);
  const [listOfCenters, setListOfCenters] = useState([]);
  const [name, setName] = useState(`${webcam.name || ""}`);
  const accessToken = sessionStorage.getItem("Token");
  const [physicalAddress, setPhysicalAddress] = useState(
    `${webcam.physicalAddress || ""}`
  );
  const [accessCredentialTypes, setAccessCredentialTypes] = useState([]);
  const [protocol, setProtocol] = useState(
    `${webcam.webcamInteractionProtocolDTO || ""}`
  );
  const [username, setUsername] = useState(
    `${
      webcam["webcamAccessCredentialDTO"]
        ? webcam["webcamAccessCredentialDTO"].username
        : ""
    }`
  );
  const [password, setPassword] = useState(
    `${
      webcam["webcamAccessCredentialDTO"]
        ? webcam["webcamAccessCredentialDTO"].password
        : ""
    }`
  );
  const [modelId, setModelId] = useState(
    `${webcam.modelDTO ? webcam.modelDTO.id : ""}`
  );
  const [typeId, setTypeId] = useState(
    `${webcam.typeDTO ? webcam.typeDTO.id : ""}`
  );
  const [centerId, setCenterId] = useState(`${webcam.centerDTO?.id || ""}`);
  const [accessCredentialType, setAccessCredentialType] = useState(
    `${
      webcam.webcamAccessCredentialDTO
        ? webcam.webcamAccessCredentialDTO.accessCredentialType
        : ""
    }`
  );

  const id = webcam.id ? webcam.id : null;
  const webcamAccessCredentialId = webcam["webcamAccessCredentialDTO"]
    ? webcam["webcamAccessCredentialDTO"].id
    : null;
  const token = sessionStorage.getItem("Token");
  const userRole = sessionStorage.getItem("UserRole");

  if (userRole === "USER") {
    var userId = sessionStorage.getItem("UserId");
  }
  const changeIcon = () => {
    setTypePassword(!typePassword);
  };

  const handleSelectCenter = (e) => {
    setCenterId(e.target.value, buttonEnable(e));
  };
  const handleSelectType = (e) => {
    setTypeId(e.target.value, buttonEnable(e));
  };
  const handleSelectCredentialType = (e) => {
    setAccessCredentialType(e.target.value, buttonEnable(e));
  };

  const handleSelectModel = useCallback(
    (selectedId) => {
      let tempId;
      if (typeof selectedId === "object") {
        tempId = selectedId.target.value;
        setModelId(selectedId.target.value);
      } else {
        tempId = selectedId;
        setModelId(selectedId);
      }
      try {
        setDataModelType(
          dataModelCamera.filter(
            (model) => JSON.stringify(model.id) === tempId
          )[0]["webcamTypeDTOs"]
        );
      } catch (e) {
        setDataModelType([webcam.typeDTO ? webcam.typeDTO : ""]);
      }
    },
    [dataModelCamera, webcam.typeDTO]
  );

  useEffect(() => {
    handleSelectModel(webcam.modelDTO ? webcam.modelDTO.id : "");
    axios
      .get(`${process.env.REACT_APP_GET_USER_ID}${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDataModelCamera(res.data["modelsDTO"]);
        setListOfCenters(res.data["centersDTO"]);
        setAccessCredentialTypes(
          res.data["webcamAccessCredentialType"].map((el) =>
            Object.assign({ desc: el, value: el })
          )
        );
      })
      .catch((err) => console.log(err), []);
  }, [token, userId]);

  if (!accessToken) {
    return <Navigate to="/" />;
  }
  const handleRegisterWebcam = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_REGISTER_WEBCAM}`,
        {
          id,
          username: sessionStorage.getItem("Username"),
          name,
          modelId,
          typeId,
          physicalAddress,
          protocol,
          centerId,

          webcamAccessCredentialDTO: {
            id: webcamAccessCredentialId,
            username,
            password,
            accessCredentialType,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(
        `Webcam ${location.state ? "updated" : "registered"} succesfully`,
        {
          autoClose: 500,
        }
      );
      setTimeout(() => {
        location.state
          ? (window.location.href = "http://localhost:3000/user-center")
          : window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("Please complete all the fields", {
        autoClose: 500,
      });
    }
  };

  const buttonEnable = (e) => {
    const inputValue = e.target.value;
    if (
      webcam.webcamInteractionProtocolDTO !== inputValue &&
      webcam.name !== inputValue &&
      webcam.physicalAddress !== inputValue &&
      webcam.username !== inputValue &&
      webcam.password !== inputValue
    ) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  };
  return (
    <div className="registerwebcam-user">
      <div className="register-webcam-container">
        <GenericSideBar updateWebcam={webcam ? false : true} />
        <form
          className="register-webcam-modal-holder"
          onSubmit={handleRegisterWebcam}
        >
          <h1>{location.state ? "Update Webcam" : " Register Webcam"}</h1>
          <div className="register-webcam-inline-input">
            <div className="input-content-holder">
              <GenericInput
                icon={Name_Icon}
                input_label="Name "
                placeholder="Enter camera name"
                label="Name"
                asterik="*"
                required={true}
                value={name}
                onChange={(e) => setName(e.target.value, buttonEnable(e))}
              />
            </div>
          </div>
          <div className="register-webcam-inline-input">
            <div className="webcam-input-content-holder">
              <DropDownList
                value={modelId}
                icon={Model_Icon}
                DropDownListData={dataModelCamera}
                handleSelectDropdown={handleSelectModel}
                input_label="Model "
                placeholder="Model"
                label="model"
                asterik="*"
              />
            </div>
            <div className="white-space"></div>
            <div className="webcam-input-content-holder">
              <DropDownList
                value={typeId}
                icon={Type_Icon}
                DropDownListData={dataModelType}
                handleSelectDropdown={handleSelectType}
                input_label="Type "
                placeholder="Type"
                label="Type"
                asterik="*"
              />
            </div>
          </div>
          <div className="register-webcam-inline-input">
            <div className="webcam-input-content-holder">
              <GenericInput
                value={physicalAddress}
                icon={Address_Icon}
                input_label="Physical Address "
                placeholder="Enter camera address"
                label="address"
                asterik="*"
                required={true}
                onChange={(e) =>
                  setPhysicalAddress(e.target.value, buttonEnable(e))
                }
              />
            </div>
            <div className="white-space"></div>
            <div className="webcam-input-content-holder">
              <GenericInput
                value={protocol}
                icon={Protocol_Icon}
                input_label="URI "
                placeholder="Protocol"
                label="protocol"
                asterik="*"
                required={true}
                onChange={(e) => setProtocol(e.target.value, buttonEnable(e))}
              />
            </div>
          </div>
          <div className="register-webcam-inline-input">
            <div className="webcam-input-content-holder">
              <DropDownList
                value={centerId}
                DropDownListData={listOfCenters}
                handleSelectDropdown={handleSelectCenter}
                asterik=" *"
                input_label="Center to associate"
                icon={CentertoAssociate_Icon}
                required={true}
              />
            </div>
            <div className="white-space"></div>
            <div className="webcam-input-content-holder">
              <DropDownList
                value={accessCredentialType}
                DropDownListData={accessCredentialTypes}
                asterik=" *"
                input_label="Credential type"
                icon={CentertoAssociate_Icon}
                handleSelectDropdown={handleSelectCredentialType}
                required={true}
              />
            </div>
          </div>
          <div className="register-webcam-inline-input">
            <div className="webcam-input-content-holder">
              <GenericInput
                value={username}
                input_label="User "
                icon={Name_Icon}
                placeholder="User"
                label="user"
                asterik="*"
                required={true}
                onChange={(e) => setUsername(e.target.value, buttonEnable(e))}
              />
            </div>
            <div className="white-space"></div>
            <div className="webcam-input-content-holder">
              <GenericInput
                value={password}
                icon={Password_Icon}
                passwordIcon={typePassword ? hidePassword : showPassword}
                input_label="Password "
                placeholder="********"
                label="Password"
                type={typePassword ? "password" : "text"}
                passwordInput={true}
                isPassword={true}
                onClickIcon={changeIcon}
                asterik="*"
                required={true}
                onChange={(e) => setPassword(e.target.value, buttonEnable(e))}
              />
            </div>
          </div>

          <div className="div-register-webcam-button">
            <GenericButton
              name={location.state ? "Update" : "Register"}
              disabled={buttonDisable}
            />
          </div>
        </form>
      </div>
      <div className="div-register-webcam-camera">
        <img
          className="img-register-webcam-camera"
          alt="camera"
          src={Camera_Icon}
        />
      </div>
      <div className="div-register-webcam-circle">
        <img
          className="img-register-webcam-circle"
          alt="circle"
          src={Circle_Icon}
        />
      </div>
    </div>
  );
}

export default RegisterWebcam;
