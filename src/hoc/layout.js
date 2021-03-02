import React from 'react';
import classes from './Layout.module.css';
import Toolbar from '../components/Navigation/Toolbar/Toolbar';
import { connect } from 'react-redux'; 

const Layout = (props) => {

   
    return (
            <div>
          {props.isAuthenticated &&  <Toolbar/> }
                <main className={classes.Content}>
                  {props.children}
                </main>
            </div>
            )
    
} 

const mapStateToProps = state => {
  return {
      isAuthenticated:state.auth.token !== null
    
  }
}

export default  connect(mapStateToProps)(Layout) ;