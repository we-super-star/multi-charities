import React, { Component } from "react";
import MoneyButton from "@moneybutton/react-money-button";
import { Add } from "@material-ui/icons";
import { withFirebase } from "../../../containers/Firebase";
import "./card.css";
import Typography from "@material-ui/core/Typography";
import CardMaterial from "@material-ui/core/Card";
import Grow from "@material-ui/core/Grow";

class Card extends Component {
  state = {
    clicked: false,
    openPopup: false,
    anchorEl: null
  };

  componentDidMount() {
    const clickedObj = JSON.parse(localStorage.getItem("clickedObj"));
    clickedObj[this.props.id] === "clicked" && this.setState({ clicked: true });
  }

  handleOpenPopup() {
    this.setState({
      openPopup: true
    });
  }

  render() {
    const {
      props: { head, icon, text, id, addToBtn, allData, clickButton, popup },
      state: { clicked, openPopup, anchorEl }
    } = this;

    const addItem = async event => {
      await this.setState({ clicked: true });
      const clickedObj = await JSON.parse(localStorage.getItem("clickedObj"));
      clickedObj[id] = "clicked";
      await localStorage.setItem("clickedObj", JSON.stringify(clickedObj));

      const selected = await JSON.parse(localStorage.getItem("selected"));
      selected[id] = id;
      await localStorage.setItem("selected", JSON.stringify(selected));
      await console.log(this.state);
      this.handleOpenPopup();
      await addToBtn();
    };

    const removeItem = async () => {
      await this.setState({ clicked: false });
      const clickedObj = await JSON.parse(localStorage.getItem("clickedObj"));
      clickedObj[id] = "unClicked";
      await localStorage.setItem("clickedObj", JSON.stringify(clickedObj));

      const selected = await JSON.parse(localStorage.getItem("selected"));
      delete selected[id];
      await localStorage.setItem("selected", JSON.stringify(selected));

      await addToBtn();
    };

    return (
      <section className="card">
        <div className="card__img">
          <img src={icon} alt="" />
        </div>
        <article className="card__article">
          <h4>{head}</h4>
          <p>{text}</p>
        </article>
        {!popup && (
          <span className="card__money-btn">
            <MoneyButton
              to="<your-bitcoin-address-here>"
              amount=".1"
              currency="USD"
              label="Money Button"
            />
          </span>
        )}
        {!popup &&
          (clicked ? (
            <span className="card__remove-btn" onClick={removeItem}>
              Remove
            </span>
          ) : (
            <span className="card__add-btn" onClick={addItem}>
              <Add />
              Add
            </span>
          ))}
        {popup && <span className="card__add-btn">+Added</span>}
        <SimplePopover
          // addToBtn={addToBtn}
          open={openPopup}
          allData={allData}
          anchorEl={anchorEl}
          addToBtn={addToBtn}
          clickButton={clickButton}
        />
      </section>
    );
  }
}

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

class SimplePopover extends Component {
  // const open = Boolean(anchorEl);
  // const id = open ? "simple-popover" : undefined;

  handleClose = () => {
    console.log("DCM");
    this.setState({
      openPopup: false
    });
  };

  handleClick = () => {};

  render() {
    const { allData, open, addToBtn, clickButton } = this.props;
    if (objLength() !== 0) {
      return (
        <div className="card-container__simplePopup">
          {console.log("selected", checkTheSelected())}
          {console.log(clickButton)}
          <Grow in={open}>
            <CardMaterial>
              <Typography>
                <section className="card-container__popup">
                  {!clickButton &&
                    allData &&
                    allData.map((ele, index) => {
                      if (ele.id in checkTheSelected()) {
                        return (
                          <Card
                            icon={ele.icon}
                            head={ele.head}
                            id={ele.id}
                            key={index}
                            addToBtn={addToBtn}
                            popup={true}
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
                  {!clickButton && (
                    <p className="card-container__number-charities">
                      {objLength()} Charitied Selected
                    </p>
                  )}
                  {clickButton && <p>We are working with this!</p>}
                </section>
              </Typography>
            </CardMaterial>
          </Grow>
        </div>
      );
    }
    return null;
  }
}

const firebaseCard = withFirebase(Card);
export default firebaseCard;
