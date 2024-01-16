import React, { useState, useEffect } from "react";
import GenericSideBar from "../../components/genericSideBar/GenericSideBar";
import GenericUserHeader from "../../components/genericUserHeader/GenericUserHeader";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import GenericButton from "../../components/genericButton/GenericButton";
import AddIcon from "@mui/icons-material/Add";
import { toast, Slide } from "react-toastify";
import "./style.css";
function WebcamModel(props) {
  const [data, setData] = useState([]);
  const [modalName, setModalName] = useState("");
  const [modalType, setModalType] = useState([]);

  const [webcamModelId, setWebcamModelId] = useState("");
  const [modal, setModal] = useState(false);
  const [addTypeModal, setAddTypeModal] = useState(false);
  const [addedValue, setAddedValue] = useState("");
  const [editTypeValue, setEditTypeValue] = useState(false);
  const [editModelValue, setEditModelValue] = useState(false);
  const [navigate, setNavigate] = useState(true);
  const [editValue, setEditValue] = useState("");
  const [clickedValue, setClickedValue] = useState([]);
  const accessToken = sessionStorage.getItem("Token");
  const userId = Number(sessionStorage.getItem("UserId"));

  const counter = data.length;
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_GET_WEBCAM_MODEL}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => setData(res.data))
      .catch(() =>
        toast.error("Sorry,something went wrong", {
          autoClose: 1400,
          hideProgressBar: true,
          theme: "light",
        })
      );
  }, [accessToken]);
  if (!accessToken) {
    return <Navigate to="/" />;
  }
  ////////////////////////////////////////////////////open Modal
  const openModal = (val) => {
    setModal(!modal);
    setModalType(val.webcamTypeDTOs);
    setModalName(val.desc);
    setWebcamModelId(val.id);
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////Type events
  const editType = async (val) => {
    setClickedValue(val.id);
    setEditValue(val.desc);
    editTypeValue &&
      (await axios
        .post(
          `${process.env.REACT_APP_WEBCAM_TYPE_EDIT_VALUE}`,
          { id: val.id, desc: editValue, webcamModelId },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) =>
          setModalType(
            modalType.map((el) => {
              if (el.id === val.id) {
                el.desc = res.data.desc;
              }
              return el;
            })
          )
        )
        .then(
          toast.success("Updated succesfully", {
            autoClose: 1000,
            hideProgressBar: true,
            transition: Slide,
          })
        )
        .catch(() =>
          toast.error("Can not update,try again later", {
            autoClose: 1000,
            hideProgressBar: true,
          })
        ));
    setEditTypeValue(!editTypeValue);
  };

  const addType = async (val) => {
    setAddTypeModal(!addTypeModal);
    addTypeModal &&
      (await axios
        .post(
          `${process.env.REACT_APP_WEBCAM_TYPE_ADD_VALUE}`,
          { id: null, desc: addedValue, webcamModelId },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => setModalType([...modalType, res.data]))

        .then(
          toast.success(
            "Added succesfully",
            {
              autoClose: 1000,
              hideProgressBar: true,
              transition: Slide,
            },
            setAddedValue("")
          )
        )
        .catch(() =>
          toast.error("Can not update,try again later", {
            autoClose: 1000,
            hideProgressBar: true,
          })
        ));
  };
  const deleteType = async (val) => {
    await axios
      .delete(
        `${process.env.REACT_APP_DELETE_WEBCAM_TYPE}/${val.id}`,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(() => setModalType(modalType.filter((el) => el.id !== val.id)))
      .then(
        toast.success("Deleted succesfully", {
          autoClose: 1000,
          hideProgressBar: true,
          transition: Slide,
        })
      )
      .catch(() =>
        toast.error("Can not delete,try again later", {
          autoClose: 1000,
          hideProgressBar: true,
        })
      );
  };
  ///////////////////////////////////////////////////////////////////////////////////////////Webcam model
  const addWebcamModel = async (val) => {
    setAddTypeModal(!addTypeModal);
    if (addedValue === "") {
      return toast.error("Please enter a value", {
        autoClose: 1000,
        hideProgressBar: true,
        transition: Slide,
      });
    } else
      addTypeModal &&
        (await axios
          .post(
            `${process.env.REACT_APP_POST_WEBCAM_MODEL}`,
            {
              desc: addedValue,
              userId,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((res) => setData([...data, res.data]))

          .then(
            toast.success(
              "Added succesfully",
              {
                autoClose: 1000,
                hideProgressBar: true,
                transition: Slide,
              },
              setAddedValue("")
            )
          )
          .catch(() =>
            toast.error("Can not delete,try again later", {
              autoClose: 1000,
              hideProgressBar: true,
            })
          ));
  };
  const editModelName = async (val) => {
    setEditModelValue(!editModelValue);
    setNavigate(!navigate);
    setClickedValue(val.id);
    setEditValue(val.desc);
    editModelValue &&
      (await axios
        .post(
          `${process.env.REACT_APP_POST_EDITED_VALUE}`,
          {
            id: val.id,
            desc: editValue,
            webcamTypeDTOs: val.webcamTypeDTOs,
            userId,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) =>
          setModalType(
            data.map((el) => {
              if (el.id === val.id) {
                el.desc = res.data.desc;
              }
              return el;
            })
          )
        )
        .then(
          toast.success("Updated succesfully", {
            autoClose: 800,
            hideProgressBar: true,
            transition: Slide,
          })
        )
        .catch((err) =>
          toast.error("Can not update,try again later", {
            autoClose: 1000,
            hideProgressBar: true,
          })
        ));
  };

  return (
    <div className="User-center-container">
      <div className="user-center-sidebar">
        <GenericSideBar />
      </div>
      <div className="user-center-header">
        <GenericUserHeader counter={counter} name="List of all webcam model" />
        <div className="user-center-table">
          <TableContainer component={Paper}>
            <Table sx={{ tableLayout: "auto", minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={[
                      {
                        display: "flex",
                        justifyContent: "space-between",
                        color: "#b5b7c0",
                      },
                    ]}
                  >
                    Name
                    <span className="add-type">
                      <AddIcon onClick={() => addWebcamModel()} />
                    </span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="table-row">
                {data.map((val) => {
                  return (
                    <TableRow
                      key={val.id}
                      sx={[
                        {
                          "&:last-child td, &:last-child th": { border: 0 },
                          display: "flex",
                        },
                        {
                          "&:hover": {
                            backgroundColor: "#d2d7d9",
                            cursor: "pointer",
                          },
                        },
                      ]}
                    >
                      <TableCell
                        sx={[{ width: "100%" }]}
                        onClick={() => navigate && openModal(val)}
                      >
                        {(editModelValue && clickedValue === val.id && (
                          <input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            required
                          />
                        )) ||
                          val.desc}
                      </TableCell>
                      <TableCell>
                        <GenericButton
                          name={
                            editModelValue && clickedValue === val.id
                              ? "Update"
                              : "Edit"
                          }
                          className="edit-button"
                          onClick={() => editModelName(val)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {modal && (
            <div className="modal">
              <div className="overlay"></div>
              <div className="modal-content">
                <h2>Name:{modalName}</h2>
                <TableContainer component={Paper}>
                  <Table id="webcamModels-table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={[
                            {
                              display: "flex",
                              justifyContent: "space-between",
                            },
                          ]}
                        >
                          Type
                          <span className="add-type">
                            <AddIcon onClick={() => addType(modalType)} />
                          </span>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="table-row">
                      {modalType.map((val) => {
                        return (
                          <TableRow
                            key={val.id}
                            sx={[
                              {
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              },
                            ]}
                          >
                            <TableCell
                              sx={[
                                {
                                  display: "flex",
                                  justifyContent: "space-between",
                                },
                              ]}
                              component="th"
                              scope="row"
                            >
                              {(editTypeValue && clickedValue === val.id && (
                                <input
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  required
                                />
                              )) ||
                                val.desc}
                              <div id="modal-type-buttons">
                                <GenericButton
                                  name={
                                    editTypeValue && clickedValue === val.id
                                      ? "Update"
                                      : "Edit"
                                  }
                                  className="edit-button"
                                  onClick={() => editType(val)}
                                />
                                <GenericButton
                                  name="Delete"
                                  className="delete-button"
                                  onClick={() => deleteType(val)}
                                />
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <button
                  className="close-modal"
                  onClick={() => {
                    // setModal(!modal);
                    window.location.reload();
                  }}
                >
                  x
                </button>
              </div>
            </div>
          )}
          {/*///////////////////////////////////////used for Add WebcamModel and Add type} ////////////////////////////*/}
        </div>
        {addTypeModal && (
          <div className="modal">
            <div className="overlay"></div>
            <div className="modal-content">
              <h2>{modalName}</h2>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={[
                          {
                            display: "flex",
                            justifyContent: "space-between",
                          },
                        ]}
                      >
                        Add {modalName ? "type" : "model"}
                        <input
                          value={addedValue}
                          onChange={(e) => setAddedValue(e.target.value)}
                          placeholder={`Please enter a ${
                            modalName ? "type" : "model"
                          }`}
                          required
                        />
                        {modalName ? (
                          <GenericButton
                            name="Add"
                            className="edit-button"
                            onClick={() => addType(modalType)}
                            disabled={addedValue === ""}
                          />
                        ) : (
                          <GenericButton
                            name="Add"
                            className="edit-button"
                            onClick={() => addWebcamModel(modalType)}
                            disabled={addedValue === ""}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
              <button
                className="close-modal"
                onClick={() => setAddTypeModal(!addTypeModal)}
              >
                x
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default WebcamModel;
