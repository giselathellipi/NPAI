import React from "react";
import "./style.css";
function CenterDetails(props) {
  return (
    <div className="center-list">
      <h2>Center details <span>*</span></h2>
      <div className="div-container">
        <div className="div1">
          <span className="span-label">Center Name: </span>
          <span>{props.name} </span>
        </div>
        <div className="div1">
          <span className="span-label">Center Owner: </span>
          <span>{props.owner}</span>
        </div>
      </div>
      <div className="div-container">
        <div className="div1">
          <span className="span-label">Center Address: </span>
          <span>{props.address}</span>
        </div>
        <div className="div1">
          <span className="span-label">Cell:</span>
          <span> {props.tel}</span>
        </div>
      </div>

      <div className="div2">
        <span className="span-label">Contact Person: </span>
        <span>{props.contact}</span>
      </div>
    </div>
  );
}

export default CenterDetails;
