import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { auth, firebase } from "./firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { UserContext, CustomCard as Card } from './context';
import { login } from './api';


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
          <LoginForm setShow={setShow} setStatus={setStatus} />
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

      login(email, password)
        .then(response => {
          try {
            console.log('response:', response);
            const stringified = JSON.stringify(response);
            console.log('stringified:', stringified);
            const json = JSON.parse(stringified);
            console.log('json:', json);


            localStorage.setItem("token", json.data);
            // localStorage.setItem('user')

            // const data = JSON.parse(text);
            // // Assuming the server response includes user data like id, name, etc.
            // // Store user data in localStorage
            // localStorage.setItem('user', JSON.stringify(data));
            // console.log('Balance:', data.balance);
            // console.log('User:', data.name);
            // props.setStatus('');
            // props.setShow(false);
            // props.setUser(data); 
            // console.log('JSON:', data);

            
          props.setStatus(null);
          props.setShow(false);
          } catch(err) {
            props.setStatus(response);
            console.log('err:', response);
          }
        })
        .catch(err => {
          props.setStatus("failed to login; wrong username or password");
          console.log("failed to login; wrong username or password", err)
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


function LoginFormGoogle1(props) {
  // const history = useHistory();
  async function googleLogin() {
    //1 - init Google Auth Provider
    const provider = new GoogleAuthProvider();
    //2 - create the popup signIn
    await auth.signInWithPopup(provider).then(
      async (result) => {
        //3 - pick the result and store the token
        const token = await auth?.currentUser?.getIdToken(true);
        //4 - check if have token in the current user
        if (token) {
          //5 - put the token at localStorage (We'll use this to make requests)
          localStorage.setItem("@token", token);
          //6 - navigate user to the book list
          // history.push("/deposit");
        }
      },
      function (error) {
        console.log(error);
      }
    );
  }
  return (
    <div>
      <button onClick={googleLogin} className="login-button">
        GOOGLE
      </button>
    </div>
  );
}

function LoginFormGoogle2(props) {
  // const history = useHistory();
  async function googleLogin() {
    //1 - init Google Auth Provider
    const provider = new GoogleAuthProvider();
    //2 - create the popup signIn
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        localStorage.setItem("@token", token);

        // The signed-in user info.
        const user = result.user;
        localStorage.setItem("@user", user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      })
  }
  return (
    <div>
      <button onClick={googleLogin} className="login-button">
        GOOGLE
      </button>
    </div>
  );
}



export default Login;
  








// import React, { Component } from 'react';
// import firebaseApp from './firebase';

// export default class Login extends Component {

//   componentDidMount() {
//     firebaseApp.auth().onAuthStateChanged(user => {
//       if (user) {
//         console.log(user);
//       }
//     });
//   }

//   authenticate() {
//     var provider = new firebaseApp.auth.GoogleAuthProvider();
//     provider.addScope('profile');
//     provider.addScope('email');

//     firebaseApp.auth().signInWithPopup(provider)
//       .then(result => {
//         console.log(result);
//       })
//   }

//   render() {
//     return (
//       <div>
//         <h1>Login Page</h1>
//         <button onClick={this.authenticate.bind(this)}>
//           Login with Google
//         </button>
//       </div>

//     );
//   }
// }