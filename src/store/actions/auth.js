import {firebaseApp} from '../../firebase/Firebase';
import firebase from "firebase/app";
import 'firebase/firestore';
import "firebase/auth";
import * as actionTypes from './actionTypes';


const db = firebase.firestore(firebaseApp);


export const registerUser = (userinfo) => {
   const {email,password,firstName,lastName} = userinfo;
    return async dispatch => {
      dispatch(userSignupStart());
      try {
        let userCredential = await  firebaseApp.auth().createUserWithEmailAndPassword(email,password);
        let user = userCredential.user;
        console.log(user);
        let userSignup =  db.collection("users").add({
          uid:user.uid,
         firstName,
         lastName
        
      });
      console.log(userSignup);
      dispatch(userSignupSuccess());
      
      } catch(err) {
        console.log(err.message);
        dispatch(userSignupFail(err.message));
         // TypeError: failed to fetch
      }
    }
    //     firebaseApp.auth().createUserWithEmailAndPassword(email,password)
    // .then((userCredential) => {
    //   // Signed in 

    //   var user = userCredential.user;
     
    //   db.collection("users").add({
    //     uid:user.uid,
    //    firstName,
    //    lastName
      
    // })
    // .then((docRef) => {
    //     console.log("Document written with ID: ", docRef.id);
    // })
    // .catch((error) => {
    //     console.error("Error adding document: ", error);
    // });
     
    //   // ...
    // })
    // .catch((error) => {
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   console.log(errorMessage);
    //   // ..
    // });
    // }
    
};

export const userSignupStart = () =>{
  return {
      type : actionTypes.USER_SIGNUP_START
  };
}

export const userSignupFail = ( error ) => {
  return {
      type: actionTypes.USER_SIGNUP_FAIL,
      error: error
  };
};

export const userSignupSuccess = () => {
  return {
      type: actionTypes.USER_SIGNUP_SUCCESS,
      path:'/signin'
  };
};

export const setAuthRedirectPath = (path) => {
  return{
      type:actionTypes.SET_AUTH_REDIRECT_PATH,
      path:path
  }
}

export const userLoginStart = () =>{
  return {
      type : actionTypes.USER_LOGIN_START
  };
}

export const userLoginFail = ( error ) => {
  return {
      type: actionTypes.USER_LOGIN_FAIL,
      error: error
  };
};

export const userLoginSuccess = () => {
  return {
      type: actionTypes.USER_LOGIN_SUCCESS,
      path:'/todos'
  };
};

export const loginUser = (userinfo) => {
  const {email,password} = userinfo;
   return async dispatch => {
     dispatch(userLoginStart());
     try {
       let userObj = await  firebaseApp.auth().signInWithEmailAndPassword(email,password);
       let user = userObj.user;
       let userToken = await user.getIdToken();
       
       localStorage.setItem('token',userToken);
       localStorage.setItem('userId',user.uid);
      dispatch(userLoginSuccess());
     
     
     } catch(err) {

       console.log(err.message);
       dispatch(userLoginFail(err.message));
        // TypeError: failed to fetch
     }
   }
  
   
};
