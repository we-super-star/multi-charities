import React from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withFirebase } from "../../../containers/Firebase";
import "./button.css";
import CardMaterial from "@material-ui/core/Card";

function SimplePopover({ selected, addToBtn, allData }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
