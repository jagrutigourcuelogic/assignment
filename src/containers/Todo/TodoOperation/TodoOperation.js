import React , { Component } from 'react';
import { connect  } from 'react-redux';
import { todoSingleRecord } from '../../../store/actions/index';
import TodoCreateComp from '../../../components/TodoCreate/TodoCreate';
import FormHoc from '../../../hoc/Form';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router';





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
       console.log(this.props.match.params.id);
       
       this.props.onInitOperation(this.props.match.params.id);
       if(this.props.record !== null){
        const updatedOrderForm = {
            ...this.state.createForm
        };
        for(const key in updatedOrderForm){
            updatedOrderForm[key].value = this.props.record[key];
        }
        this.setState({createForm: updatedOrderForm});
        console.log(this.state.createForm);
    
    
    }

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
    console.log(todo);
    this.props.onTodoCreate(todo);
   
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

        return(
            
            <FormHoc submit={this.submitLoginhandler}>
            {opt}
            <TodoCreateComp  change={this.inputChangeHandler} 
            backbtn={this.backHandler} 
            readstatus={opt} 
            value={this.props.record}/>
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
         record:state.todo.single_record
         
        }
     }


const mapDispatchToProps = dispatch => {
    return {
         onInitOperation : (id) => dispatch(todoSingleRecord(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoOperation) ;