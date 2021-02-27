import React from 'react'
import { Link } from 'react-router-dom';
import { Button,  Form } from 'semantic-ui-react'
import classes from './Login.module.css';

const Login = () => (
  <div className={classes.Login}>
  <Form>
    
    <Form.Field>
    <label>Email Address</label>
    <input type='email' placeholder='Email Address' />
  </Form.Field>
  <Form.Field>
  <label>Password</label>
  <input type='password' placeholder='Password' />
  </Form.Field>
  <Button  primary type='submit'>Login</Button><br />
  <p>Not Register Yet ? </p> <Link to="/signup"> Register</Link>
  </Form>
  </div>
)

export default Login;