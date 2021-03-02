import React , { Component } from 'react';
import { connect  } from 'react-redux';
import { todoSingleRecord , UpdateTodo  , DataOperation } from '../../../store/actions/index';
import TodoCreateComp from '../../../components/TodoCreate/TodoCreate';
import FormHoc from '../../../hoc/Form';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router';
import { Button } from 'semantic-ui-react';





class TodoOperation extends Component {
      
    state = {
        createForm: {
            title: {
                label:'Title',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Todo  Title'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            content: {
                label:'Content',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Todo  Content'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            date: {
                label:'Date',
                elementType: 'input',
                elementConfig: {
                    type: 'date',
                    placeholder: 'Todo  date'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            status: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'Pending', displayValue: 'Pending'},
                        {value: 'InProgress', displayValue: 'InProgress'},
                        {value: 'Completed', displayValue: 'Completed'},

                    ]
                },
                value: 'Completed',
                validation: {},
                valid: true
            }
            
        },
        formIsValid: false
    }
     
   componentDidMount(){
      
       
       this.props.onInitOperation(this.props.match.params.id);
       if(this.props.record !== null){
        const updatedOrderForm = {
            ...this.state.createForm
        };
        for(const key in updatedOrderForm){
            updatedOrderForm[key].value = this.props.record[key];
        }
        this.setState({createForm: updatedOrderForm});
        //console.log(this.state.createForm);
    
    
    }

   }

   todoDetailsHandler = (operation) => {
    
    this.props.onTodoOperation(operation);
    // this.props.history.push(this.props.match.path +'/'+ id);
}
  

    submitLoginhandler = (event) => {
        
        event.preventDefault();
        

    const formData = {};
    for (let formElementIdentifier in this.state.createForm) {
        formData[formElementIdentifier] = this.state.createForm[formElementIdentifier].value;
    }

    const todo ={
        ...formData,
        key:this.props.record.key
        
    };
   
    this.props.onTodoUpdate(todo);
   
    }
  
    inputChangeHandler = (event,inputIdentifier) =>{
      // console.log(event.target.value);
        const updatedOrderForm = {
            ...this.state.createForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
       
    
        updatedFormElement.value = event.target.value;
       // updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

          
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({createForm: updatedOrderForm, formIsValid: formIsValid});
    }
 
    backHandler = () => {
        this.props.history.goBack();
    }
   
    render(){
               
                let spinner = null;
                if(this.props.loading)
                {
                    spinner = <Spinner />;
                }
               
                let opt = null;
                if(this.props.operation_type === 'view'){
                    
                    opt= true;
                
                }else if(this.props.operation_type === 'edit'){
                    opt=false;
                }else{
                    opt = <Redirect to="/todos" />
                }

                let redirect = null;
                if(this.props.isUpdate)
                {
                    redirect = <Redirect to={this.props.redirectpath} />
                }
                
                let data = <p style={{color:'red'}}>Something went Wrong!</p>
                if(this.props.record !== null){
                    data = ( <TodoCreateComp  change={this.inputChangeHandler} 
                        backbtn={this.backHandler} 
                        readstatus={opt} 
                        value={this.state.createForm}/>);
                }

        return(
            
            <FormHoc submit={this.submitLoginhandler}>
                {/*opt === true ?
                <Button primary style={{float:'right'}} >Edit</Button>:null */}
            {opt}
            {redirect}
            {data}
            {spinner}
            
           </FormHoc>

        )
    }

}

const mapStateToProps = state => {
     return {
         error:state.todo.error,
         isAuthenticated:state.auth.token !== null,
         userId:state.auth.userId,
         loading:state.todo.loading,
         redirectpath:state.todo.redirectpath,
         operation_type:state.todo.operation_type,
         record:state.todo.single_record,
         isUpdate:state.todo.isUpdate
         
        }
     }


const mapDispatchToProps = dispatch => {
    return {
         onInitOperation : (id) => dispatch(todoSingleRecord(id)),
         onTodoUpdate : (todoinfo) => dispatch(UpdateTodo(todoinfo)),
         onTodoOperation: (operation) => dispatch(DataOperation(operation))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoOperation) ;