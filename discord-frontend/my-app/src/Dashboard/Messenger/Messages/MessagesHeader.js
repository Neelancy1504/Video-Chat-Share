import React from "react";
import { styled } from "@mui/material";
import { Typography } from "@mui/material";
import Avatar from "../../../shared/components/Avatar";

const MainContainer = styled("div")({
  width: "98%",
  display: "column",
  marginTop: "10px",
});

const MessagesHeader = ({ name = "" }) => {
  return (
    <MainContainer>
      <Avatar large username={name}  sx={{ marginLeft: "10px" }}/>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "white",
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
            color: "#b9bbbe", 
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
