import React from 'react';
import { Route  } from 'react-router-dom';
import Register from './containers/Auth/Register/Register';
import Login from './containers/Auth/Login/Login';
import Home from './containers/Home';
import './App.css';
import './assets/semantic/semantic.min.css'



function App() {
  return (
    <div className="App">
      <Route path="/signup" component={Register} />
      <Route path="/signin" component={Login} />
      <Route path="/" exact component={Home}/>
     
    </div>
  );
}

export default App;
