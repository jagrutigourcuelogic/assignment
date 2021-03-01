import React , { Component } from 'react';
import { Route , Switch , Redirect } from 'react-router-dom';
import Register from './containers/Auth/Register/Register';
import Login from './containers/Auth/Login/Login';
import Home from './containers/Home';
import TodoList from './containers/Todo/TodoList/TodoList';
import TodoCreate from './containers/Todo/TodoCreate/TodoCreate';
import TodoOperation from './containers/Todo/TodoOperation/TodoOperation';
import Layout from './hoc/layout';
import { connect } from 'react-redux';
import { authCheckState } from './store/actions/index';
import './App.css';
import './assets/semantic/semantic.min.css'




class App extends Component{


  componentDidMount(){
    this.props.onTryAutoSignup();
  }

    render (){
      
          let routes = ( 
            <Switch>
            <Route path="/signup" component={Register} />
            <Route path="/signin" component={Login} />
            <Route path="/" exact component={Home}/>
            <Redirect to={this.props.rediectpath} />
              </Switch>
          );
    if(this.props.isAuthenticated){
    routes = (
    <Switch>
      
      <Route path="/todos/create" component={TodoCreate} />
      <Route path="/todos/:id" component={TodoOperation} />
      <Route path="/todos" component={TodoList} />
      <Route path="/" exact component={Home}/>
      <Redirect to={this.props.rediectpath} />
      
    </Switch>
    );
    }
  return (
    <div className="App">
      <Layout>
       {routes}
      </Layout>
    </div>
  );

    }
}

const mapStateToProps = state => {
  return {
      isAuthenticated:state.auth.token !== null,
      rediectpath:state.auth.authRedirectPath
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup : () => dispatch(authCheckState())
  }
}

export default connect(mapStateToProps ,mapDispatchToProps)(App);

