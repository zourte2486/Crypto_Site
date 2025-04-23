import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>
          {" "}
          A9wed <br />
          Crypto Marketplace{" "}
        </h1>
        <p>
          Welcome to the world's A9wed cryptocurrency marketplace. <br />
          Sign up to explore more about cryptos.
        </p>
        <form>
          <input type="text" placeholder="Search crypto.." />
          <button type="submit">Search</button>
        </form>
        <div className="crypto-table">
          <div className="table-layout">
            <p>#</p>
            <p>Coins</p>
            <p>Price</p>
            <p style={{ textAlign: "center" }}>24H Change</p>
            <p style={{ textAlign: "right" }}>Market Cap</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
