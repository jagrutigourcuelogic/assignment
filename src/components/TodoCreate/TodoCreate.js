import React from 'react'
import { Button,  Form } from 'semantic-ui-react';



  

const TodoCreate = (props) => {
  const options = [
    { key: 'pending', text: 'Pending', value: 'Pending' },
    { key: 'inprogress', text: 'InProgress', value: 'InProgress' },
    { key: 'completed', text: 'Completed', value: 'Completed' },
  ]
 const optele = options.map(option => (
    <option key={option.key} value={option.value} 
    selected={(props.value && props.value.status.value === option.value) ? true : false}>
        {option.text} 
    </option>
 ));

// console.log(props.value);
     
    return(<div>
    
    <Form.Field>
    <label>Title</label>
    <input type='text' placeholder='Todo Title'  
      onChange={(event)=>props.change(event,'title')} 
       readOnly={props.readstatus}
       value={props.value && props.value.title.value}
       
       />
  </Form.Field>
  <Form.Field>
  <label>Content</label>
  <Form.TextArea  placeholder='Todo Content' 
    onChange={(event)=>props.change(event,'content')} 
    readOnly={props.readstatus}
    value={props.value && props.value.content.value}/>
  </Form.Field>
  <Form.Field>
  <label>Date</label>
  <input type='date'
   placeholder='Todo Date'  
   onChange={(event)=>props.change(event,'date')} 
   disabled={props.readstatus}
   value={props.value && props.value.date.value} />
  </Form.Field>
  <Form.Field>
  <label>Status</label>
<select placeholder='Select Status' 
onChange={(event)=>props.change(event,'status')} 
disabled={props.readstatus} >
  {optele}
</select>
</Form.Field>

{!props.readstatus  && <Button  primary type='submit' disabled={props.btnVisibility}>Submit</Button> }

<Button primary onClick={props.backbtn}>Back</Button>
  </div>
)
}

export default TodoCreate;