import React from 'react'
import { Link } from 'react-router-dom';
import { Button,  Form } from 'semantic-ui-react'
import classes from './Login.module.css';

const Login = (props) => (
  <div >
  
    
    <Form.Field>
    <label>Email Address</label>
    <input type='email' placeholder='Email Address'  onChange={(event)=>props.change(event,'email')}/>
  </Form.Field>
  <Form.Field>
  <label>Password</label>
  <input type='password' placeholder='Password'  onChange={(event)=>props.change(event,'password')}/>
  </Form.Field>
  <Button  primary type='submit' disabled={props.btnVisibility}>Login</Button><br />
  <p>Not Register Yet ? </p> <Link to="/signup"> Register</Link>
  
  </div>
)

export default Login;