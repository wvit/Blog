import React from 'react'
import Index from '../views/index'
import Learn from '../views/learn'
import Find from '../views/find'
import User from '../views/user'
import { Tabber } from 'moha-ui'

class Home extends React.Component {
  render () {
    //tabber配置
    const tabberConfig = [
      { name: '首页', path: '/index', component: Index },
      { name: '学习', path: '/learn', component: Learn },
      { name: '发现', path: '/find', component: Find },
      { name: '我的', path: '/user', component: User }
    ]
    return (
      <div>
        <Tabber tabberConfig={tabberConfig} />
      </div>
    )
  }
}

export default Home