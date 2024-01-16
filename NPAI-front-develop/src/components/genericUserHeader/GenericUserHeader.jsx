import React from "react";
import "./style.css";

function GenericUserHead(props){
  return (
 <>
   <div className="user-header">
      <div className="header-items">
     <h1>{props.name}</h1>
     <div className="header-table-index"><span>{props.counter}</span></div>
      </div>
    </div>
  </>
  );
}



export default GenericUserHead;