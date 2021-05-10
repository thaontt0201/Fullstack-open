import React, { useState } from "react";

const Button = ({ good, neutral, bad, clickGFeedBack }) => {
  return (
    <div>
      <button onClick={clickGFeedBack(good, "good")}>Good</button>
      <button onClick={clickGFeedBack(neutral, "neutral")}>Neutral</button>
      <button onClick={clickGFeedBack(bad, "bad")}>Bad</button>
    </div>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <h3>Statictics</h3>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>All {good + neutral + bad}</p>
      <p>Average {(good - bad) / (good + neutral + bad)}</p>
      <p>Positive {(good / (good + neutral + bad)) * 100} % </p>
    </div>
  );
};

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
      <Button
        good={good}
        neutral={neutral}
        bad={bad}
        clickGFeedBack={clickGFeedBack}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};
export default App;
