import React from "react";
import "./App.scss";

import IconReact from "./static/react.svg";

export const App: React.FC = () => (
  <div className="app">
    <h1 className="app__title">React Typescript Webpack Template</h1>
    <img src={IconReact} alt="react icon" className="app__icon" />
  </div>
);
