import React, { useState, useContext } from 'react';
import { UserContext, CustomCard as Card } from './context';
import { getBalance } from './api';


const Balance = () => {
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const [user, setUser] = React.useState({});  
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus} /> :
        <BalanceMsg setShow={setShow} setStatus={setStatus} />}
    />
  )

}

function BalanceMsg(props){
  return(<>
    <h5>Your balance</h5>
  </>);
}


function BalanceForm(props){
  const [email, setEmail]   = React.useState('');
  const [balance, setBalance] = React.useState('');
  // const loggedInUser = JSON.parse(localStorage.getItem('user'));
  const loggedInUserEmail = "henry@gmail.com";
  function handle(){
    getBalance(loggedInUserEmail)
    // .then(response => response.text())
    .then(response => {
        try {
          console.log('response:', response);
          const stringified = JSON.stringify(response);
          console.log('stringified:', stringified);
          const json = JSON.parse(stringified);
          console.log('json:', json);

          props.setStatus(json.data.balance);
          props.setShow(false);
          setBalance(json.data.balance);
        } catch(err) {
          props.setStatus(response)
          console.log('err:', err);
        }
    });
  }

  return (<>

    {/* Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/> */}

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Check Balance
    </button>

  </>);
}

export default Balance;