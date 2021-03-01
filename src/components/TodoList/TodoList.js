import React from 'react'
import { Header, Table, Rating, Button } from 'semantic-ui-react';
import { Link , withRouter ,useRouteMatch} from 'react-router-dom';
import classes from './TodoList.module.css';

const TableExamplePadded = (props) => {




return (
  <div className={classes.TodoList}>
    <Link to={props.match.path + '/create'}><Button primary>Create Todo</Button></Link>
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

}

export default withRouter(TableExamplePadded);