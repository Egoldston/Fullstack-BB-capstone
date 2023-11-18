import logo from './logo.svg';
import './App.css';


import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';

import { UserContext } from './components/context';
import NavBar from './components/navbar';
import Home from './components/home'; 
import CreateAccount from './components/createaccount';
import Login from './components/login';
import Deposit from './components/deposit';
import Withdraw from './components/withdraw';
import Balance from './components/balance';
import AllData from './components/alldata';



function App() {
  const initialUserValue = {
    users: [
      {
        name:'abel',
        email:'abel@mit.edu',
        password:'secret',
        balance:100
      }]
    };

  return (
    <HashRouter>
      <div>
        <NavBar/>        
        <UserContext.Provider value={initialUserValue}>
          <div className="container" style={{padding: "20px"}}>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/login/" component={Login} />
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            {/* <Route path="/transactions/" component={Transactions} /> */}
            <Route path="/balance/" component={Balance} />
            <Route path="/alldata/" component={AllData} />
          </div>
        </UserContext.Provider>
      </div>
    </HashRouter>
  );



  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
