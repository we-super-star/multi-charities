import React, { Component } from "react";
import { withFirebase } from "../../containers/Firebase";

import Nav from "../../components/Nav";
import CardsSection from "../../components/CardsSection";

import mainImg from "../../assets/img/main.svg";
import "./home.css";

class Home extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    const clickedObj = JSON.parse(localStorage.getItem("clickedObj"));
    !clickedObj && localStorage.setItem("clickedObj", JSON.stringify({}));
    localStorage.setItem("selected", JSON.stringify({}));
    this.setState({ loading: false });
  }

  render() {
    const {
      state: { loading }
    } = this;

    return (
      <span>
        {loading ? (
          <h2>loading...</h2>
        ) : (
          <div>
            <Nav />

            <section className="main-container main-content">
              <div className="main-content__main-img">
                <h2 className="main-content__main-img-head">
                  Donate directly to all of your favorite&nbsp;
                  <br className="desktop-break-line" />
                  charities at the click of a<a>button.</a>
                </h2>

                <img src={mainImg} alt="" />

                <p className="main-content__main-img-text">
                  <h3>
                    Create your own <br /> CharityButton
                  </h3>
                  Embed your new CharityButton anywhere on the web. Donations
                  made through your CharityButton are split evenly and sent
                  instantly to your favorite selected charities.
                </p>
              </div>

              <CardsSection />
            </section>
          </div>
        )}
      </span>
    );
  }
}

const firebaseHome = withFirebase(Home);
export default firebaseHome;
