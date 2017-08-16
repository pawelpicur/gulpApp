import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAwAeziRL3_yfK4bsXAuEyodc4kGPW2b_0",
    authDomain: "wykopapp.firebaseapp.com",
    databaseURL: "https://wykopapp.firebaseio.com",
    projectId: "wykopapp",
    storageBucket: "",
    messagingSenderId: "872580468069"
  };

  export const firebaseApp = firebase.initializeApp(config);