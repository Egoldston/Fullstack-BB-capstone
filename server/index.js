var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');
const e = require('express');


// Authentication Middleware
const authMiddleware = require("./auth-middleware");
app.use("/", authMiddleware);

// Firebase APP
var firebaseApp = require("firebase/app");
var firebaseAuth = require("firebase/auth");
const firebaseConfig = {
  apiKey: "AIzaSyD92hJmoz9hGZxC7DsQmXADMOHH8Kt0IiQ",
  authDomain: "fullstackbb.firebaseapp.com",
  projectId: "fullstackbb",
  storageBucket: "fullstackbb.appspot.com",
  messagingSenderId: "119221644456",
  appId: "1:119221644456:web:1342312e1681ddd6d0e69d",
};
const appFB = firebaseApp.initializeApp(firebaseConfig);

// Firebase Admin
var firebaseAdmin = require('firebase-admin');
const credentials = require("./serviceAccountCredentials.json");
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(credentials),
});





// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {
    // check if account exists
    dal.find(req.params.email).
        then((users) => {

            // if user exists, return error message
            if(users.length > 0){
                console.log('User already in exists');
                res.send('User already in exists');    
            }
            else{
                // else create user in mongo db
                dal.create(req.params.name, req.params.email, req.params.password).
                    then((user) => {
                        console.log(user);
                        res.send(user);            
                    }); 
                    

                // also create new user in firebase
                const auth = firebaseAuth.getAuth();
                firebaseAuth.createUserWithEmailAndPassword(auth, req.params.email, req.params.password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log(user);
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    res.send(`${errorCode}-${errorMessage}`);
                    // ..
                });
            }

        });
});


// login user 
app.get('/account/login/:email/:password', function (req, res) {

    const auth = firebaseAuth.getAuth();
    firebaseAuth.signInWithEmailAndPassword(auth, req.params.email, req.params.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        userCredential.getToken().then(function(token){
            $rootScope.userLoginToken = token;
        });
    
        res.send(`Hello ${user.email}`);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.send(`${errorCode}-${errorMessage}`);
      });
    
});

// find user account
app.get('/account/find/:email', function (req, res) {

    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {

    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});


// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {

    var amount = Number(req.params.amount);

    dal.update(req.params.email, amount).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});

// all accounts
app.get('/account/all', function (req, res) {

    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});

var port = 3000;
app.listen(port);
console.log('Running on port: ' + port);