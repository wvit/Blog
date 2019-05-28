import React from 'react'
// import Index from '../views/index'
import Learn from '../views/learn'
import Life from './life'
import User from '../views/user'
import { Tabber } from 'moha-ui'
import { mainColorStore } from '../store'

class Home extends React.Component {
  constructor(props) {
    super(props);
    mainColorStore.subscribe(() => {
      this.setState({
        mainColor: mainColorStore.getState()
      })
    })
    this.state = {
      mainColor: mainColorStore.getState()//主题颜色
    }
  }
  render() {
    //tabber配置
    const tabberConfig = {
      iconType: 'iconfont',
      selectedColor: this.state.mainColor,
      list: [
        // { name: '首页', path: '/home/index', component: Index, className: "icon icon-shouye" },
        { name: '学习', path: '/home/learn', component: Learn, className: "icon icon-xuexi" },
        { name: '生活', path: '/home/life', component: Life, className: "icon icon-shenghuo" },
        { name: '我的', path: '/home/user', component: User, className: "icon icon-shezhi" }
      ]
    }
    return (
      <Tabber tabberConfig={tabberConfig} />
    )
  }
}

export default Home