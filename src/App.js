import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';
import coinLogo from './dollar.svg';

function App() {
  const [coins,setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [supportedCurrencies, setSupportedCurrencies] = useState([]);
  const [actualCurrency, setCurrency] = useState('usd');

  useEffect(() => {
    //Get supported currencies
    axios.get('https://api.coingecko.com/api/v3/simple/supported_vs_currencies')
    .then(res => {
      setSupportedCurrencies(res.data);
      console.log(res.data);
    })
    .catch(error => console.log(error))

    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${actualCurrency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
      .then(res => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error));
  },[actualCurrency]);

  const handleChangeCurrency = e => {
    setCurrency(e.target.value);
  }

  const handleChangeSearch = e => {
    setSearch(e.target.value);
  }

  const realCurrency = ['eur','usd','jpy','gbp','aud','inr','cad','sgd','ars','chf','hkd','mxn'];

  const filteredCurrency = supportedCurrencies.filter(currency => {
    return realCurrency.includes(currency);
  })
  console.log(filteredCurrency);

  const filteredCoins = coins.filter(coin => {
    return coin.name.toLowerCase().includes(search.toLocaleLowerCase());
  })

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Top 100 Coins by Market Capitalization</h1>
        <form className="coin-form">
          <label> Select a currency:</label>
          <select 
            value={actualCurrency}
            onChange={handleChangeCurrency}
            className="coin-input"
          >
            {filteredCurrency.map((currency, i) => {
              return(
                <option 
                  key={i} 
                  value={currency}
                >
                  {currency}
                </option>
              );
            })}
          </select>
          <label>Search a Cryptocurrency</label>
          <input 
            type="text" 
            placeholder="Search" 
            className="coin-input"
            onChange={handleChangeSearch}
          />
        </form>
      </div>
      <div className="coin-container">
            <div className="coin-row">
                <div className="coin">
                <img src={coinLogo} alt="crypto" />
                    <h1>Coin</h1>
                    <p className="coin-symbol"></p>
                </div>
                <div className="coin-data">
                    <p className="coin-price">Price</p>
                    <p className="coin-volume">24h Volume</p> 
                    <p className="coin-percent">24h</p>
                    <p className="coin-marketcap">Mkt Cap</p>
                </div>
            </div>
        </div>
      {filteredCoins.map(coin => {
        return(
          <Coin 
            key={coin.id} 
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            price={coin.current_price}
            marketcap={coin.market_cap}
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
          />
        )
      })}
    </div>
  );
}

export default App;
