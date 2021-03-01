import {firebaseApp} from '../../firebase/Firebase';
import firebase from "firebase/app";
import 'firebase/firestore';
import "firebase/auth";
import * as actionTypes from './actionTypes';


const db = firebase.firestore(firebaseApp);

export const todoList = () => {
   
    return  dispatch => {
      db.collection("todo")
      .get()
      .then((querySnapshot) => {
       
        const list =[];
        querySnapshot.forEach((doc) => {
         
           list.push({key:doc.id,
                      ...doc.data()});
           
        });
       
        dispatch(getTodoList(list));
    }).catch((error) => {
      console.log("Error getting documents: ", error);
      dispatch(todoListFailed(error.message));
  })
   

}

}

const getTodoList = (list) => {
  return {
    type:actionTypes.TodoList_SUCCESS,
    list:list
  }
}

const todoListFailed = (error) => {
  return {
    type:actionTypes.TodoList_FAIL,
    error:error
  }
}
