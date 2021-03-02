import React , { Component } from 'react';
import LoginForm  from '../../../components/Login/Login'; 
import FormHoc from '../../../hoc/Form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../../shared/utility';
import { loginUser , initLogin } from '../../../store/actions/index';
import Spinner  from '../../../components/UI/Spinner/Spinner'; 

class Login extends Component {
    state = {
        loginForm:{
            email: {
                label: 'Email Address',
                
                    type: 'email',
                    placeholder: 'Email Address',
              
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                label: 'Password',
              
                    type: 'password',
                    placeholder: 'Password',
               
                value: '',
                validation: {
                    required: true,
                    minLength:8
                },
                valid: false,
                touched: false
            }
        }
    }
    componentDidMount(){
        this.props.onInitLogin();
    }

    submitLoginhandler = (event) => {
        
        event.preventDefault();
        

    const formData = {};
    for (let formElementIdentifier in this.state.loginForm) {
        formData[formElementIdentifier] = this.state.loginForm[formElementIdentifier].value;
    }
    const {email,password} = formData;
    const user ={
        
        email,
        password
    };
       
    this.props.onLogin(user);
    }

    inputChangeHandler = (event,inputIdentifier) =>{
        const updatedOrderForm = {
            ...this.state.loginForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
    
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

          
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({loginForm: updatedOrderForm, formIsValid: formIsValid});
    }


    render(){
          
        let spinner = this.props.loading ? <Spinner /> : null;
        if(this.props.error){
            spinner = null;
        }
        let error = this.props.error ? <p style={{color:'red'}}>{this.props.error}</p> : null;
            
        let authRedirectPath = null;
        if(this.props.userId)
        {
            authRedirectPath = <Redirect to={this.props.redirectPath} />
        
        }
       


        return(
           
            <FormHoc submit={this.submitLoginhandler}>
            {error}
            {authRedirectPath}
            <LoginForm  change={this.inputChangeHandler} 
            btnVisibility={!this.state.formIsValid} />
            {spinner}
            
           </FormHoc>
        );
    }

}

const mapStateToProps = state => {
    return{
        error:state.auth.error,
        loading:state.auth.error,
        isLoginSuccess:state.auth.isLoginSuccess,
        redirectPath:state.auth.authRedirectPath,
        userId:state.auth.userId

    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onLogin:(userinfo) => dispatch(loginUser(userinfo)),
        onInitLogin:() => dispatch(initLogin())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);