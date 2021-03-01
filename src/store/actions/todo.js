import {firebaseApp} from '../../firebase/Firebase';
import firebase from "firebase/app";
import 'firebase/firestore';
import "firebase/auth";
import * as actionTypes from './actionTypes';


const db = firebase.firestore(firebaseApp);

export const todoList = (userid) => {
   
    return  dispatch => {
      dispatch(getTodoListStart());
      db.collection("todo")
      .where("uid", "==", userid)
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

const getTodoListStart = () => {
  return {
    type:actionTypes.TodoList_START
    
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

const todoCreateStart = () => {
  return {
    type:actionTypes.TODO_CREATE_START
  }
}

const todoCreateFail = (error) => {
  return {
    type:actionTypes.TODO_CREATE_FAIL,
    error:error
  }
}

const todoCreateSuccess = () => {
  return{
    type:actionTypes.TODO_CREATE_SUCCESS
  }
}

export const  todoCreate = (todoinfo) => {
    return dispatch => {
        dispatch(todoCreateStart());
        console.log(todoinfo);
        db.collection("todo").add(todoinfo)
        .then(res => {
          console.log(res);
          dispatch(todoCreateSuccess());
        }).catch(err => {
          console.log(err);
          dispatch(todoCreateFail(err.message));
        });

    }
}

export const DataOperation = (operation) => {
  return{
    type:actionTypes.DATA_OPERATION,
    operation:operation
  }
}

export const todoSingleRecord = (id) => {

  return  dispatch => {
    dispatch(getTodoSingleFetchStart());
    db.collection("todo")
    .where("id", "==", parseInt(id))
    .get()
    .then((querySnapshot) => {
     
      const list = querySnapshot.docs[0].data();
   
      dispatch(getTodoSingleFetchSuccess(list));
  }).catch((error) => {
    console.log("Error getting documents: ", error);
    dispatch(getTodoSingleFetchFail(error.message));
})
 

}
}

const getTodoSingleFetchStart = () => {
  return {
    type:actionTypes.TODO_SINGLE_FETCH_START
    
  }
}

const getTodoSingleFetchSuccess = (record) => {
  return {
    type:actionTypes.TODO_SINGLE_FETCH_SUCCESS,
    record:record
  }
}

const getTodoSingleFetchFail = (error) => {
  return {
    type:actionTypes.TODO_SINGLE_FETCH_FAIL,
    error:error
  }
}
