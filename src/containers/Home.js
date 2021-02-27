import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';


const Home = (props) => {

   const loginHandler = () => {
        props.history.push('/signin')
    }

   const registerHandler = () => {
        props.history.push('/signup')
    }

    return (
        <div>
                <h1>Welcome To Todo Portal</h1>
                <Button primary onClick={loginHandler}>Login</Button>
                <Button primary onClick={registerHandler}>Register</Button>
        </div>
    );
    
};

export default withRouter(Home);