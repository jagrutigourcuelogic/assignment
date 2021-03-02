import React , { Component } from 'react';
import Todo from '../../../components/TodoList/TodoList';
import { connect  } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { todoList , DataOperation ,todoDelete } from '../../../store/actions/index';
import { Header, Table, Button } from 'semantic-ui-react';
import Spinner from '../../../components/UI/Spinner/Spinner';


class TodoList extends Component {
    

    state = {
        showpopup:false,
        delete:false
    };
     
    componentDidMount(){
       
        this.props.onInitTodoList(this.props.userId);
    }

    todoDetailsHandler = (id,operation) => {
    
        this.props.onTodoOperation(operation);
        this.props.history.push(this.props.match.path +'/'+ id);
    }

    todoDeleteHandler = (id,key) => {
            console.log('delete clicked');
            if (window.confirm("Are you sure, You want to delete!")) {
               this.props.onTodoDelete(id,key);
              } else {
                console.log(false);
              }
        }
       
      
    
   
   
    render(){

            let redirect = null;
            if(this.props.isDelete){
                redirect = <Redirect path={this.props.redirectpath} />
            }
           
      
            let todos = (this.props.list === '') ? <p style={{textAlign:'center',
                                                            fontWeight:'600',
                                                            fontSize:'23px'}}>No Todo List found</p> :null ;
            if(this.props.list && this.props.list.length > 0){
               
            
                todos = (this.props.list.map(single => (
                  
                        <Table.Row key={single.key}>
                        <Table.Cell>
                        <Header as='h2' textAlign='center'>
                            {single.id}
                        </Header>
                        </Table.Cell>
                        <Table.Cell style={{overflow:'auto'}}>{single.title}</Table.Cell>
                        <Table.Cell style={{overflow:'auto'}}>
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
                        <Button color='red'onClick={() => this.todoDeleteHandler(single.id,single.key)} >Delete</Button>
                        </Table.Cell>
                    </Table.Row>

             
                ))
            );


            }
            
        return(
         <Todo>
         {redirect}
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
         userId:state.auth.userId,
         isDelete:state.todo.isDelete,
         redirectpath:state.todo.redirectpath
     }
}

const mapDispatchToProps = dispatch => {
    return {
         onInitTodoList : (userid) => dispatch(todoList(userid)),
         onTodoOperation: (operation) => dispatch(DataOperation(operation)),
         onTodoDelete:(id,key) => dispatch(todoDelete(id,key))

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoList) ;