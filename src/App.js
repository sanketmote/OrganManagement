import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
} from "react-router-dom";

import React from 'react'
import { Login, DRegister,HRegister } from "./Screens/index";
import HomePage from './Screens/HomePage'
import User from "./user"
import Huser from "./Huser"
import DashBoard from './Screens/HospitalScreens/DashBoard'
export default function App() {
  return (
    <div>
      <Router>
        <div>

          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/user">
              <User />
            </Route>
            <Route path="/huser">
              <Huser />
            </Route>
            <Route path="/DRegister">
              <DRegister />
            </Route>
            <Route path="/HRegister">
              <HRegister />
            </Route>
            <Route path="/HDashboard">
              <DashBoard />
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
