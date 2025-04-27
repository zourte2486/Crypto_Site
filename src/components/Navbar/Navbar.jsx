import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { CoinContext } from "../../Context/CoinContext";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";
import avatarIcon from "../../assets/avatar.png";
import Favorites from "../Favorites";

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setDropdownOpen(false);
    navigate("/");
  };

  const handleCurrencyChange = (event) => {
    switch (event.target.value) {
      case "usd":
        setCurrency({ name: "USD", symbol: "$" });
        break;
      case "eur":
        setCurrency({ name: "EUR", symbol: "€" });
        break;
      case "mad":
        setCurrency({ name: "GBP", symbol: "£" });
        break;
      default:
        setCurrency({ name: "USD", symbol: "$" });
    }
  };

  return (
    <div className="navbar">
      <img
        src={logo}
        alt="logo"
        className="logo"
        onClick={() => navigate("/")}
      />
      <ul>
        <li className="hover-underline" onClick={() => navigate('/')}>Home</li>
        <li className="hover-underline" >Features</li>
        <li className="hover-underline">Pricing</li>
        <li className="hover-underline">Blog</li>
      </ul>
      <div className="nav-right">
        <select onChange={handleCurrencyChange}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="mad">GBP</option>
        </select>

        {!user ? (
          <>
            <button className="btn" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="btn" onClick={() => navigate("/signup")}>
              Sign
            </button>
          </>
        ) : (
          <div className="avatar-wrapper">
            <img
              src={avatarIcon}
              alt="avatar"
              className="avatar"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="dropdown">
                <p onClick={() => navigate('/favorites')}>⭐ Favorites</p>
                <p onClick={() => alert("Settings coming soon!")}>⚙ Settings</p>
                <p onClick={handleLogout}>🚪 Logout</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
