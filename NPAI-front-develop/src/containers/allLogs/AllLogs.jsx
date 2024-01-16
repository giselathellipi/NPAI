import React, { useState } from "react";
import GenericSideBar from "../../components/genericSideBar/GenericSideBar";
import GenericUserHeader from "../../components/genericUserHeader/GenericUserHeader";
import UserTable from "../../components/userTable/UserTable";
import { Navigate } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import "./style.css";

function AllLogs() {
  const [counter, setCounter] = useState("");
  const [pageNo, setPageNo] = useState(0);
  const pageSize = 5;
  const [pagData, setPagaData] = useState([]);
  console.log(pagData.pageSize);
  const [totalPages, setTotalPages] = useState(0);
  const accessToken = sessionStorage.getItem("Token");
  const dontNavigate = false;

  let api = `http://192.168.10.91:8080/log?pageNo=${pageNo}&pageSize=${pageSize}`;

  if (!accessToken) {
    return <Navigate to="/" />;
  }

  return (
    <div className="User-center-container">
      <div className="user-center-sidebar">
        <GenericSideBar />
      </div>
      <div className="user-center-header">
        <GenericUserHeader counter={counter} name="List of all logs" />
        <div className="user-center-table">
          <UserTable
            row1="Username"
            row2="End Point"
            row3="Method"
            row4="Operation"
            row5="Remote Host"
            row6="Request Time"
            row7="UserAgent"
            row8="Params"
            fetchapi={api}
            accessToken={accessToken}
            handleCount={(data) => setCounter(data)}
            navigate={dontNavigate}
            getPaginations={setPagaData}
            totalPages={setTotalPages}
            addPagination={true}
            pageNo={pageNo}
          />
        </div>
        <Pagination
          setPageNo={setPageNo}
          pageNo={pageNo}
          countPages={totalPages}
        />
      </div>
    </div>
  );
}
export default AllLogs;
