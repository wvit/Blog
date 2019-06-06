import React from 'react'
import { ColorPicker, Title } from 'moha-ui'
import { mainColorStore } from '../store'
import { NavLink } from 'react-router-dom'
import '../assets/css/user/user.css'

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorValue: mainColorStore.getState() //颜色值
    }
  }
  render() {
    return (
      <div className="user-wrap">
        <Title titleName="我的" className="mainBgColor" />
        <ul className="user-list">
          <li className="clearfix">
            <span className="icon icon-colorPicker">选择主题：</span>
            <div>
              <ColorPicker
                className="ColorPicker"
                type='BlockPicker'
                color={this.state.colorValue}
                onChange={this.colorChange.bind(this)}
              />
            </div>
          </li>
          <li>
            <NavLink to="/interior/introduce" className="clearfix link">
              <span className="icon icon-fanhuima">查看网站介绍</span>
              <i className="entry icon icon-jinru"></i>
            </NavLink>
          </li>
          <li className="clearfix">
            <NavLink to="/interior/skill" className="clearfix link">
              <span className="icon icon-tubiao">技能可视化</span>
              <i className="entry icon icon-jinru"></i>
            </NavLink>
          </li>
          <li className="clearfix">
            <NavLink to="/interior/contact" className="clearfix link">
              <span className="icon icon-email">撩我</span>
              <i className="entry icon icon-jinru"></i>
            </NavLink>
          </li>
        </ul>
      </div >
    )
  }
  //组件渲染完成
  componentDidMount() {




  }
  //颜色值变化
  colorChange({ hex }) {
    this.setState({
      colorValue: hex
    });
    mainColorStore.dispatch({ type: 'change', color: hex });
  }
}

export default User