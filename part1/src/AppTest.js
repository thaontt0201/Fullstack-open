import React, { useState } from "react";

const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }
  return <div>button press history: {props.allClicks.join(" ")}</div>;
};

const Button = (props) => {
  console.log("props value is", props);
  const { handleClick, text } = props;
  return <button onClick={handleClick}>{text}</button>;
};

const AppTest = () => {
  const [value, setValue] = useState(10);
  const resetZero = (nuber) => () => {
    setValue(nuber);
    console.log(value);
  };

  return (
    <div>
      {value}
      <button onClick={resetZero(0)}>reset to zero</button>
      <button onClick={resetZero(20)}>reset to 20</button>
      <button onClick={resetZero(value + 1)}>reset to increment</button>
    </div>
  );
};

export default AppTest;
