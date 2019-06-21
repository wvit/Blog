import React from 'react';
//博客详情
import BlogDetail from '../components/public/blogDetail'
//网站介绍
import Introduce from '../components/user/introduce'
//技能可视化
import Skill from '../components/user/skill'
//联系我
import Contact from '../components/user/contact'
//版本进度
import Version from '../components/user/version'
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
          <Route path='/interior/version' component={Version} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Interior