import {  Table} from 'semantic-ui-react';


const Tablehoc = (props) => (
  
    <div>
    <Table celled padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell singleLine>Sr. No</Table.HeaderCell>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Content</Table.HeaderCell>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>

          
        </Table.Row>
      </Table.Header>
  
      <Table.Body>
      {props.children}
      </Table.Body>
    </Table>
    </div>
);

export default Tablehoc;