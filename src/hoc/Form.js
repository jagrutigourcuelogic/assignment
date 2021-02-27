import {  Form } from 'semantic-ui-react';
import classes from '../components/Register/Register.module.css';

const Formhoc = (props) => (
  
  <div className={classes.Register}>
      <Form onSubmit={props.submit}>
            
            {props.children}
            
      </Form>
 </div>
);

export default Formhoc;