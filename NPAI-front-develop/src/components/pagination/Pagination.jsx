import * as React from "react";
import Pagination from "@mui/material/Pagination";
import "./style.css";

const PaginationRounded = ({ setPageNo, countPages }) => {
  const handleChange = (pageNo) => {
    if (pageNo >= 1) {
      setPageNo(pageNo - 1);
      
    }
  };
  return (
    <Pagination
      count={countPages}
      variant="outlined"
      shape="rounded"
      onChange={(e) => handleChange(e.target.textContent)}
    />
  );
};
export default PaginationRounded;
