import './App.css';

import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';

import { UserContext } from './components/context';
import NavBar from './components/navbar';
import Home from './components/home'; 
import CreateAccount from './components/createaccount';
import SignUp from './components/signup';
import Login from './components/login';
import Logout from './components/logout';
import Deposit from './components/deposit';
import Withdraw from './components/withdraw';
import Balance from './components/balance';

function App() {
  return (
    <HashRouter>
      <div>
        <NavBar/>
        <UserContext.Provider value={null}>
          <div className="container" style={{padding: "20px"}}>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/signup/" component={SignUp} />
            <Route path="/login/" component={Login} />
            <Route path="/logout/" component={Logout} />
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            <Route path="/balance/" component={Balance} />
          </div>
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}


export default App;
