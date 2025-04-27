import React, { useContext } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CoinContext } from "./../../Context/CoinContext";
import LineChart from "../../components/LineChart/LineChart";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [Historical, setHistoricalData] = useState();
  const { currency } = useContext(CoinContext);

  const fetchCoinData = React.useCallback(async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-Rwux4WAqZ1UJghbvW9iTG9Sd",
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((res) => res.json())
      .then((res) => setCoinData(res))
      .catch((err) => console.error(err));
  }, [coinId, setCoinData]);

  const fetchHistoricalData = React.useCallback(async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-Rwux4WAqZ1UJghbvW9iTG9Sd",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
      options
    )
      .then((res) => res.json())
      .then((res) => setHistoricalData(res))
      .catch((err) => console.error(err));
  }, [coinId, currency.name, setHistoricalData]);

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [fetchCoinData, fetchHistoricalData, currency]);

  if (coinData && Historical) {
    return (
      <div className="coin">
        <div className="coin-name">
          <img src={coinData.image.large} alt={coinData} />
          <p>
            {" "}
            <b>
              {coinData.name} ({coinData.symbol.toUpperCase()})
            </b>{" "}
          </p>
        </div>
        <div className="coin-chart">
          <LineChart HistoricalData={Historical} />
        </div>
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Crypto Price</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data?.current_price[
                currency.name.toLowerCase()
              ]?.toLocaleString() ?? "N/A"}
            </li>
          </ul>
          <ul>
            <li>Market cap</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data?.market_cap[
                currency.name.toLowerCase()
              ]?.toLocaleString() ?? "N/A"}
            </li>
          </ul>
          <ul>
            <li>24h High</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data?.high_24h[
                currency.name.toLowerCase()
              ]?.toLocaleString() ?? "N/A"}
            </li>
          </ul>
          <ul>
            <li>24h Low</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data?.low_24h[
                currency.name.toLowerCase()
              ]?.toLocaleString() ?? "N/A"}
            </li>
          </ul>
          <ul>
            <li>Homepage</li>
            <li>
              <a
                href={coinData.links.homepage[0]}
                target="_blank"
                rel="noopener noreferrer"
              >
                {coinData.links.homepage[0]}
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
};

export default Coin;
