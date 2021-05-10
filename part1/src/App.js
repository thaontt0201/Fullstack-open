import React, { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const clickGFeedBack = (value, type) => () => {
    if (type === "good") {
      setGood(value + 1);
    } else if (type === "neutral") {
      setNeutral(value + 1);
    } else {
      setBad(value + 1);
    }
  };
  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={clickGFeedBack(good, "good")}>Good</button>
      <button onClick={clickGFeedBack(neutral, "neutral")}>Neutral</button>
      <button onClick={clickGFeedBack(bad, "bad")}>Bad</button>

      <h4>Statictics</h4>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
    </div>
  );
};
export default App;
