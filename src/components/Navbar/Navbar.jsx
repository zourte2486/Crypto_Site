import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { useContext } from "react";
import { CoinContext } from "../../Context/CoinContext";

const Navbar = () => {

  const { setCurrency } = useContext(CoinContext);
  const handleCurrencyChange = (event) => {
    switch(event.target.value){
      case "usd":
        setCurrency({
          name: "USD",
          symbol: "$"
        });
        break;
      case "eur":
        setCurrency({
          name: "EUR",
          symbol: "€"
        });
        break;
      case "mad":
        setCurrency({
          name: "GBP",
          symbol: "£"
        });
        break;
      default:
        setCurrency({
          name: "USD",
          symbol: "$"
        });
    }
  };

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
      <select onChange={handleCurrencyChange}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="mad">GBP</option>
        </select>
        <button className="btn">Login</button>
        <button className="btn">Sign up</button>
      </div>

    </div>
  );
};

export default Navbar;
