import React, { Component } from "react";

import SearchIcon from "@material-ui/icons/Search";
import { InputBase, Button, Snackbar, Typography } from "@material-ui/core";
import CardMaterial from "@material-ui/core/Card";

import Card from "./Card";
import "./cardsSection.css";
import "./PrimeryButton/button.css";
import { withFirebase } from "../../containers/Firebase";

class CardSection extends Component {
  state = {
    searchValue: [],
    rerender: true,
    allData: [],
    openSnackBar: false
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

  handleClick = event => {
    console.log(event.currentTarget);
    this.setState({
      openSnackBar: true
    });
  };

  handleClose = () => {
    this.setState({
      openSnackBar: false
    });
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
                allData={allData}
                openSnackBar={this.state.openSnackBar}
              />
            )
        )}
        <div className="card-container__button">
          <Button onClick={this.handleClick}>Create a Charity Button..</Button>
          <Snackbar
            open={this.state.openSnackBar}
            autoHideDuration={6000}
            onClose={this.handleClose}
          >
            <CardMaterial className="card-container__popup">
              <Typography>We are working with this!</Typography>
            </CardMaterial>
          </Snackbar>
        </div>

        {/* <PrimeryButton addToBtn={this.addToBtn} allData={allData} /> */}
      </div>
    );
  }
}

const FirebaseCardSection = withFirebase(CardSection);

export default FirebaseCardSection;
