import React , { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';



class Home extends Component {

    loginHandler = () => {
        this.props.history.push('/signin')
    };

    registerHandler = () => {
        this.props.history.push('/signup')
    };

   
    
    render() {
        let redirect = null;
    if(this.props.isAuthenticated){
        redirect = <Redirect to="/todos" />
    }
    return (
        <div>
        {redirect}
                <h1>Welcome To Todo Portal</h1>
                <Button primary onClick={this.loginHandler}>Login</Button>
                <Button primary onClick={this.registerHandler}>Register</Button>
        </div>
    );
    }
    
};


const mapStateToProps = state => {
    return {
        isAuthenticated:state.auth.token !== null
    }
  }
  
export default connect(mapStateToProps)(withRouter(Home));