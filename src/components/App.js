import React from 'react';
import Login from '../pages/Login'
import { HashRouter as Router, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import UnauthenticatedRoute from '../components/UnauthenticatedRoute';
import AuthenticatedRoute from '../components/AuthenticatedRoute';
import '../styles/App.css';

const App = () => {
  return (
    <Router>      
      <Switch>        
        <UnauthenticatedRoute exact path={ ['/', '/login'] }>          
          <Login />
        </UnauthenticatedRoute>
        <AuthenticatedRoute exact path="/home">
          <Home />
        </AuthenticatedRoute>
      </Switch>
    </Router>    
  )
  
}

export default App;
