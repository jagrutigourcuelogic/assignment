import {firebaseApp} from '../../firebase/Firebase';
import firebase from "firebase/app";
import 'firebase/firestore';
import "firebase/auth";
import * as actionTypes from './actionTypes';


const db = firebase.firestore(firebaseApp);


export const registerUser = (userinfo) => {
   const {email,password,firstName,lastName,confirmPassword} = userinfo;
  
    return async dispatch => {
      if( password !== confirmPassword){
         
        const errMsg = "Password and Confirm Password should be same.";
        dispatch(userSignupFail(errMsg));
      }
   
      dispatch(userSignupStart());
      try {
        let userCredential = await  firebaseApp.auth().createUserWithEmailAndPassword(email,password);
        let user = userCredential.user;
       
        let userSignup =  db.collection("users").add({
          uid:user.uid,
         firstName,
         lastName
        
      });
      
      dispatch(userSignupSuccess());
      
      } catch(err) {
        //console.log(err.message);
        dispatch(userSignupFail(err.message));
         // TypeError: failed to fetch
      }
    }
   
    
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

export const userLoginSuccess = (token,userId) => {

  localStorage.setItem('token',token);
  localStorage.setItem('userId',userId);
  return {
      type: actionTypes.USER_LOGIN_SUCCESS,
      path:'/todos',
      idToken:token,
      userId:userId

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
       
      dispatch(userLoginSuccess(userToken,user.uid));
     
     
     } catch(err) {

       console.log(err.message);
       dispatch(userLoginFail(err.message));
        // TypeError: failed to fetch
     }
   }
  
   
};

export const logout =() => {
  return dispatch => {
    dispatch(logoutStart());
    firebaseApp.auth().signOut().then(() => {
      // Sign-out successful.
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      dispatch(logoutSuccess());
    }).catch((error) => {
      // An error happened.
      dispatch(logoutFail(error.message));
    });

  }
}  

 const logoutStart = () => {
   return {
     type:actionTypes.LOGOUT_START
   }
 }
 const logoutFail = () => {
  return {
    type:actionTypes.LOGOUT_FAIL
  }
}



 const logoutSuccess = () => {
  return{
    type:actionTypes.LOGOUT,
    path:'/'
}
 }

export const authCheckState = () => {
  return dispatch => {
      const token = localStorage.getItem('token');
      if(!token)
      {
          dispatch(logoutSuccess());
      }else{
         
              const userId = localStorage.getItem('userId');
              dispatch(userLoginSuccess(token,userId));
             
         
      }
  }
}






