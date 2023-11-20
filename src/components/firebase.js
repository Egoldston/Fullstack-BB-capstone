import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD92hJmoz9hGZxC7DsQmXADMOHH8Kt0IiQ",
    authDomain: "fullstackbb.firebaseapp.com",
    projectId: "fullstackbb",
    storageBucket: "fullstackbb.appspot.com",
    messagingSenderId: "119221644456",
    appId: "1:119221644456:web:1342312e1681ddd6d0e69d",
};

const firebase = initializeApp(firebaseConfig);

const auth = getAuth(firebase);

export { auth, firebase };







// import * as firebase from 'firebase/app';

// const firebaseConfig = {
//     apiKey: "AIzaSyD92hJmoz9hGZxC7DsQmXADMOHH8Kt0IiQ",
//     authDomain: "fullstackbb.firebaseapp.com",
//     projectId: "fullstackbb",
//     storageBucket: "fullstackbb.appspot.com",
//     messagingSenderId: "119221644456",
//     appId: "1:119221644456:web:1342312e1681ddd6d0e69d",
// };

// const firebaseApp = firebase.initializeApp(firebaseConfig);

// export default firebaseApp;