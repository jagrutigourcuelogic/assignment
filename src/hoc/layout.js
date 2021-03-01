import React from 'react';
import NavigationItems from '../components/Navigation/NavigationItems/NavigationItems';

const Layout = (props) => {

   
    return (
            <div>
                <nav>
                    <NavigationItems />
                </nav>
                <main>
                  {props.children}
                </main>
            </div>
            )
    
} 



export default  Layout ;