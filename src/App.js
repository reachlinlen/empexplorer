import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Home from './Pages/Home'
import Overview from './Pages/Overview'

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/overview/:name" component={Overview} />
      </Switch>
    </BrowserRouter>
  )
}