import {  Form } from 'semantic-ui-react';

const Input = (props) => {
 
  
      return    (  <Form.Field key={props.id}>
                        <label>{props.label}</label>
                        <input 
                        type={props.type}
                        placeholder={props.hint}
                        value={props.value}
                        invalid={!props.valid}
                        shouldValidate={props.validation}
                        touched={props.touched}
                          />
                    </Form.Field>
           
);

}

export default Input;