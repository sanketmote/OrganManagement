import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
} from "react-router-dom";

import React from 'react'
import { Login, DRegister,HRegister } from "./Screens/index";
import HomePage from './Screens/HomePage'

export default function App() {
  return (
    <div>
      <Router>
        <div>

          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/DRegister">
              <DRegister />
            </Route>
            <Route path="/HRegister">
              <HRegister />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}
