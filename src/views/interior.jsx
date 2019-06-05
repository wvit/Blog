import React from 'react';
import BlogDetail from '../components/public/blogDetail'
import Introduce from '../components/user/introduce'
import Skill from '../components/user/skill'
import Contact from '../components/user/contact'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class Interior extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/interior/blogDetail/:id' component={BlogDetail} />
          <Route path='/interior/introduce' component={Introduce} />
          <Route path='/interior/skill' component={Skill} />
          <Route path='/interior/contact' component={Contact} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Interior