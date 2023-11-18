import React, { useState, useContext } from 'react';
import { UserContext, CustomCard as Card } from './context'

const Login = () => {
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const [user, setUser] = React.useState(null);
  
  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={
        show ? (
          <LoginForm />
        ) : (
          <LoginMsg setShow={setShow} setStatus={setStatus} user={user} />
        )
      }
    />
  );
}
 

function LoginMsg(props) {
  return (
    <>
      <h5>Welcome: {props.user ? props.user.name : 'Guest'}</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        Authenticate again
      </button>
    </>
  );
}
function LoginForm(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
  
    function handle() {
      fetch(`/account/login/${email}/${password}`)
        .then(response => response.text())
        .then(text => {
          try {
            const data = JSON.parse(text);
            // Assuming the server response includes user data like id, name, etc.
            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(data));
            console.log('Balance:', data.balance);
            console.log('User:', data.name);
            props.setStatus('');
            props.setShow(false);
            props.setUser(data); 
            console.log('JSON:', data);
          } catch(err) {
            props.setStatus(text);
            console.log('err:', text);
          }
        });
    }
  
    return (
      <>
        Email<br/>
        <input type="input"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.currentTarget.value)}/><br/>
  
        Password<br/>
        <input type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.currentTarget.value)}/><br/>
  
        <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
      </>
    );
}


// function LoginFormGoogle(props) {
//   // const history = useHistory();
//   async function googleLogin() {
//     //1 - init Google Auth Provider
//     console.log('FIREBASE = ', firebase);
//     console.log('window.FIREBASE = ', window.firebase);
//     console.log('window.ADMIN = ', window.firebaseAdmin);

//     console.log('window.FIREBASE.auth = ', window.firebase.auth);
//     console.log('window.ADMIN.auth = ', window.firebaseAdmin.auth);

//     console.log('window.FIREBASE.auth() = ', window.firebase.auth());
//     console.log('window.ADMIN.auth() = ', window.firebaseAdmin.auth());

//     const auth = window.firebase.auth();




//     // const provider = new auth.GoogleAuthProvider();
//     // //2 - create the popup signIn
//     // await auth.signInWithPopup(provider).then(
//     //   async (result) => {
//     //     //3 - pick the result and store the token
//     //     const token = await auth?.currentUser?.getIdToken(true);
//     //     //4 - check if have token in the current user
//     //     if (token) {
//     //       //5 - put the token at localStorage (We'll use this to make requests)
//     //       localStorage.setItem("@token", token);
//     //       //6 - navigate user to the book list
//     //       // history.push("/deposit");
//     //     }
//     //   },
//     //   function (error) {
//     //     console.log(error);
//     //   }
//     // );
//   }
//   return (
//     <div>
//       <button onClick={googleLogin} className="login-button">
//         GOOGLE
//       </button>
//     </div>
//   );
// }

export default Login;
  