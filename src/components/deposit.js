import React, { useState, useContext } from 'react';
import { UserContext, CustomCard as Card } from './context';
import { deposit } from './api';


const Deposit = () => {
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={show ? 
        <DepositForm setShow={setShow} setStatus={setStatus}/> :
        <DepositMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function DepositMsg(props){
  return (<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
          props.setShow(true);
          props.setStatus('');
      }}>
        Deposit again
    </button>
  </>);
} 

function DepositForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');

  function handle(){
    deposit(email, amount)
    // .then(response => response.json())
    .then(response => {
        try {
          // console.log(`the response is`, response);
          // console.log(`the response is`, response.json);
          // console.log(`the response is`, response.data);
          // const data = JSON.parse(response.data);
          // console.log(`the response is`, data);
          // props.setStatus(`Balance: $ ${data.value["balance"]}`);
          props.setStatus('Deposit Success; goto Balance tab to see balance.')
          props.setShow(false);
          // console.log('JSON:', data);
        } catch(err) {
          props.setStatus('Deposit failed')
          console.log('err:', err);
          console.log('response:', response);
        }
    })
    .catch(err => {
      console.log("failed to deposit", err)
      props.setStatus('Deposit failed.')
    });
    props.setShow(false);
    

    

    // fetch(`/account/update/${email}/${amount}`)
    // .then(response => response.text())
    // .then(text => {
    //     try {
    //         const data = JSON.parse(text);
    //         props.setStatus(`Balance: $ ${data.value["balance"]}`);
    //         props.setShow(false);
    //         console.log('JSON:', data);
    //     } catch(err) {
    //         props.setStatus('Deposit failed')
    //         console.log('err:', text);
    //     }
    // });
  }

  return(<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
      
    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Deposit</button>

  </>);
}

export default Deposit;