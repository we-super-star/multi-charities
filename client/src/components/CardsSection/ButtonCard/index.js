import React, { Component } from "react";
import { Add } from "@material-ui/icons";
import { withFirebase } from "../../../containers/Firebase";

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
      props: { head, icon, text }
    } = this;

    return (
      <section className="card">
        <div className="card__img">
          <img src={icon} alt="" />
        </div>
        <article className="card__article">
          <h4>{head}</h4>
          <p>{text}</p>
        </article>

        <span className="card__add-btn">
          <Add />
          Add
        </span>
      </section>
    );
  }
}

const firebaseCard = withFirebase(Card);
export default firebaseCard;
