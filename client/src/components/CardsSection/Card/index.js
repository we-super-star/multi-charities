import React, { Component } from "react";
import MoneyButton from "@moneybutton/react-money-button";
import { Add } from "@material-ui/icons";
import { withFirebase } from "../../../containers/Firebase";

import "./card.css";
class Card extends Component {
  state = {
    clicked: false
  };

  componentDidMount() {
    const clickedObj = JSON.parse(localStorage.getItem("clickedObj"));
    clickedObj[this.props.id] === "clicked" && this.setState({ clicked: true });
  }

  render() {
    const {
      props: { head, icon, text, id, addToBtn },
      state: { clicked }
    } = this;

    const addItem = async () => {
      await this.setState({ clicked: true });
      const clickedObj = await JSON.parse(localStorage.getItem("clickedObj"));
      clickedObj[id] = "clicked";
      await localStorage.setItem("clickedObj", JSON.stringify(clickedObj));

      const selected = await JSON.parse(localStorage.getItem("selected"));
      selected[id] = id;
      await localStorage.setItem("selected", JSON.stringify(selected));

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
        <span className="card__money-btn">
          <MoneyButton
            data-to="1K3Swx1xa2jNRgKPjnoTMh4syX5MkKtEiz"
            data-amount=".10"
            data-currency="USD"
            data-label="Donate"
            data-client-identifier="1d198ec45d2ed6af10b6b03f56fa6504"
            data-button-id="1581112168167"
            data-button-data="{}"
            data-type="buy"
          />
        </span>

        {clicked ? (
          <span className="card__remove-btn" onClick={removeItem}>
            Remove
          </span>
        ) : (
          <span className="card__add-btn" onClick={addItem}>
            <Add />
            Add
          </span>
        )}
      </section>
    );
  }
}

const firebaseCard = withFirebase(Card);
export default firebaseCard;
