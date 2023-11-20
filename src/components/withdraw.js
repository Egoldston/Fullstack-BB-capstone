import React, { useState, useContext } from 'react';
import { UserContext, CustomCard as Card } from './context';
import { withdraw } from './api';
  

const Withdraw = () => {
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus} /> :
        <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}


function WithdrawMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Withdraw again
    </button>
  </>);
}

function WithdrawForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');

  // function handle(){
  //   withdraw(email, amount)
  //     .then(response => {
  //       try {
  //           const data = JSON.parse(response);
  //           props.setStatus(`Balance: $ ${data.value["balance"]}`);
  //           props.setShow(false);
  //           console.log('JSON:', data);
  //       } catch(err) {
  //           props.setStatus('Withdraw failed')
  //           console.log('err:', response);
  //       }
  //   })
  //   .catch(err => {
  //     console.log("failed to withdraw", err)
  //     props.setStatus('Withdraw failed.')
  //   });
  //   props.setShow(false);
  // }

  function handle() {
    withdraw(email, amount)
      .then(response => {
        try {
          const data = JSON.parse(response);
          props.setStatus(`Balance: $ ${data.value["balance"]}`);
          props.setShow(false);
          console.log('JSON:', data);
        } catch (err) {
          props.setStatus('Withdraw failed')
          console.log('err:', response);
        }
      })
      .catch(err => {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log('Server Error:', err.response.data);
          console.log('Status:', err.response.status);
          props.setStatus('Withdraw failed. Server error.');
          // You might want to further process the error here
        } else if (err.request) {
          // The request was made but no response was received
          console.log('No response received:', err.request);
          props.setStatus('Withdraw failed. No response received.');
        } else {
          // Something happened in setting up the request that triggered an error
          console.log('Error:', err.message);
          props.setStatus('Withdraw failed. Error in request setup.');
        }
      });
    props.setShow(false);
  }



  return(<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>

  </>);
}

export default Withdraw;
