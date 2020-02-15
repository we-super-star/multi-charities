import React from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withFirebase } from "../../../containers/Firebase";
import "./button.css";
import CardMaterial from "@material-ui/core/Card";

function SimplePopover({ addToBtn, handleClickPrimery, handleClosePrimery }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = async event => {
    setAnchorEl(event.currentTarget);
    await removeAllItems();
    await handleClickPrimery();
  };

  const handleClose = async () => {
    setAnchorEl(null);
    await handleClosePrimery();
  };

  const removeAllItems = async () => {
    const clickedObj = await JSON.parse(localStorage.getItem("clickedObj"));
    const selected = await JSON.parse(localStorage.getItem("selected"));
    for (var key in clickedObj) {
      if (clickedObj.hasOwnProperty(key)) {
        clickedObj[key] = "unClicked";
        delete selected[key];
      }
    }
    await localStorage.setItem("selected", JSON.stringify(selected));
    await localStorage.setItem("clickedObj", JSON.stringify(clickedObj));
    await addToBtn();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="card-container__button">
      <Button onClick={handleClick}>Create a Charity Button..</Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right"
        }}
      >
        <CardMaterial className="card-container__popup">
          <Typography>We are working with this!</Typography>
        </CardMaterial>
      </Popover>
    </div>
  );
}

const FirebaseSimplePopover = withFirebase(SimplePopover);
export default FirebaseSimplePopover;
