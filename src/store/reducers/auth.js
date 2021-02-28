import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';


const initialState ={
    error:null,
    authRedirectPath:'/',
    loading:false,
    isSignUpSucess:false,
    isLoginSuccess:false
}

const signupStart = (state, action) =>{
    return updateObject(state , {error:null,loading:true});
}

const signupSuccess =( state , action ) => {
    return updateObject(state , {error:null,loading:false,isSignUpSucess:true,authRedirectPath:action.path});
}

const signupFail =( state , action ) => {
    return updateObject(state , {error:action.error,loading:false,isSignUpSucess:false});
}

 const setAuthRedirectPath = (state ,action) => {
    return updateObject(state , {authRedirectPath:action.path});
}

const Auth = (state = initialState , action) => {
    switch (action.type) {
        case actionTypes.USER_SIGNUP_START: return signupStart(state,action);
        case actionTypes.USER_SIGNUP_SUCCESS: return signupSuccess(state,action);
        case actionTypes.USER_SIGNUP_FAIL: return signupFail(state,action);
        case actionTypes.SET_AUTH_REDIRECT_PATH : return setAuthRedirectPath(state,action);
         
        default: return state;
            
    }
}

export default Auth;