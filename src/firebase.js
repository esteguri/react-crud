import firebase from 'firebase/app'
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDzR_2wx-uZLLBINW22oOgekJ9UQtpY6Xs",
    authDomain: "react-crud-94725.firebaseapp.com",
    projectId: "react-crud-94725",
    storageBucket: "react-crud-94725.appspot.com",
    messagingSenderId: "7582676904",
    appId: "1:7582676904:web:a21a0a9d427b1d5c908f9d",
    measurementId: "G-5MNJ34J0PH"
};

export const firebaseapp = firebase.initializeApp(firebaseConfig)