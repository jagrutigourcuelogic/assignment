import React , { Component } from 'react';
import Todo from '../../../components/TodoList/TodoList';
import { connect  } from 'react-redux';
import { todoList , DataOperation } from '../../../store/actions/index';
import { Header, Table, Button } from 'semantic-ui-react';
import Spinner from '../../../components/UI/Spinner/Spinner';


class TodoList extends Component {
     
    componentDidMount(){
        console.log(this.props.userId); 
        this.props.onInitTodoList(this.props.userId);
    }

    todoDetailsHandler = (id,operation) => {
    
        this.props.onTodoOperation(operation);
        this.props.history.push(this.props.match.path +'/'+ id);
    }
   
    render(){
          //  console.log(this.props.list);
            
      
            let todos = (!this.props.list) ? <p>No Todo List found</p> :null ;
            if(this.props.list && this.props.list.length > 0){
               
            
                todos = (this.props.list.map(single => (
                  
                        <Table.Row key={single.key}>
                        <Table.Cell>
                        <Header as='h2' textAlign='center'>
                            {single.id}
                        </Header>
                        </Table.Cell>
                        <Table.Cell singleLine>{single.title}</Table.Cell>
                        <Table.Cell>
                        {single.content}
                        </Table.Cell>
                        <Table.Cell>
                        
                        {single.date}
                        </Table.Cell>
                        <Table.Cell>
                        {single.status}
                        </Table.Cell>
                        <Table.Cell>
                        <Button primary onClick={()=>this.todoDetailsHandler(single.id,'view')}>Details</Button>
                        <Button primary onClick={()=>this.todoDetailsHandler(single.id,'edit')}>Edit</Button>
                        </Table.Cell>
                    </Table.Row>

             
                ))
            );


            }
            
        return(
         <Todo>
         {(this.props.loading) ? <Spinner /> : todos}
            
         </Todo>
        )
    }

}

const mapStateToProps = state => {
     return {
         error:state.todo.error,
         list:state.todo.list,
         loading:state.todo.loading,
         userId:state.auth.userId
     }
}

const mapDispatchToProps = dispatch => {
    return {
         onInitTodoList : (userid) => dispatch(todoList(userid)),
         onTodoOperation: (operation) => dispatch(DataOperation(operation))

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoList) ;