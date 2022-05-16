import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [coin, setCoin] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  const fetchCryptoData = async () => {
    await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
      .then((response) => response.json())
      .then((json) => setCoin(json));
  };
  useEffect(() => {
    fetchCryptoData();
  }, []);

  const filterCoins = coin.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  });

  return (
    <div className="App">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          name="coin"
          id="coin"
          aria-describedby="helpId"
          placeholder="Search"
          onChange={(event) => {
            setSearchWord(event.target.value);
          }}
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Market Cap</th>
            <th scope="col">WWAP(24hr) </th>
            <th scope="col">Supply</th>
            <th scope="col">Volume(24hr)</th>
            <th scope="col">Change(24hr) </th>
          </tr>
        </thead>
        <tbody>
          {filterCoins.map((co, id) => (
            <tr key={id}>
              <td scope="row">{co.market_cap_rank}</td>
              <td className="imageTd">
                <img
                  src={co.image}
                  alt=""
                  style={{ width: "20px", height: "20px" }}
                />
                {co.name}
              </td>
              <td>{co.current_price}</td>
              <td>{co.market_cap.toLocaleString()}</td>
              <td>{co.price_change_24h}</td>
              <td>{co.circulating_supply.toLocaleString()}</td>
              <td>{co.total_volume.toLocaleString()}</td>
              {co.price_change_24h < 0 ? (
                <td className="text-danger">
                  {co.price_change_24h.toLocaleString()}
                </td>
              ) : (
                <td className="text-success">
                  {co.price_change_24h.toLocaleString()}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
