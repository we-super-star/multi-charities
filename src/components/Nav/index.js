import React from "react";

import logo from "../../assets/img/logo.svg";
import "./nav.css";
const Nav = () => {
  return (
    <nav className="main-nav main-container">
      <div className="main-nav__logo">
        <img src={logo} alt="logo" className="main-nav__logo-img" />
      </div>

      <section className="main-nav__list">
        <p className="main-nav__list__faq">FAQ</p>
        <p className="main-nav__list__about">About</p>
      </section>
    </nav>
  );
};

export default Nav;
