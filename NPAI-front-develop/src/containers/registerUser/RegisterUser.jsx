import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import GenericInput from "../../components/genericInput/GenericInput";
import Name_Icon from "../../assets/icons/name-icon.svg";
import Email_Icon from "../../assets/icons/email-icon.svg";
import Password_Icon from "../../assets/icons/password_icon.svg";
import showPassword from "../../assets/icons/showPassword.svg";
import hidePassword from "../../assets/icons/hidePassword.svg";
import GenericButton from "../../components/genericButton/GenericButton";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Camera_Icon from "../../assets/icons/camera_new.svg";
import Circle_Icon from "../../assets/icons/shape_new.svg";
import axios from "axios";
import { toast } from "react-toastify";
import GenericSideBar from "../../components/genericSideBar/GenericSideBar";
import DropDownList from "../../components/dropDownList/DropDownList";
import UserRole from "../../assets/icons/surname-icon.svg";
import { Navigate } from "react-router-dom";

function RegisterUser() {
  const [typePassword, setTypePassword] = useState(true);
  const [typeConfirmPassword, setTypeConfirmPassword] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState();
  // const [isError, setIsError] = useState("");
  const name = useRef();
  const surname = useRef();
  const email = useRef();
  const company = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const username = useRef();
  const [userRole, setUserRole] = useState([]);
  const [roles, setRoles] = useState([]);
  const token = sessionStorage.getItem("Token");

  const showHidePassword = () => {
    setTypePassword(!typePassword);
  };
  const showHideConfirmPassword = () => {
    setTypeConfirmPassword(!typeConfirmPassword);
  };
  const handleSelectUserRole = (role) => {
    setRoles([{ id: role.target.value }]);
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password === "" || confirmPassword === "") {
      toast.warning("You have to add a password for this user");
    } else if (password.current.value === confirmPassword.current.value) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_REGISTER_USERS}`,
          {
            name: name.current.value,
            surname: surname.current.value,
            phoneNumber,
            company: company.current.value,
            email: email.current.value,
            password: password.current.value,
            username: username.current.value,
            roles,
            enabled: true,
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
            window.location.reload();
          }, 1500);
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 417) {
          toast.error("Try another email");
        } else if (error.response.status === 409) {
          toast.error(error.response.data.message);
        }
      }
    } else {
      toast.warning("Password and confirm password should match");
    }
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_GET_USER_ROLE}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUserRole(res.data))
      .catch((err) => console.log("error is", err), []);
  }, [token]);

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="register-user">
      <div className="register-container">
        <GenericSideBar />
        <form className="register-modal-holder" onSubmit={handleRegister}>
          <h1>Register User</h1>
          <div className="inline-input">
            <div className="input-content-holder">
              <GenericInput
                icon={Name_Icon}
                input_label="Name "
                placeholder="Enter your name"
                required={true}
                label="Name"
                asterik="*"
                inputRef={name}
              />
            </div>
            <div className="white-space-div"></div>
            <div className="input-content-holder">
              <GenericInput
                icon={Name_Icon}
                input_label="Surname "
                placeholder="Enter your surname"
                required={true}
                label="Surname"
                asterik="*"
                inputRef={surname}
              />
            </div>
          </div>
          <div className="inline-input">
            <div className="phoneno-holder input-content-holder">
              <div>
                <label> Telephone </label> <span> * </span>
              </div>
              <PhoneInput
                country={"us"}
                value={phoneNumber}
                onChange={setPhoneNumber}
                placeholder="+355 68 8101124"
                required={true}
                className="phoneNumber_input"
              />
            </div>
            <div className="white-space-div"></div>
            <div className="input-content-holder">
              <GenericInput
                icon={Email_Icon}
                input_label="Email "
                placeholder="yourname@email.com"
                required={true}
                label="email"
                asterik="*"
                inputRef={email}
                type="email"
              />
            </div>
          </div>
          <div className="company-content-holder">
            <GenericInput
              input_label="Company "
              icon={Name_Icon}
              placeholder="Company name"
              required={true}
              label="company"
              asterik="*"
              inputRef={company}
            />
          </div>
          <div className="inline-input">
            <div className="input-content-holder">
              <GenericInput
                icon={Name_Icon}
                input_label="Username "
                placeholder="Enter your username"
                required={true}
                label="Username"
                asterik="*"
                inputRef={username}
              />
            </div>
            <div className="white-space-div"></div>
            <div className="input-content-holder">
              <DropDownList
                multiple={false}
                value={roles.id}
                DropDownListData={userRole}
                asterik="*"
                input_label="User Role "
                icon={UserRole}
                handleSelectDropdown={(e) => handleSelectUserRole(e)}
                required={true}
              />
            </div>
          </div>
          <div className="inline-input">
            <div className="input-content-holder">
              <GenericInput
                icon={Password_Icon}
                passwordIcon={typePassword ? hidePassword : showPassword}
                input_label="Password "
                placeholder="********"
                label="Password"
                required={true}
                type={typePassword ? "password" : "text"}
                passwordInput={true}
                isPassword={true}
                onClickIcon={showHidePassword}
                inputRef={password}
              />
            </div>
            <div className="white-space-div"></div>
            <div className="input-content-holder">
              <GenericInput
                icon={Password_Icon}
                passwordIcon={typeConfirmPassword ? hidePassword : showPassword}
                input_label="Confirm Password "
                placeholder="********"
                label="Password"
                required={true}
                type={typeConfirmPassword ? "password" : "text"}
                passwordInput={true}
                isPassword={true}
                onClickIcon={showHideConfirmPassword}
                inputRef={confirmPassword}
              />
            </div>
          </div>

          <div className="register-password-info"></div>
          <div>
            <GenericButton value="Register" name="Register" />
          </div>
        </form>
      </div>
      <div className="div-register-camera">
        <img className="img-register-camera" alt="camera" src={Camera_Icon} />
      </div>
      <div className="div-register-circle">
        <img className="img-register-circle" alt="circle" src={Circle_Icon} />
      </div>
    </div>
  );
}

export default RegisterUser;
