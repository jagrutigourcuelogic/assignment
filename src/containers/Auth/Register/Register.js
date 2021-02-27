import React , { Component } from 'react';
import Input  from '../../../components/UI/Input.js'; 
import FormHoc from '../../../hoc/Form';
import { checkValidity } from '../../../shared/utility';
import { connect } from 'react-redux';
import { Button,  Form } from 'semantic-ui-react';
import * as  actionTypes from '../../../store/actions/actionTypes';
import {  registerUser } from '../../../store/actions/index';

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
                    minLength:8,
                    
                },
                valid: false,
                touched: false
            },
            
        },
        formIsValid: false
    }
  
        submitRegisterhandler = (event) => {
            event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.registerForm) {
            formData[formElementIdentifier] = this.state.registerForm[formElementIdentifier].value;
        }
        const {firstName,lastName,email,password} = formData;
        const user ={
            firstName,
            lastName,
            email,password
        };
        this.props.onRegister(user);
        
       
       
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
        //console.log(process.env);
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
        return(
            <div>
                <FormHoc submit={this.submitRegisterhandler}>
                        {form}
                        <Button  primary type='submit' disabled={!this.state.formIsValid}>Register</Button>
                        <Button primary onClick={this.backToLoginHandler}>Back</Button>
                </FormHoc>
            </div>
        )
    }

}

const mapDispatchToProps = dispatch => {
        return {
            onRegister : (userinfo) => dispatch(registerUser(userinfo))
        }
};

export default connect(null,mapDispatchToProps)(Register);