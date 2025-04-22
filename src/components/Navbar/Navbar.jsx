import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logo} alt="logo" className="logo" />
      <ul >
        <li className="hover-underline">Home</li>
        <li className="hover-underline">Freatures</li>
        <li className="hover-underline">Pricing</li>
        <li className="hover-underline">Blog</li>
      </ul>
      <div className="nav-right">
      <select>
          <option value="usd">Usd</option>
          <option value="eur">Eur</option>
          <option value="mad">Mad</option>
        </select>
        <button className="btn">Login</button>
        <button className="btn">Sign up</button>
      </div>

    </div>
  );
};

export default Navbar;
