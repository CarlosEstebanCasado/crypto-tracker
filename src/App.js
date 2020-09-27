import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [coins,setCoins] = useState([]);

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => {
        setCoins(res.data);
      })
      .catch(error => console.log(error));
  })

  return (
    <div className="coin-app">
      <h1>API Crypto</h1>
    </div>
  );
}

export default App;
