import React, { useRef, useEffect } from "react";
import { styled } from "@mui/material";
import MessagesHeader from "./MessagesHeader";
import { connect } from "react-redux";
import Msg from "./Msg";
import DateSeperator from './DateSeperator';

const MainContainer = styled("div")({
  height: "cal(100% - 60px",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const convertDateToHumanReadable = (date, format) => {
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear(),
  };

  return format.replace(/mm|dd|yy|yyy/gi, (matched) => map[matched]);
};

const Messages = ({ chosenChatDetails, messages }) => {
  return (
    <MainContainer>
      <MessagesHeader name={chosenChatDetails?.name} />
      {messages.map((message, index) => {
        //check same author----------------
        const sameAuthor =
          index > 0 &&
          messages[index].author._id === messages[index - 1].author._id;

        const sameDay =
          index > 0 &&
          convertDateToHumanReadable(new Date(message.date) , "dd/mm/yy") ===
            convertDateToHumanReadable(new Date(messages[index - 1].date)  , "dd/mm/yy");

        console.log(message.date);
        console.log(convertDateToHumanReadable(new Date(message.date) , "dd/mm/yy"));

        console.log(messages);

        return (
          <div key={message._id} style= {{width: '97%'}}>
          {(!sameDay || index === 0) && (
            <DateSeperator 
              date= {convertDateToHumanReadable(
                new Date(message.date),
                'dd/mm/yy'
              )}
            />
          )}
          <Msg
            content={message.content}
            username={message.author.username}
            sameAuthor={message.sameAuthor}
            date={convertDateToHumanReadable(
              new Date(message.date),
              'dd/mm/yy'
            )}
            sameDay={sameDay}
          />
          </div>
        );
      })}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ chat }) => {
  return {
    ...chat,
  };
};

export default connect(mapStoreStateToProps)(Messages);
