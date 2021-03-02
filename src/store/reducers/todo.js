import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';



const initialState ={
    error:null,
    list:[],
    loading:false,
    redirectpath: '/todos',
    isCreate:false,
    operation_type:null,
    single_record : null,
    isUpdate:false,
    isDelete:false
    
}
const todoListSuccess = (state,action) => {
    return updateObject(state,{
        list:action.list,
        loading:false,
        isCreate:false,
        isUpdate:false,
        isDelete:false,
        operation_type:null
    });
}
const todoListStart = (state,action) => {
    return updateObject(state,{
        loading:true,
        isCreate:false,
        isUpdate:false,
        isDelete:false,
        operation_type:null
    });
}
const todoListFail = (state,action) => {
    return updateObject(state,{
        error:action.error,
        loading:false,
        isCreate:false,
        isDelete:false,
        isUpdate:false,
        operation_type:null
    });
}
const todoCreateStart = (state,action) => {
    return updateObject(state,{
        loading:true,
        isCreate:false,
        error:null,
        operation_type:null,
        isDelete:false,
        isUpdate:false
    });
}
const todoCreateSuccess = (state,action) => {
    return updateObject(state,{
        list:action.list,
        loading:false,
        isCreate:true,
        operation_type:null,
        isDelete:false,
        isUpdate:false
    });
}
const todoCreateFail = (state,action) => {
    return updateObject(state,{
        error:action.error,
        loading:false,
        isCreate:false,
        operation_type:null,
        isDelete:false,
        isUpdate:false
    });
}

const DataOperation = (state,action) => {
    return updateObject(state,{
        error:null,
        loading:false,
        isCreate:false,
        operation_type:action.operation,
        isDelete:false,
        isUpdate:false
        
    });
}


const todoSingleRecordStart = (state,action) => {
    return updateObject(state,{
        error:null,
        loading:true,
        isCreate:false,
        isDelete:false,
        isUpdate:false
    });
}
const todoSingleRecordSuccess = (state,action) => {
    return updateObject(state,{
        error:null,
        loading:false,
        isCreate:false,
        isUpdate:false,
        isDelete:false,
        single_record:action.record
    });
}
const todoSingleRecordFail = (state,action) => {
    return updateObject(state,{
        error:action.error,
        loading:false,
        isUpdate:false,
        isDelete:false,
        isCreate:false
    });
}

const todoUpdateStart = (state,action) => {
    return updateObject(state,{
        error:null,
        loading:true,
        isCreate:false,
        isDelete:false,
        isUpdate:false
    });
}

const todoUpdateSuccess = (state,action) => {
    return updateObject(state,{
        error:null,
        loading:false,
        isCreate:false,
        isDelete:false,
        isUpdate:true
    });
}
const todoUpdateFail = (state,action) => {
    return updateObject(state,{
        error:action.error,
        loading:false,
        isCreate:false,
        isDelete:false,
        isUpdate:false
    });
}
const todoDeleteStart = (state,action) => {
    return updateObject(state,{
        error:null,
        loading:true,
        isCreate:false,
        isDelete:false,
        isUpdate:false
    });
}

const todoDeleteSuccess = (state,action) => {
    return updateObject(state,{
        error:null,
        loading:false,
        isCreate:false,
        isDelete:true,
        isUpdate:false
    });
}
const todoDeleteFail = (state,action) => {
    return updateObject(state,{
        error:action.error,
        loading:false,
        isCreate:false,
        isDelete:false,
        isUpdate:false
    });
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TodoList_SUCCESS:return todoListSuccess(state,action);
        case actionTypes.TodoList_START:return todoListStart(state,action);
        case actionTypes.TodoList_FAIL:return todoListFail(state,action);
        case actionTypes.TODO_CREATE_START:return todoCreateStart(state,action);
        case actionTypes.TODO_CREATE_SUCCESS:return todoCreateSuccess(state,action);
        case actionTypes.TODO_CREATE_FAIL:return todoCreateFail(state,action);
        case actionTypes.DATA_OPERATION:return DataOperation(state,action);
        case actionTypes.TODO_SINGLE_FETCH_START:return todoSingleRecordStart(state,action);
        case actionTypes.TODO_SINGLE_FETCH_SUCCESS:return todoSingleRecordSuccess(state,action);
        case actionTypes.TODO_SINGLE_FETCH_FAIL:return todoSingleRecordFail(state,action);
        case actionTypes.TODO_UPDATE_START:return todoUpdateStart(state,action);
        case actionTypes.TODO_UPDATE_SUCCESS:return todoUpdateSuccess(state,action);
        case actionTypes.TODO_UPDATE_FAIL:return todoUpdateFail(state,action);
        case actionTypes.TODO_DELETE_START:return todoDeleteStart(state,action);
        case actionTypes.TODO_DELETE_SUCCESS:return todoDeleteSuccess(state,action);
        case actionTypes.TODO_DELETE_FAIL:return todoDeleteFail(state,action);


        
            
          
        default:return state;
            
    }

}

export default reducer;