import React , { Component } from 'react';

import FormHoc from '../../../hoc/Form';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../../shared/utility';
import { connect } from 'react-redux';
import { Button,  Form } from 'semantic-ui-react';
import {  registerUser, setAuthRedirectPath } from '../../../store/actions/index';
import Spinner  from '../../../components/UI/Spinner/Spinner'; 

class Register extends Component {

    state = {
        registerForm: {
            firstName: {
                
                label: 'First Name',
                type: 'text',
                placeholder: 'First Name',
             
                value: '',
                validation: {
                    required: true,
                    isString:true
                },
                valid: false,
                touched: false
            },
            lastName: {
                label: 'Last Name',
               
                    type: 'text',
                    placeholder: 'Last Name',
              
                value: '',
                validation: {
                    required: true,
                    isString:true
                },
                valid: false,
                touched: false
            },
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
            },
            confirmPassword: {
                label: 'Confirm Password',
                
                    type: 'password',
                    placeholder: 'Confirm Password',
             
                value: '',
                validation: {
                    required: true,
                    minLength:8
                    
                },
                valid: false,
                touched: false
            },
            
        },
        formIsValid: false,
        errors:[]
    }

    
        submitRegisterhandler = (event) => {
            event.preventDefault();
           
        const formData = {};
        for (let formElementIdentifier in this.state.registerForm) {
            formData[formElementIdentifier] = this.state.registerForm[formElementIdentifier].value;
        }
        
        const {firstName,lastName,email,password,confirmPassword} = formData;
        if(formData.password !== formData.confirmPassword){
            const errMsg = 'Password and Confirm Password Should be same';
            window.alert(errMsg);
            
            this.setState({formIsValid: false});
         
        }else{
            const user ={
                firstName,
                lastName,
                email,password,
                confirmPassword
            };
            this.props.onRegister(user);
        }
        

        
        
       
       
    }
    backToLoginHandler = () => {
        this.props.history.goBack();
    }

    inputChangedHandler = (event,inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.registerForm
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
        this.setState({registerForm: updatedOrderForm, formIsValid: formIsValid});

        //console.log(updatedFormElement);

    };

    render(){
        
        const formElementsArray = [];
        for (let key in this.state.registerForm) {
            
            formElementsArray.push({
                id: key,
                config: this.state.registerForm[key],
                
            });
        }
        
        

        let form = (formElementsArray.map(formElement => (
                  
                   <Form.Field key={formElement.id}>
                        <label>{formElement.config.label}</label>
                        <input 
                        type={formElement.config.type}
                        placeholder={formElement.config.placeholder}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        onChange={(event) => this.inputChangedHandler(event,formElement.id)}
                          />
                    </Form.Field>

                    
                ))
        );
   

        let spinner = ( this.props.loading) ? <Spinner /> : null;
        if(this.props.error){
            spinner = null;
        }
        let error = this.props.error ? <p style={{color:'red'}}>{this.props.error}</p> : null;
       
                let authRedirectPath = null;
                if(this.props.signupSuccess && !error)
                {
                    authRedirectPath = <Redirect to={this.props.redirectPath} />
                
                }
               
          
    
        return(
            <div>
           
                <FormHoc submit={this.submitRegisterhandler}>
                {error}
                {authRedirectPath}
                        {form}
                        <Button  primary type='submit' disabled={!this.state.formIsValid}>Register</Button>
                        <Button primary onClick={this.backToLoginHandler}>Back</Button>
                        {spinner}
                </FormHoc>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        loading:state.auth.loading,
        error:state.auth.error, 
        redirectPath:state.auth.authRedirectPath,
        signupSuccess:state.auth.isSignUpSucess,
        loginSuccess:state.auth.isLoginSuccess
    };
}

const mapDispatchToProps = dispatch => {
        return {
            onRegister : (userinfo) => dispatch(registerUser(userinfo)),
            onSetAuthRedirectPath:(path) => dispatch(setAuthRedirectPath(path))
        }
};

export default connect(mapStateToProps,mapDispatchToProps)(Register);