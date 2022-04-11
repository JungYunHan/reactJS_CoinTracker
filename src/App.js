import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [balance, setBalance] = useState("");
  const [click, setClick] = useState(true);
  const [coinName, setCoinName] = useState("");
  const onChange = (event) => {
    setBalance(event.target.value);
  };
  const onClick = () => {
    setClick(false);
  };
  const onSelect = (event) => {
    setCoinName(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (balance === "") {
      return;
    }
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins{loading ? "" : `(total: ${coins.length}coins)`}</h1>
      {click ? (
        <form onSubmit={onSubmit}>
          <input
            onChange={onChange}
            value={balance}
            type="text"
            placeholder="input your balance"
          />
          <button onClick={onClick}>Deposit</button>
        </form>
      ) : (
        <h2>Your balance: {`${balance} USD`}</h2>
      )}
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <select onChange={onSelect}>
            <option>Select coin</option>
            {coins.map((coin) => (
              <option>
                {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
          <hr />
          {`You can buy ${(1 / coinName.split(" ")[2]) * balance}${" "}
          ${coinName.split(" ")[0]} with your balance.`}
        </div>
      )}
    </div>
  );
}

export default App;
