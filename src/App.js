import logo from './logo.jpg';
import React from 'react';
import './App.css';
import { Button, Card, Segment } from 'semantic-ui-react';
import { Login, Register } from "./Screens/index";
import styles from './styles/home.css'
import {  Redirect } from "react-router-dom";

class App extends React.Component {

  onSubmitL = () => {
    return <Redirect to="/user" />
  }
  render() {
    return (
      <div className="App App-logo">
        <header className="App-header App-logo">

          <section className="App-Welcome">
            <div className="center">
              <h1 className="title">
                Welcome to Organ Managemnet System
              </h1>
              <button> <span> Login </span> </button>
              <button> <span>User Registration</span> </button>
              <button> <span>Hospital Registration</span>  </button>
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
//             <button> <span> Login </span> </button>
//             <button> <span>User Registration</span> </button>
//             <button> <span>Hospital Registration</span>  </button>
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

export default App;