import React from 'react'
import { Button,  Form } from 'semantic-ui-react'

const Login = () => (
  <Form>
    <Form.Field>
      <label>First Name</label>
      <input placeholder='First Name' />
    </Form.Field>
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
    


    <Button  primary type='submit'>Submit</Button>
  </Form>
)

export default Login;