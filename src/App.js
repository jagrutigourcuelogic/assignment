import React from 'react';
import { Route  } from 'react-router-dom';
import Login from './components/Login/Login';
import './App.css';
import './assets/semantic/semantic.min.css'



function App() {
  return (
    <div className="App">
      <Route path="/" component={Login}/>
      Home Page
    </div>
  );
}

export default App;
