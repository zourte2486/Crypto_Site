import React, { useEffect, useState, useContext } from "react";
import "./Home.css";
import { CoinContext } from "../../Context/CoinContext";
import supabase from "../../supabaseClient"; // make sure this path is correct

function Home() {
  const { allCoins, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [input, setInput] = useState('');

  const inputHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value === '') {
      setDisplayCoin(allCoins);
    }
  }
  const searchHandler = async (event) => {
      event.preventDefault();
      const coins = await allCoins.filter((coin) => {
        return coin.name.toLowerCase().includes(input.toLowerCase());
      })
      
      setDisplayCoin(coins);
  }

  useEffect(() => {
    setDisplayCoin(allCoins);
  }, [allCoins]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) loadFavorites(user.id);
    });
  }, []);

  const loadFavorites = async (userId) => {
    const { data, error } = await supabase
      .from("favorites")
      .select("coin_id")
      .eq("user_id", userId);

    if (!error && data) {
      setFavorites(data.map((fav) => fav.coin_id));
    }
  };

  const addToFavorites = async (coinId) => {
    if (!user) {
      alert("Please login to favorite coins.");
      return;
    }

    const { error } = await supabase
      .from("favorites")
      .insert([{ user_id: user.id, coin_id: coinId }]);

    if (error) {
      console.error("Error adding favorite:", error.message);
    } else {
      setFavorites((prev) => [...prev, coinId]);
    }
  };

  const isFavorite = (coinId) => favorites.includes(coinId);

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
        <form onSubmit={searchHandler}>
          <input onChange={inputHandler}  value={input} type="text" placeholder="Search crypto.." required/>
          <button type="submit">Search</button>
        </form>

        <div className="crypto-table">
          <div className="table-layout">
            <p>Rt</p>
            <p>Coins</p>
            <p>Price</p>
            <p style={{ textAlign: "center" }}>24H Change</p>
            <p className="market-cap">Market Cap</p>
            <p>Favorites</p>
          </div>

          {(displayCoin || []).slice(0, 10).map((coin, index) => (
            <div className="table-layout" key={index}>
              <p>{coin.market_cap_rank}</p>
              <div className="coin-logo">
                <img src={coin.image} alt={coin.name} />
                <span>{coin.name + " - " + coin.symbol}</span>
              </div>
              <p>
                {currency.symbol}
                {coin.current_price.toLocaleString()}
              </p>
              <p
                style={{
                  textAlign: "center",
                  color:
                    coin.price_change_percentage_24h >= 0 ? "green" : "red",
                }}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </p>
              <p className="market-cap">
                {currency.symbol}
                {coin.market_cap.toLocaleString()}
              </p>
              <p>
                <button onClick={() => addToFavorites(coin.id)}>
                  {isFavorite(coin.id) ? "★" : "☆"}
                </button>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
