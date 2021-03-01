import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';


const initialState ={
    error:null,
    list:[]
    
}
const todoSuccess = (state,action) => {
    return updateObject(state,{
        list:action.list
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TodoList_SUCCESS:return todoSuccess(state,action);
            
          
        default:return state;
            
    }

}

export default reducer;