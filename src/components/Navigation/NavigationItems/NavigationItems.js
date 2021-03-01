import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {

        // let navItems = null ;
        // if(props.isAuthenticate){
        //   navItems = (
        //     <NavigationItem link="/logout">Logout</NavigationItem> 
        //   );
        // }

      return(
       <ul className={classes.NavigationItems}>
       <NavigationItem link="/logout">Logout</NavigationItem> 
       </ul>
      );
     }
 export default navigationItems;