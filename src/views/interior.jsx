import React from 'react';
import BlogDetail from '../components/public/blogDetail'
import Introduce from '../components/user/introduce'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class Interior extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/interior/blogDetail/:id' component={BlogDetail} />
          <Route path='/interior/introduce' component={Introduce} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Interior