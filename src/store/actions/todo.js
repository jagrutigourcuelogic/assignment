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
        // console.log(todoinfo);
        db.collection("todo").add(todoinfo)
        .then(res => {
          // console.log(res);
          dispatch(todoCreateSuccess());
        }).catch(err => {
          // console.log(err);
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
     
      const list = {
        key:querySnapshot.docs[0].id,
        ...querySnapshot.docs[0].data()};

       
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

const todoUpdateStart = () => {
 return {
   type:actionTypes.TODO_UPDATE_START
 }
}

const todoUpdateSuccess = () => {
  return {
    type:actionTypes.TODO_UPDATE_SUCCESS
  }
}

const todoUpdateFail = (error) => {
  return {
    type:actionTypes.TODO_UPDATE_FAIL,
    error:error
  }
}

export const UpdateTodo = (todoinfo) => {
  const { title,content,date,status,key } = todoinfo;
  return dispatch => {
    dispatch(todoUpdateStart());
    //console.log(todoinfo);
    db.collection("todo").doc(key).update({
      title,
      content,
      date,
      status
    })
    .then(res => {
     
      dispatch(todoUpdateSuccess());
    }).catch(err => {
      
     dispatch(todoUpdateFail(err.message));
    });

}
}


export const todoDelete =(id,key) => {
  return dispatch => {
    dispatch(todoDeleteStart());
   // console.log(todoinfo);
    db.collection("todo").doc(key).delete()
    .then(res => {
    //  console.log(res);
      dispatch(todoDeleteSuccess());
    }).catch(err => {
      // console.log(err);
     dispatch(todoDeleteFail(err.message));
    });

  }
}


const todoDeleteStart = () => {
  return {
    type:actionTypes.TODO_DELETE_START
  }
 }
 
 const todoDeleteSuccess = () => {
   return {
     type:actionTypes.TODO_DELETE_SUCCESS
   }
 }
 
 const todoDeleteFail = (error) => {
   return {
     type:actionTypes.TODO_DELETE_FAIL,
     error:error
   }
 }