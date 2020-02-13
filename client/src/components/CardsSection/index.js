import React, { Component } from "react";

import SearchIcon from "@material-ui/icons/Search";
import { InputBase } from "@material-ui/core";

import Card from "./Card";
import PrimeryButton from "./PrimeryButton";
import "./cardsSection.css";
import { withFirebase } from "../../containers/Firebase";

class CardSection extends Component {
  state = {
    searchValue: [],
    rerender: true,
    allData: []
  };

  componentDidMount() {
    const dataArr = [];

    this.props.firebase.db
      .collection("charityData")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.data());
          dataArr.push(doc.data());
        });
      })
      .then(() => {
        this.setState({
          allData: dataArr,
          searchValue: dataArr.map(ele => ele.id)
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }

  addToBtn = () => {
    this.setState({ rerender: true });
  };

  render() {
    const {
      state: { searchValue, allData }
    } = this;

    return (
      <div className="cards-container">
        <section className="card-container__search-section">
          <SearchIcon className="card-container__search-section-icon" />
          <InputBase
            className="card-container__search-section-input"
            placeholder="Search thousands of charities"
            onChange={e => {
              this.setState({
                searchValue: allData
                  .filter(ele =>
                    ele.head
                      .toLowerCase()
                      .startsWith(e.target.value.toLowerCase())
                  )
                  .map(({ id }) => id)
              });
            }}
          />
        </section>
        {allData.map(
          (ele, index) =>
            searchValue.includes(ele.id) && (
              <Card
                icon={ele.icon}
                head={ele.head}
                text={ele.text}
                id={ele.id}
                key={index}
                addToBtn={this.addToBtn}
              />
            )
        )}

        <PrimeryButton addToBtn={this.addToBtn} allData={allData} />
      </div>
    );
  }
}

const FirebaseCardSection = withFirebase(CardSection);

export default FirebaseCardSection;