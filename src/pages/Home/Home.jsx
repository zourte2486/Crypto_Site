import React from "react";
import "./Home.css";
import { useEffect, useState, useContext } from "react";
import { CoinContext } from "../../Context/CoinContext";

function Home() {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);
  


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
          {displayCoin.map((coin, index) => {
            return (
              <div className="table-layout" key={index}>
                <p>{index + 1}</p>
                <p>{coin.name}</p>
                <p>{currency.symbol + coin.current_price}</p>
                <p style={{ textAlign: "center" }}>{coin.price_change_percentage_24h}%</p>
                <p style={{ textAlign: "right" }}>{currency.symbol + coin.market_cap}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
