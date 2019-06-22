import React from 'react'
import { Title, Shade } from 'moha-ui'
import { query } from '../utils.js'
import "../assets/css/index/index.css"
// import Axios from 'axios'

// const axios = Axios.create({
//   baseURL: 'http://localhost:4000',
//   withCredentials: true
// });

// axios.get(`/login/cellphone?phone=13890774972&password=wuwei19991024`).then(res => {
//   return axios.get(`/user/record?uid=${res.data.account.id}&type=0`)
// }).then(res => {
//   console.log(res.data)
// })

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.navListHeight = 0//菜单导航的高
    this.state = {
      shadeOnOff: false,//遮罩开关
      navListStyle: {}
    }
  }
  render() {
    const { shadeOnOff, navListStyle } = this.state;
    console.log(this.navListHeight)
    return (
      <div>
        <Title titleName="首页" className="mainBgColor">
          <span className="nav-list-btn" onClick={this.showNavList.bind(this)} > 导航</span>
        </Title>
        <Shade visible={shadeOnOff} style={{ top: '40px' }} />
        <ul className="nav-list" style={navListStyle}>
          <li>
            他的网易云音乐
          </li>
          <li>
            他的知乎
          </li>
        </ul>
        <div className="body">

        </div>
      </div >
    )
  }
  //组件渲染完成
  componentDidMount() {
    const navList = query('.nav-list')[0];
    const navListStyle = { height: 0 };
    this.navListHeight = navList.offsetHeight;
    this.setState({ navListStyle })
  }
  //显示导航
  showNavList() {
    const shadeOnOff = !this.state.shadeOnOff;
    const navListStyle = {
      height: shadeOnOff ? `${this.navListHeight}px` : '0',
      padding: shadeOnOff ? `10px 0` : '0',
    }
    this.setState({ shadeOnOff, navListStyle });
  }
}

export default Index