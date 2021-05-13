import React, { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);
  const [voted, setVoted] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
  const [max, setMax] = useState(0);

  const nextButton = () => {
    setSelected(selected + 1);
  };
  const voteButton = () => {
    setVoted({ ...voted, [selected]: voted[selected] + 1 });
    let maximum = 0;
    let maxKey = 0;
    for (let key of Object.keys(voted)) {
      if (voted[key] > maximum) {
        maximum = voted[key];
        maxKey = key;
      }
    }
    setMax(maxKey);
  };

  console.log(max);
  const Hottest = () => {
    let maximum = 0;
    let maxKey = 0;
    for (let key of Object.keys(voted)) {
      if (voted[key] > maximum) {
        maximum = voted[key];
        maxKey = key;
      }
    }
    setMax(maxKey);
  };

  return (
    <div>
      <p> {anecdotes[selected]} </p>
      <p>Has {voted[selected]} votes</p>
      <button onClick={voteButton}>vote</button>
      <button onClick={nextButton}>next anecdote</button>
      <h1>Most votes</h1>
      <p>{anecdotes[max]}</p>
      <p>{voted[max]}</p>
    </div>
  );
};
export default App;
