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
        <UserContext.Provider value={null}>
          <div className="container" style={{padding: "20px"}}>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/login/" component={Login} />
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            {/* <Route path="/transactions/" component={Transactions} /> */}
            <Route path="/balance/" component={Balance} />
            {/* <Route path="/alldata/" component={AllData} /> */}
          </div>
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}

export default App;
