import React , { Component } from 'react';
import { connect  } from 'react-redux';
import { todoCreate } from '../../../store/actions/index';
import TodoCreateComp from '../../../components/TodoCreate/TodoCreate';
import FormHoc from '../../../hoc/Form';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router';





class TodoCreate extends Component {
     
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
                        {value: 'pending', displayValue: 'Pending'},
                        {value: 'inprogress', displayValue: 'InProgress'},
                        {value: 'completed', displayValue: 'Completed'},

                    ]
                },
                value: 'completed',
                validation: {},
                valid: true
            }
            
        },
        formIsValid: false
    }

    submitLoginhandler = (event) => {
        
        event.preventDefault();
        

    const formData = {};
    for (let formElementIdentifier in this.state.createForm) {
        formData[formElementIdentifier] = this.state.createForm[formElementIdentifier].value;
    }

    const todo = {
        uid:this.props.userId,
        id:parseInt(Math.random()*1000),
        ...formData
    }
   
    this.props.onTodoCreate(todo);
   
    }

    inputChangeHandler = (event,inputIdentifier) =>{
       
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
                let authRedirect = null;
                if(this.props.isCreateDone){
                    authRedirect = <Redirect to={this.props.redirectpath} />
                }
            const readstatus = false;
            
        return(
            
            <FormHoc submit={this.submitLoginhandler}>
            {authRedirect}
            <TodoCreateComp  change={this.inputChangeHandler} 
            backbtn={this.backHandler} 
            readstatus={readstatus}  />
                {spinner}
            
           </FormHoc>

        )
    }

}

const mapStateToProps = state => {
     return {
         error:state.todo.error,
         list:state.todo.list,
         isAuthenticated:state.auth.token !== null,
         userId:state.auth.userId,
         loading:state.todo.loading,
         redirectpath:state.todo.redirectpath,
         isCreateDone:state.todo.isCreate
        }
     }


const mapDispatchToProps = dispatch => {
    return {
         onTodoCreate : (todoinfo) => dispatch(todoCreate(todoinfo))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoCreate) ;