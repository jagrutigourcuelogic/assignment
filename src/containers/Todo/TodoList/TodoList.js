import React , { Component } from 'react';
import Todo from '../../../components/TodoList/TodoList';
import { connect  } from 'react-redux';
import { todoList } from '../../../store/actions/index';
import { Header, Table, Rating, Button } from 'semantic-ui-react';
import Tablehoc from '../../../hoc/Table';


class TodoList extends Component {
     
    componentDidMount(){
        console.log(this.props); 
        this.props.onInitTodoList();
    }

    todoDetailsHandler = (id) => {
        console.log(id);
        console.log(this.props.match.path);
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
                        
                        {single.date.seconds}
                        </Table.Cell>
                        <Table.Cell>
                        {single.status}
                        </Table.Cell>
                        <Table.Cell>
                        <Button primary onClick={()=>this.todoDetailsHandler(single.id)}>Details</Button>
                        <Button primary>Edit</Button>
                        </Table.Cell>
                    </Table.Row>

             
                ))
            );


            }
            
        return(
         <Tablehoc>
            {todos}
         </Tablehoc>
        )
    }

}

const mapStateToProps = state => {
     return {
         error:state.todo.error,
         list:state.todo.list
     }
}

const mapDispatchToProps = dispatch => {
    return {
         onInitTodoList : () => dispatch(todoList())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoList) ;