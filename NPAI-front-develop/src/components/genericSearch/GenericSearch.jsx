import React, { useState } from "react";
import "./style.css";
import Filter_Icon from "../../assets/icons/filter-icon.svg";
import Search_Icon from "../../assets/icons/search-icon.svg";
// import Input from "@mui/material/Input";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import ListItemText from "@mui/material/ListItemText";
// import Checkbox from "@mui/material/Checkbox";
// import InputLabel from "@mui/material/InputLabel";
// import FormControl from "@mui/material/FormControl";
// import Button from "@mui/material/Button";
function GenericSearch(props) {
  ///////////////////////////////////////////////////Use this if we need sort in filter
  // const [info, setInfo] = useState("");
  // const [open, setOpen] = useState(false);
  // const [ID, setID] = useState("");
  // const [name, setName] = useState("");

  // const handleChange = (event) => {
  //   setInfo(event.target.value);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  return (
    <div className={props.className_input_icon || "search_bar_container"}>
      <div className="filter-div">
        <img src={Filter_Icon} alt="Icon" className="filter-icon" />
        <div className="filter">
          <span className="sortBy">Sort By:Name</span>
        </div>
      </div>
      <div className="search">
        <img className="search-icon" src={Search_Icon} alt="icon" />
        <input
          id={props.id}
          name={props.name}
          className={props.className || "searchbar"}
          onChange={props.onChange}
          onClick={props.onClick}
          onBlur={props.handleFocus}
          label={props.label}
          placeholder="Search"
          value={props.value}
          pattern={props.pattern}
          readOnly={props.readOnly}
          required={props.required}
          disabled={props.disabled}
        />
      </div>
    </div>
  );
}

export default GenericSearch;
