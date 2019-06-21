import React from 'react'
import { ColorPicker, Title, Dialog } from 'moha-ui'
import { mainColorStore } from '../store'
import { NavLink } from 'react-router-dom'
import '../assets/css/user/user.css'

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorValue: mainColorStore.getState(), //颜色值
      DialogOnOff: false,//弹窗开关
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
          <li className="clearfix" onClick={() => { this.setState({ DialogOnOff: true }) }}>
            <span className="icon icon-reset">清除缓存</span>
          </li>
        </ul>
        <Dialog
          title='清除缓存'
          visible={this.state.DialogOnOff}
          onClose={() => { this.setState({ DialogOnOff: false }) }}
          onAffirm={this.affirmClear.bind(this)}
        >
          <p className="clear-hint">应用中可能某些bug是由sessionStorage或localStorage导致，是否清除它们。</p>
        </Dialog>
      </div >
    )
  }
  //颜色值变化
  colorChange({ hex }) {
    this.setState({
      colorValue: hex
    });
    mainColorStore.dispatch({ type: 'change', color: hex });
  }
  //确认清除缓存
  affirmClear() {
    localStorage.clear();
    sessionStorage.clear();
    this.setState({
      DialogOnOff: false
    })
  }
}

export default User