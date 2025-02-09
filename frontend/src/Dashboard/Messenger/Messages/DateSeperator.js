import React from "react";
import { styled } from "@mui/material";

const Seperator = styled("div")({
  width: "95%",
  backgroundColor: "#b9bbbe",
  fontWeight: "600",
  height: "1px",
  position: "relative",
  marginTop: "20px",
  marginBottom: "10px",
});

const DateLabel = styled("span")({
  backgroundColor: "white",
  position: "absolute",
  left: "45%",
  top: "-10px",
  color: "#b9bbbe",
  fontWeight: "600",
  padding: "0 5px",
  fontSize: "14px",
});

const DateSeperator = ({ date }) => {
  return (
    <Seperator>
      <DateLabel> {date}</DateLabel>
    </Seperator>
  );
};
export default DateSeperator;
