import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';



const initialState ={
    error:null,
    list:[],
    loading:false,
    redirectpath: '/todos',
    isCreate:false,
    operation_type:null,
    single_record : null
    
}
const todoListSuccess = (state,action) => {
    return updateObject(state,{
        list:action.list,
        loading:false,
        isCreate:false,
        operation_type:null
    });
}
const todoListStart = (state,action) => {
    return updateObject(state,{
        loading:true,
        isCreate:false,
        operation_type:null
    });
}
const todoListFail = (state,action) => {
    return updateObject(state,{
        error:action.error,
        loading:false,
        isCreate:false,
        operation_type:null
    });
}
const todoCreateStart = (state,action) => {
    return updateObject(state,{
        loading:true,
        isCreate:false,
        isCreate:false,
        operation_type:null
    });
}
const todoCreateSuccess = (state,action) => {
    return updateObject(state,{
        list:action.list,
        loading:false,
        isCreate:true,
        operation_type:null
    });
}
const todoCreateFail = (state,action) => {
    return updateObject(state,{
        error:action.error,
        loading:false,
        isCreate:false,
        operation_type:null
    });
}

const DataOperation = (state,action) => {
    return updateObject(state,{
        error:null,
        loading:false,
        isCreate:false,
        operation_type:action.operation,
        
    });
}


const todoSingleRecordStart = (state,action) => {
    return updateObject(state,{
        error:null,
        loading:true,
        isCreate:false
    });
}
const todoSingleRecordSuccess = (state,action) => {
    return updateObject(state,{
        error:null,
        loading:false,
        isCreate:false,
        single_record:action.record
    });
}
const todoSingleRecordFail = (state,action) => {
    return updateObject(state,{
        error:action.error,
        loading:false,
        isCreate:false
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


        
            
          
        default:return state;
            
    }

}

export default reducer;