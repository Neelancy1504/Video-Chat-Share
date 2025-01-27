import React from 'react';
import { styled } from '@mui/material';
import FriendsListItem from './FriendsListItem';
import { connect } from 'react-redux';

const MainContainer = styled('div')({
  flexGrow: 1,
  width: "100%",
});

// Updated checkOnlineUsers to avoid mutation
const checkOnlineUsers = (friends = [], onlineUsers = []) => {
  return friends.map(f => {
    const isUserOnline = onlineUsers.some(user => user.userId === f.id);
    return {
      ...f, // Create a new object to avoid mutation
      isOnline: isUserOnline,
    };
  });
};

const FriendsList = ({ friends, onlineUsers }) => {
  const processedFriends = checkOnlineUsers(friends, onlineUsers);

  return (
    <MainContainer>
      {processedFriends.map((f) => (
        <FriendsListItem
          username={f.username}
          id={f.id}
          key={f.id}
          isOnline={f.isOnline}
        />
      ))}
    </MainContainer>
  );
};

const MapStoreStateToProps = ({ friends }) => {
  return {
    ...friends,
  };
};

export default connect(MapStoreStateToProps)(FriendsList);
