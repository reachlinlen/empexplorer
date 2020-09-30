import React from "react";
import ReactDOM from "react-dom";
import Home from '../src/Pages/Home'
import { Router, Link } from "@reach/router"

import './assets/main.css'

const App = ({ children }) => (
  <Router>
    <Home path="/" />
    {/* <Overview path="overview/:empname" /> */}
  </Router>
)


ReactDOM.render(<App />, document.getElementById("container"))