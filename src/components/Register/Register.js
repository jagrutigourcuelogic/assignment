import React from 'react'
import { Button,  Form } from 'semantic-ui-react'
import classes from './Register.module.css';


const Register = (props) => {

  console.log(process.env);

  
  return(
    <div className={classes.Register}>
        <Form >
        <Form.Field>
          <label>Last Name</label>
          <input placeholder='Last Name' />
        </Form.Field>
        <Form.Field>
        <label>Email Address</label>
        <input type='email' placeholder='Email Address' />
      </Form.Field>
      <Form.Field>
      <label>Password</label>
      <input type='password' placeholder='Password' />
      </Form.Field>
      <Form.Field>
      <label>Confirm Password</label>
      <input type='password'  placeholder='Confirm Password' />
    </Form.Field>
    <Button  primary type='submit'>Register</Button>
    <Button primary >Back</Button>
  </Form>
  </div>
  );
 
  };

export default Register;