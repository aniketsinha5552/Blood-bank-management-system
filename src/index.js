import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import BBView from './Pages/BBView';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, browserHistory } from 'react-router';


ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" component={Home}/>
       <Route path="/login" component={Login}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/dashboard" component={Dashboard}/>
      <Route path="/dashboard/:page" component={Dashboard}/>
      <Route path="/bloodbank/:bbid" component={BBView}/>
    </Router>
  ), document.getElementById('root'));
registerServiceWorker();
