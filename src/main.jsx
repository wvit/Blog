import React from 'react';
import ReactDOM from 'react-dom';
import Home from './views/home';
import Interior from './views/interior';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './store'
import './assets/css/public/public.css';

function init() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() =>
          <Redirect to='/home/learn'></Redirect>}>
        </Route>
        <Route exact path="/home" render={() =>
          <Redirect to='/home/learn'></Redirect>}>
        </Route>
        <Route path='/home' component={Home} />
        <Route path='/interior' component={Interior} />
      </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(init(), document.getElementById('root'));