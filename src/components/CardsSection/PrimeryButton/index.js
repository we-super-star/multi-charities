import React from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withFirebase } from "../../../containers/Firebase";

import Card from "../ButtonCard";
import "./button.css";
import data from "../data";

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

  const checkTheSelected = () => {
    const selected = JSON.parse(localStorage.getItem("selected"));
    return selected;
  };

  const objLength = () => {
    var size = 0,
      key;
    for (key in checkTheSelected()) {
      checkTheSelected().hasOwnProperty(key) && size++;
    }
    console.log(size);
    return size;
  };

  return (
    <div className="card-container__button">
      {console.log("selected", checkTheSelected())}
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
        <Typography>
          <section className="card-container__popup">
            {allData.map((ele, index) => {
              if (ele.id in checkTheSelected()) {
                return (
                  <Card
                    icon={ele.icon}
                    head={ele.head}
                    id={ele.id}
                    key={index}
                    addToBtn={addToBtn}
                  />
                );
              }
            })}

            {/* <div className="card-container__popup-code">
              <span>{code}</span>
              <Button type="primary" className="card-container__popup-code-btn">
                Copy code
              </Button>
            </div> 
            <p>Your Charity Button is ready!</p>
            */}
            <p className="card-container__number-charities">
              {objLength()} Charitied Selected
            </p>
            {/* <p>We are working with this!</p> */}
          </section>
        </Typography>
      </Popover>
    </div>
  );
}

const FirebaseSimplePopover = withFirebase(SimplePopover);
export default FirebaseSimplePopover;
