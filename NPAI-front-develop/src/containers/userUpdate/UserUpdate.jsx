import React, { useState, useEffect } from "react";
import GenericInput from "../../components/genericInput/GenericInput";
import Name_Icon from "../../assets/icons/name-icon.svg";
import Email_Icon from "../../assets/icons/email-icon.svg";
import GenericButton from "../../components/genericButton/GenericButton";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import "./style.css";
function UserUpdate() {
  const token = sessionStorage.getItem("Token");
  const role = sessionStorage.getItem("UserRole");
  const id = sessionStorage.getItem("UserId");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [username, setUsername] = useState("");
  const [values, setValues] = useState([]);
  console.log(values);
  const [buttonDisable, setButtonDisable] = useState(true);
  sessionStorage.setItem("Username", username);
  const accessToken = sessionStorage.getItem("Token");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_GET_USERS_ID}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setValues(res.data);
        setPhoneNumber(res.data.phoneNumber);
        setName(res.data.name);
        setSurname(res.data.username);
        setEmail(res.data.email);
        setCompany(res.data.company);
        setUsername(res.data.username);
      })
      .catch((err) => console.log("error is", err), []);
  }, [token, id]);

  if (!accessToken) {
    return <Navigate to="/" />;
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_USER_UPDATE}`,
        { id, name, surname, username, phoneNumber, company, email },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if ((response.status = 200)) {
        toast.success(
          `${role === "SUPER_USER" ? "Admin" : "User"} updated succesfully!`
        );
        setTimeout(() => {
          window.location.href = "http://localhost:3000/user-center";
        }, 1500);
      }
    } catch (error) {
      if (error.response.status === 417) {
        toast.error("Try another email");
      } else if (error.response.status === 409) {
        toast.error(error.response.data);
      } else {
        console.log("error is", error);
      }
    }
  };

  const buttonEnable = (e) => {
    const inputValue = e.target.value;
    if (
      values.name !== inputValue &&
      values.surname !== inputValue &&
      values.email !== inputValue &&
      values.username !== inputValue &&
      values.company !== inputValue
    ) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  };
  return (
    <div className="register-user">
      <>
        <form className="register-modal-holder" onSubmit={handleRegister}>
          <h1> {role === "SUPER_USER" ? "Update Admin" : "Update User"} </h1>
          <div className="inline-input">
            <div className="input-content-holder">
              <GenericInput
                value={name || ""}
                icon={Name_Icon}
                input_label="Name "
                placeholder="Enter your name"
                required={true}
                label="Name"
                asterik="*"
                onChange={(e) => setName(e.target.value, buttonEnable(e))}
              />
            </div>
            <div className="white-space-div"></div>
            <div className="input-content-holder">
              <GenericInput
                value={surname || ""}
                icon={Name_Icon}
                input_label="Surname "
                placeholder="Enter your surname"
                required={true}
                label="Surname"
                asterik="*"
                onChange={(e) => setSurname(e.target.value, buttonEnable(e))}
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
                value={phoneNumber || ""}
                onChange={setPhoneNumber}
                placeholder="+355 68 8101124"
                required={true}
                className="phoneNumber_input"
              />
            </div>
            <div className="white-space-div"></div>
            <div className="input-content-holder">
              <GenericInput
                value={email || ""}
                icon={Email_Icon}
                input_label="Email "
                placeholder="yourname@email.com"
                required={true}
                label="email"
                asterik="*"
                onChange={(e) => setEmail(e.target.value, buttonEnable(e))}
              />
            </div>
          </div>
          <div className="inline-input">
            <div className="input-content-holder">
              <GenericInput
                value={username || ""}
                icon={Name_Icon}
                input_label="Username "
                placeholder="Enter your username"
                required={true}
                label="Username"
                asterik="*"
                onChange={(e) => setUsername(e.target.value, buttonEnable(e))}
              />
            </div>
            <div className="white-space-div"></div>
            <div className="input-content-holder">
              <GenericInput
                value={company || ""}
                input_label="Company "
                icon={Name_Icon}
                placeholder="Company name"
                required={true}
                label="company"
                asterik="*"
                onChange={(e) => setCompany(e.target.value, buttonEnable(e))}
              />
            </div>
          </div>
          <div className="update-user-submit">
            <GenericButton
              disabled={values.phoneNumber === phoneNumber && buttonDisable}
              value="Register"
              name="Update"
            />
          </div>
        </form>
      </>
    </div>
  );
}

export default UserUpdate;
