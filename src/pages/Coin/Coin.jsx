import React, { useContext } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CoinContext } from './../../Context/CoinContext';

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const {currency} = useContext(CoinContext)

  const fetchCoinData = React.useCallback(async () => {
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-Rwux4WAqZ1UJghbvW9iTG9Sd'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(res => res.json())
      .then(res => setCoinData(res))
      .catch(err => console.error(err));
  }, [coinId, setCoinData]);

  useEffect(() => {
    fetchCoinData();
  }, [fetchCoinData, currency]);

  if(coinData) {
    return ( 
      <div>
        <div className="coin">
          <div className="coin-name">
            <img src={coinData.image.large} alt={coinData} />
            <p> <b>{coinData.name} ({coinData.symbol.toUpperCase()})</b> </p>
          </div>
        </div>
      </div>
    )
  }else {
    return (
      <div className="spinner">
        <div className="spin">
          
        </div>
      </div>
    )
  }
};

export default Coin;
