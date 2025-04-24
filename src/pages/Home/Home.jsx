import React, { useEffect, useState, useContext } from "react";
import "./Home.css";
import { CoinContext } from "../../Context/CoinContext";

function Home() {
  const { allCoins, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);

  useEffect(() => {
    setDisplayCoin(allCoins);
  }, [allCoins]);

  return (
    <div className="home">
      <div className="hero">
        <h1>
          A9wed <br />
          Crypto Marketplace
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

          {(displayCoin || []).slice(0, 10).map((coin, index) => (
            <div className="table-layout" key={index}>
              <p>{coin.market_cap_rank}</p>
              <div className="coin-logo">
                <img src={coin.image} alt={coin.name} />
                <span>{coin.name + " - "+ coin.symbol}</span>
              </div>
              <p>{currency.symbol}{coin.current_price.toLocaleString()}</p>
              <p style={{ textAlign: "center", color: coin.price_change_percentage_24h >= 0 ? "green" : "red" }}>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </p>
              <p style={{ textAlign: "right" }}>
                {currency.symbol}{coin.market_cap.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
