import { useState } from "react";

import "./App.css";

export default function App() {
  const [bill, setBill] = useState(null);
  const [userTip, setUserTip] = useState(0);
  const [friendTip, setFriendTip] = useState(0);

  function handleReset() {
    setBill(0);
    setUserTip(0);
    setFriendTip(0);
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Bill bill={bill} onBill={setBill} />
      <Tip tip={userTip} onTip={setUserTip}>
        What did you think of the service?
      </Tip>
      <Tip tip={friendTip} onTip={setFriendTip}>
        What did your friend think of the service?
      </Tip>
      <TotalToPay bill={bill} userTip={userTip} friendTip={friendTip} />
      <GenericButton onClick={handleReset}> RESET DAT THANG</GenericButton>
    </div>
  );
}

function Bill({ bill, onBill }) {
  return (
    <div style={{ display: "flex" }}>
      <label>How much was the bill?</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => onBill(Number(e.target.value))}
        placeholder={0}
      />
    </div>
  );
}

function Tip({tip, onTip, children }) {
  const options = [
    { option: "A Lot! 20%", value: 20 },
    { option: "A Bit! 10%", value: 10 },
    { option: "It's ok. 5%", value: 5 },
    { option: "Bad. baaaad. 0%", value: 0 },
  ];

  function handleChange(e) {
    onTip(e.target.value);
  }

  return (
    <div style={{ display: "flex" }}>
      <label>{children}</label>
      <select value={tip} onChange={handleChange}>
        {options.map((o) => (
          <option key={o.option} value={o.value}>
            {o.option}
          </option>
        ))}
      </select>
    </div>
  );
}

function TotalToPay({ bill, userTip, friendTip }) {
  return bill
    ? `Total Amount is: ${
        bill + ((userTip / 100 + friendTip / 100) / 2) * bill
      }`
    : "Please define final tally and bill amounts!";
}

function GenericButton({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}
