import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Home from '../src/Pages/Home'
import Overview from './Pages/Overview'

import './assets/main.css'

ReactDOM.render(
  <BrowserRouter>
    {/* <Routes>
      <Home path="/" />
      <Overview path="overview/:name" />
    </Routes> */}
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/overview/:name" component={Overview} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("container"))