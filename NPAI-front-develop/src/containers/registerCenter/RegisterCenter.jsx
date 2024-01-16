import React, { useState, useEffect } from "react";
import "./style.css";
import GenericInput from "../../components/genericInput/GenericInput";
import Name_Icon from "../../assets/icons/name-icon.svg";
import Contact_Icon from "../../assets/icons/contact.svg";
import Address_Icon from "../../assets/icons/address.svg";
import GenericButton from "../../components/genericButton/GenericButton";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Camera_Icon from "../../assets/icons/camera_new.svg";
import Circle_Icon from "../../assets/icons/shape_new.svg";
import axios from "axios";
import GenericSideBar from "../../components/genericSideBar/GenericSideBar";
import GenericSelectorDropDown from "../../components/genericSelectorDropDown/GenericSelectorDropDown";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
function RegisterCenter(props) {
  const location = useLocation();
  const center = location.state ? location.state.center : "";
  const usersMultiselectID = center
    ? center.usersDTO.map((user) => [{ id: user.id }]).flat()
    : [];
  const [tel, setTel] = useState(`${center.tel || ""}`);
  const [name, setName] = useState(`${center.name || ""}`);
  const [owner, setOwner] = useState(`${center.owner || ""}`);
  const [address, setAddress] = useState(`${center.address || ""}`);
  const [contact, setContact] = useState(`${center.contact || ""}`);
  const [users, setUsers] = useState([]);
  const [usersDTO, setUsersDTO] = useState(usersMultiselectID);
  const id = center.id ? center.id : null;
  const accessToken = sessionStorage.getItem("Token");
  const usersMultiselectNames = center
    ? center.usersDTO
        .map((user) => [{ username: user.username, id: user.id }])
        .flat()
    : [];
  const [buttonDisable, setButtonDisable] = useState(true);
  const currentUsersID = usersDTO.map((user) => user.id);
  const pickedUsersID = usersMultiselectNames.map((user) => user.id);

  useEffect(() => {
    if (
      center.name === name &&
      center.owner === owner &&
      center.address === address &&
      center.tel === tel &&
      arrayCompare(currentUsersID, pickedUsersID)
    ) {
      setButtonDisable(true);
    } else {
      setButtonDisable(false);
    }
  }, [
    name,
    owner,
    address,
    tel,
    contact,
    arrayCompare(currentUsersID, pickedUsersID),
    center.name,
    center.owner,
    center.address,
    center.tel,
    center.contact,
  ]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_GET_USERS}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.log("error is", err), []);
  }, [accessToken]);

  if (!accessToken) {
    return <Navigate to="/" />;
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_REGISTER_CENTER}`,
        { id, name, owner, contact, address, tel, usersDTO },

        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success(
        `Center ${location.state ? "Update" : "Register"} succesfully`
      );
      setTimeout(() => {
        location.state
          ? (window.location.href = "http://localhost:3000/user-center")
          : window.location.reload();
      }, 1000);
    } catch (error) {
      console.log("error is", error);
    }
  };

  function arrayCompare(_arr1, _arr2) {
    if (_arr1.length !== _arr2.length) {
      return false;
    }
    const arr1 = _arr1.concat().sort(function (a, b) {
      return a - b;
    });
    const arr2 = _arr2.concat().sort(function (a, b) {
      return a - b;
    });
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] === arr2[i]) {
        return true;
      }
    }
    return false;
  }

  // const buttonEnable = (e) => {
  //   const inputValue = e.target.value;
  //   console.log("come here");
  //   if (
  //     center.name !== inputValue &&
  //     center.owner !== inputValue &&
  //     center.address !== inputValue &&
  //     center.tel !== inputValue &&
  //     center.contact !== inputValue &&
  //     arrayCompare(currentUsersID, pickedUsersID)
  //   ) {
  //     setButtonDisable(false);
  //   } else {
  //     setButtonDisable(true);
  //   }
  // };

  return (
    <div className="register-camera-container">
      <GenericSideBar updateCenter={center ? false : true} />
      <form className="registercamera-content-holder" onSubmit={handleRegister}>
        <h1>{location.state ? "Update" : "Register"} Center</h1>
        <div className="registercamera-inline-input">
          <div className="input-container">
            <GenericInput
              icon={Name_Icon}
              input_label="Name "
              placeholder="Enter center name"
              label="Name"
              asterik="*"
              value={name}
              required={true}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-container">
            <GenericInput
              icon={Name_Icon}
              input_label="Owner "
              placeholder="Owner name"
              label="owner"
              asterik="*"
              value={owner}
              required={true}
              onChange={(e) => setOwner(e.target.value)}
            />
          </div>
        </div>
        <div className="adress-input-container-registerCamera">
          <GenericInput
            input_label="Address "
            icon={Address_Icon}
            placeholder="Address "
            label="address"
            asterik="*"
            value={address}
            required={true}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="registercamera-inline-input">
          <div className="phone-holder input-container">
            <div className="label_desc">
              <label>Telephone </label>
              <span>*</span>
            </div>
            <div className="input-container">
              <PhoneInput
                defaultCountry="IT"
                className="PhoneNumber_input"
                value={tel}
                required={true}
                onChange={setTel}
                placeholder="+355 78 90 789"
              />
            </div>
          </div>
          <div className="adress-input-container-registerCamera">
            <GenericInput
              icon={Contact_Icon}
              input_label="Contact "
              placeholder="Contact"
              label="contact"
              asterik="*"
              value={contact}
              required={true}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
        </div>
        <div className="input-container">
          <GenericSelectorDropDown
            icon={Name_Icon}
            input_label="Users Access"
            asterik="*"
            value={usersDTO}
            users={users}
            getId={setUsersDTO}
            required={true}
            selectedUser={usersMultiselectNames}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div className="div-register-camera-button">
          <GenericButton
            name={location.state ? "Update" : "Register"}
            disabled={center.tel === tel && buttonDisable}
          />
        </div>
        <div className="div-camera-registerCamera">
          <img className="img-camera" alt="camera" src={Camera_Icon} />
        </div>
        <div className="div-circle-registerCamera">
          <img className="img-camera" alt="circle" src={Circle_Icon} />
        </div>
      </form>
    </div>
  );
}

export default RegisterCenter;
