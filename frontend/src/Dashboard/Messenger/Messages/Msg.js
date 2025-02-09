import React from "react";
import { styled } from "@mui/material";
import Avatar from "../../../shared/components/Avatar";
import { Typography } from "@mui/material";

const MainContainer = styled("div")({
  width: "97%",
  display: "flex",
  marginTop: "10px",
});

const AvatarContainer = styled("div")({
  width: "70px",
});

const MessageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const MessageContent = styled("div")({
  color: "#3A3B3C",
  fontSize: "17px",
});

const SameAuthorMessageContent = styled("div")({
  colr: "#dcddde",
  width: "97%",
});

const SameAuthorMessageText = styled("span")({
  marginLeft: "70px",
});

const Msg = ({ content, sameAuthor, username, date, sameDay }) => {
  if (sameAuthor && sameDay) {
    //return simple msg with avatar
    return (
      <SameAuthorMessageContent>
        <SameAuthorMessageText sx={{color: "white"}}>{content}</SameAuthorMessageText>
      </SameAuthorMessageContent>
    );
  }
  return (
    <MainContainer>
      <AvatarContainer style={{paddingLeft: "10px"}}>
        <Avatar username={username} />
      </AvatarContainer>
      <MessageContainer>
        <Typography style={{ fontSize: "16px", color: "#3A3B3C" , fontWeight: "600"}}>
            {username}{' '}
            <span style={{ fontSize: "12px", color: "#72767d" }}>{date}</span>
        </Typography>
        <MessageContent>{content}</MessageContent>
      </MessageContainer>
    </MainContainer>
  );
};

export default Msg;
