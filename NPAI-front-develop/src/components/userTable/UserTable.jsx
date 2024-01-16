import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./style.css";
import axios from "axios";
import GenericSearch from "../genericSearch/GenericSearch";
import GenericButton from "../genericButton/GenericButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function UserTable(props) {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPagesa, setTotalPagesa] = useState(0);
  const [paginationTotal, setPaginationTotal] = useState(0);

  const navigate = useNavigate();
  let openSearh = props.openSearch;

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function convertMs(date) {
    return (
      [
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
        date.getFullYear(),
      ].join("/") +
      " " +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(":")
    );
  }
  useEffect(() => {
    props.addPagination && props.totalPages(totalPagesa);
    props.addPagination && props.getPaginations(pagination);
  });
  useEffect(() => {
    axios
      .get(`${props.fetchapi}`, {
        headers: {
          Authorization: `Bearer ${props.accessToken}`,
        },
      })

      .then((res) => {
        setData(res.data["content"] ?? res.data);
        setPagination(res.data.pageable);
        setTotalPagesa(res.data.totalPages);
        setPaginationTotal(res.data.totalElements);
      })
      .catch((err) =>
        toast.error("Sorry,something went wrong", {
          autoClose: 1000,
          hideProgressBar: true,
          theme: "light",
        })
      );
  }, [props.pageNo, props.fetchapi, props.accessToken]);

  const startCounting = (data, paginationTotal) => {
    props.handleCount(paginationTotal ?? data.length);
  };
  useEffect(() => {
    startCounting(data, paginationTotal);
  });

  const navigateToWebcams = (center) => {
    sessionStorage.setItem("CenterId", center);
    navigate("/user-webcam", { state: { data: data, centerClicked: center } });
  };

  //search
  const searchTable = data.filter((val) => {
    if (searchTerm === "") {
      return val;
    }
    return val.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  //modal
  const openModal = (center) => {
    if (props.navigate) {
      navigate("/register-center", { state: { center: center } });
    } else {
      navigate("/register-webcam", { state: { webcam: center } });
    }
  };

  return (
    <>
      <div className="userTable-searchbar">
        {openSearh && (
          <GenericSearch onChange={(e) => setSearchTerm(e.target.value)} />
        )}
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {props.row1 && <TableCell align="left">{props.row1}</TableCell>}
              {props.row2 && <TableCell align="left">{props.row2}</TableCell>}
              {props.row3 && <TableCell align="left">{props.row3}</TableCell>}
              {props.row4 && <TableCell align="left">{props.row4}</TableCell>}
              {props.row5 && <TableCell align="left">{props.row5}</TableCell>}
              {props.row6 && <TableCell align="left">{props.row6}</TableCell>}
              {props.row7 && <TableCell align="left">{props.row7}</TableCell>}
              {props.row8 && <TableCell align="left">{props.row8}</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody className="table-row">
            {searchTable.map((val) => {
              return (
                <TableRow
                  key={val.id}
                  sx={[
                    { "&:last-child td, &:last-child th": { border: 0 } },
                    props.navigate && {
                      "&:hover": {
                        backgroundColor: "#d2d7d9",
                        cursor: "pointer",
                      },
                    },
                  ]}
                >
                  {props.row1 && (
                    <TableCell
                      onClick={() =>
                        props.navigate && navigateToWebcams(val.id)
                      }
                      component="th"
                      scope="row"
                    >
                      {val.name || val.username}
                    </TableCell>
                  )}
                  {props.row2 && (
                    <TableCell
                      onClick={() =>
                        props.navigate && navigateToWebcams(val.id)
                      }
                      align="left"
                    >
                      {val.owner || val.typeDTO?.desc || val.endPoint}
                    </TableCell>
                  )}
                  {props.row3 && (
                    <TableCell
                      onClick={() =>
                        props.navigate && navigateToWebcams(val.id)
                      }
                      align="left"
                    >
                      {val.address || val.modelDTO?.desc || val.method}
                    </TableCell>
                  )}
                  {props.row4 && (
                    <TableCell
                      onClick={() =>
                        props.navigate && navigateToWebcams(val.id)
                      }
                      align="left"
                    >
                      {val.tel || val.physicalAddress || val.operation}
                    </TableCell>
                  )}
                  {props.row5 && (
                    <TableCell
                      onClick={() =>
                        props.navigate && navigateToWebcams(val.id)
                      }
                      align="left"
                    >
                      {val.contact ||
                        val.webcamInteractionProtocolDTO ||
                        val.remoteHost}
                    </TableCell>
                  )}
                  {props.row6 && (
                    <TableCell
                      onClick={() =>
                        props.navigate && navigateToWebcams(val.id)
                      }
                      align="left"
                    >
                      {val.protocol ||
                        val.centerDTO?.name ||
                        convertMs(new Date(val.requestTime)) ||
                        ""}
                    </TableCell>
                  )}

                  {props.row7 && (
                    <TableCell
                      onClick={() =>
                        props.navigate && navigateToWebcams(val.id)
                      }
                      align="left"
                    >
                      {val.centerToAssociate || val.userAgent}
                    </TableCell>
                  )}
                  {props.row8 && (
                    <TableCell
                      onClick={() =>
                        props.navigate && navigateToWebcams(val.id)
                      }
                      align="left"
                    >
                      {val.params}
                    </TableCell>
                  )}
                  {props.editAccess && props.button && (
                    <TableCell align="left">
                      <GenericButton
                        onClick={() => openModal(val)}
                        name="Edit"
                        className="edit-button"
                      />
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
