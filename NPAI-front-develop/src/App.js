import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./containers/login/Login";
import RegisterCenter from "./containers/registerCenter/RegisterCenter";
import RegisterUser from "./containers/registerUser/RegisterUser";
import RegisterWebcam from "./containers/registerWebcam/RegisterWebcam";
import UserCenter from "./containers/userCenter/UserCenter";
import UserWebcam from "./containers/userWebcam/UserWebcam";
import UserSetting from "./containers/userSetting/UserSetting";
import ForgotPassword from "./containers/forgotPassword/ForgotPassword";
import AdminAllCameras from "./containers/adminAllCameras/AdminAllCameras";
import WebcamModel from "./containers/webcamModel/WebcamModel";
import AllLogs from "./containers/allLogs/AllLogs";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register-center" element={<RegisterCenter />} />
        <Route path="/register-user" element={<RegisterUser />} />
        <Route path="/register-webcam" element={<RegisterWebcam />} />
        <Route path="/user-center" element={<UserCenter />} />
        <Route path="/user-webcam" element={<UserWebcam />} />
        <Route path="/all-webcams" element={<AdminAllCameras />} />
        <Route path="/user-setting" element={<UserSetting />} />
        <Route path="/webcamtype" element={<WebcamModel />} />
        <Route path="/all-logs" element={<AllLogs />} />
      </Routes>
    </div>
  );
}

export default App;
