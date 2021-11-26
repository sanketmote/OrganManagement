import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  // Link,
} from "react-router-dom";

import React from 'react'
import Loader from "./Screens/loader"
import { Login, DRegister, HRegister, UDashboard, Donar, DashBoard, ADashboard, CDashboard, HomePage,Transplant } from "./Screens/index";
import User from "./user"
import Huser from "./Huser"
import AuthService from "./services/auth.service"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      hospitals: false,
      users: false,
      isAdmin: false,
      currentUser: undefined,
      isloggedIn: false,
      datafetched: false,
    };
  }

  async componentDidMount() {
    const user = await AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        isloggedIn: user !== undefined ? true : false,
        isAdmin: user.roles === 'Admin' ? true : false,
        users: user.roles === "users" ? true : false,
        hospitals: user.roles === "Hospitals" ? true : false,
        datafetched: true,
      });
    }
    if(user === null){
      this.setState({
        datafetched: true,
      });
    }
  }

  logOut() {
    AuthService.logout();
  }
  render() {

    const { isloggedIn, users, hospitals, isAdmin, datafetched } = this.state;
    console.log(isloggedIn,!datafetched);
    if (!datafetched) {
      return (
        <Loader />
      )
    } else {
      return (
        <div>
          <Router>
            <div>

              <Switch>

              

                <Route path="/login">
                  {isloggedIn && users ? <Redirect to='/CDashboard' /> : (isloggedIn && hospitals ? <Redirect to='/huser' /> : (isloggedIn && isAdmin ? <Redirect to='/ADashboard' /> : <Login />))}
                <Login />
                </Route>

                <Route exact path="/user">
                  {isloggedIn && users ? <CDashboard /> : <Redirect to="/login" />}
              
                </Route>

                <Route path="/huser">
                  {isloggedIn && hospitals ? <DashBoard /> : <Redirect to="/login" />}
                </Route>

                <Route path="/DRegister">
                  {isloggedIn && users ? <Redirect to='/user' /> : (hospitals ? <Redirect to='/huser' /> : <DRegister />)}
                </Route>

                <Route path="/HRegister">
                  {isloggedIn && users ? <Redirect to='/user' /> : (hospitals ? <Redirect to='/huser' /> : <HRegister />)}
                </Route>

                <Route path="/HDashboard">
                  {/* <DashBoard /> */}
                  {isloggedIn && hospitals ? <DashBoard /> : <Redirect to="/login" />}
                  {/* <DashBoard /> */}
                </Route>

                <Route path="/ADashboard">
                  {isloggedIn && isAdmin ? <ADashboard /> : <Redirect to='/login' />}
                  {/* <ADashboard /> */}
                </Route>

                <Route path="/donar">
                  {isloggedIn && users ? <Donar /> : <Redirect to="/login" />}
                  {/* <Donar /> */}
                </Route>

                <Route path="/admin">
                  {isloggedIn && isAdmin ? <Redirect to='/ADashboard' /> : <Redirect to='/' />}
                </Route>

                <Route path="/udashboard">
                  {/* {isloggedIn && users ? <Redirect to='/udashboard' /> : <Redirect to='/udashboard' /> }
                 */}
                  <UDashboard />
                </Route>
                <Route path="/Transplant">
                  {/* {isloggedIn && users ? <Redirect to='/udashboard' /> : <Redirect to='/udashboard' /> } */}
                
                  <Transplant />
                </Route>

                <Route path="/CDashboard">
                  {isloggedIn && users ? <CDashboard />  : <Redirect to='/' /> }
                  {/* <CDashboard /> */}
                </Route>

                <Route path="/">
                  {isloggedIn && users ? <Redirect to='/user' /> : (isloggedIn && hospitals ? <Redirect to='/huser' /> : (isloggedIn && isAdmin ? <Redirect to='/ADashboard' /> : <HomePage />))}
                  {/* <HomePage /> */}
                </Route>

                


              </Switch>
            </div>
          </Router>
        </div>
      )
    }
  }

}
