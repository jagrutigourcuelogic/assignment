import * as actionTypes from './actionTypes';
import {firebaseApp} from '../../firebase/Firebase';
import firebase from "firebase/app";
import 'firebase/firestore';
import "firebase/auth";


const db = firebase.firestore(firebaseApp);

export const registerUser = (userinfo) => {
    console.log(userinfo);
    const {email,password,firstName,lastName} = userinfo;
    return dispatch => {

        firebaseApp.auth().createUserWithEmailAndPassword(email,password)
    .then((userCredential) => {
      // Signed in 

      var user = userCredential.user;
      console.log(user.uid);
      db.collection("users").add({
        uid:user.uid,
       firstName,
       lastName
      
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
     
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
    }
    
};