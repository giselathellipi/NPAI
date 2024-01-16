import React from "react";
import "./style.css";

function DropDownList(props) {
  const { handleSelectDropdown } = props;

  return (
    <div className="generic-input-container" style={{ width: props.divWidth }}>
      <div className={props.input_label_style || "label_desc"}>
        {props.input_label}
        <span className="asterik">{props.asterik}</span>
      </div>
      <div className={props.className_input_icon || "input_icon_container"}>
        <div className="icon-div">
          <img src={props.icon} alt="Icon" className="img-tag" />
        </div>
        <select
          value={props.value}
          disabled={props.disabled}
          onChange={(event) => handleSelectDropdown(event)}
          className="dropdown-tag"
          ref={props.selectRef}
        >
          <option defaultValue="none">Select an Option</option>
          {props.DropDownListData.map((list, index) => (
            <option key={index} value={list.id}>
              {list.desc || list.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default DropDownList;
