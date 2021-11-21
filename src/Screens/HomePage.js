import React from "react";
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//   } from "react-router-dom";
// import logo from './logo.jpg';
import '../App.css';
import {
  Button,
  // Card, Segment 
} from 'semantic-ui-react';
// import { Login, Register } from "./Screens/index";
// import '../styles/home.css'

export class HomePage extends React.Component {
  s = () => {
    require("../styles/home.css");
  }
  render() {
    this.s();
    return (
      <div className="App App-logo">
        <header className="App-header App-logo">

          <section className="App-Welcome">
            <div className="center">
              <h1 className="title">
                Welcome to Organ Managemnet System
              </h1>
              <a href="/login"><Button> <span> Login </span> </Button> </a>
              <a href="/DRegister"><Button> <span>User Registration</span> </Button></a>
              <a href="/HRegister"><Button> <span>Hospital Registration</span>  </Button></a>
            </div>
            {/* <Segment className="grid">
              <Button style={{ margin: '5px' }} content="Login" primary className="card" />
              <Button style={{ margin: '5px' }} content="User Registration" primary className="card" />
              <Button style={{ margin: '5px' }} content="Hospital Registration" primary className="card" />
            </Segment> */}
          </section>


        </header>
      </div>
    )
  }
}
// function App() {
//   return (
//     <div className="App App-logo">
//       <header className="App-header App-logo">

//         <section className="App-Welcome">
//           <div className="center">
//             <h1 className="title">
//               Welcome to Organ Managemnet System
//             </h1>
//             <Button> <span> Login </span> </Button>
//             <Button> <span>User Registration</span> </Button>
//             <Button> <span>Hospital Registration</span>  </Button>
//           </div>
//           {/* <Segment className="grid">
//             <Button style={{ margin: '5px' }} content="Login" primary className="card" />
//             <Button style={{ margin: '5px' }} content="User Registration" primary className="card" />
//             <Button style={{ margin: '5px' }} content="Hospital Registration" primary className="card" />
//           </Segment> */}
//         </section>


//       </header>
//     </div>
//   );
// }