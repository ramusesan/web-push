import React from "react";
import "./index.css";
import logo from "../../images/logo.png";

export default function index() {
  return (
    <div id="site-logo" className="header" title="Pearson logo">
      <img src={logo} alt="logo" />
    </div>
  );
}
