import React from "react";
import { styled } from "@mui/material";
import { Typography } from "@mui/material";
import Avatar from "../../../shared/components/Avatar";

const MainContainer = styled("div")({
  width: "98%",
  display: "column",
  marginTop: "10px",
  paddingLeft: "10px",
});

const MessagesHeader = ({ name = "" }) => {
  return (
    <MainContainer>
      <Avatar large username={name}  sx={{ paddingLeft: "10px"}}/>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#2f2f2f",
          marginLeft: "10px",
          marginRight: "5px",
          padding: '5px'
        }}
      >
        {name}
      </Typography>

      <Typography
        variant= 'h7'
        sx={{ 
            color: "#808080", 
            marginLeft: "15px", 
            marginRight: "5px" 
            }}
      >
        This is the beginning of your conversation with {name}
      </Typography>
    </MainContainer>
  );
};

export default MessagesHeader;
