import * as React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { logout } from "../../shared/utils/auth";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/roomActions";

const BasicMenu = ({ audioOnly, setAudioOnly }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate(); // Hook for navigation

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAudioOnlyChange = () => {
    setAudioOnly(!audioOnly);
  };

  const handleProfileClick = () => {
    navigate("/profile"); // Navigate to profile page
    handleMenuClose();
  };

  return (
    <div>
      <IconButton onClick={handleMenuOpen} style={{ color: "#3A3B3C" }}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
        <MenuItem onClick={handleAudioOnlyChange}>
          {audioOnly ? "Audio Only Disabled" : "Audio Only Enabled"}
        </MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

const mapActionsTopProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(mapStoreStateToProps, mapActionsTopProps)(BasicMenu);


// import * as React from "react";
// import Button from "@mui/material/Button";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import { IconButton } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { logout } from "../../shared/utils/auth";
// import { connect } from "react-redux";
// import { getActions } from "../../store/actions/roomActions";

// const BasicMenu = ({ audioOnly, setAudioOnly }) => {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleAudioOnlyChange = () => {
//     setAudioOnly(!audioOnly);
//   };

//   return (
//     <div>
//       <IconButton onClick={handleMenuOpen} style={{ color: "#3A3B3C" }}>
//         <MoreVertIcon />
//       </IconButton>
//       <Menu
//         id="demo-positioned-menu"
//         aria-labelledby="demo-positioned-button"
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleMenuClose}
//         anchorOrigin={{
//           vertical: "top",
//           horizontal: "left",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "left",
//         }}
//       >
//         <MenuItem onClick={logout}>Logout</MenuItem>
//         <MenuItem onClick={handleAudioOnlyChange}>
//           {audioOnly ? "Audio Only Disabled" : "Audio Only Enabled"}
//         </MenuItem>
//       </Menu>
//     </div>
//   );
// };

// const mapStoreStateToProps = ({ room }) => {
//   return {
//     ...room,
//   };
// };

// const mapActionsTopProps = (dispatch) => {
//   return {
//     ...getActions(dispatch),
//   };
// };

// export default connect(mapStoreStateToProps, mapActionsTopProps)(BasicMenu);
