import React from "react";
import "./App.scss";
import SliderExample from "./pages/SliderExample";

type Props = {};

const App = (props: Props) => {
  return (
    <div className="wrapper">
      <div className="dark-background"></div>
      <SliderExample />
    </div>
  );
};

export default App;
