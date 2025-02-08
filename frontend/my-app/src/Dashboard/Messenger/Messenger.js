import React from "react";
import { styled } from "@mui/material";
import { connect } from "react-redux";
import WelcomeMessage from './WelcomeMessage';
import MessengerContent from './MessengerContent';
import bgImage from '../../images/bg-discord-blue-more-shape.png';

const MainContainer = styled("div")({
  flexGrow: 1,
  // backgroundColor: "#36393f",
  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover", // This ensures the image covers the container
  backgroundPosition: "center", // Centers the image
  backgroundRepeat: "no-repeat", // Prevents image from repeating
  marginTop: "48px",
  display: "flex",
});

const Messenger = ({ chosenChatDetails }) => {
  return (
    <MainContainer>
      {!chosenChatDetails ? (
        <WelcomeMessage />
      ) : (
        <MessengerContent chosenChatDetails={chosenChatDetails} />
      )}
    </MainContainer>
  );
};

const MapStoreStateToProps = ({ chat }) => {
  return {
    ...chat,
  };
};

export default connect(MapStoreStateToProps)(Messenger);
