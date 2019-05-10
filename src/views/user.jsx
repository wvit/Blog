import React from 'react'
import HeadTitle from '../components/public/headTitle'
import { ColorPicker } from 'moha-ui'
import '../assets/css/user/user.css'

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //颜色值
      colorValue: 'blue'
    }
  }
  render() {
    return (
      <div className="user-wrap">
        <HeadTitle titleName="我的" />
        <ul className="user-list">
          <li className="clearfix icon icon-colorPicker">
            <span >选择主题：</span>
            <div>
              <ColorPicker
                className="ColorPicker" type='BlockPicker'
                color={this.state.colorValue}
                colorChange={this.colorChange.bind(this)}
              />
            </div>
          </li>
        </ul>
      </div >
    )
  }
  //颜色值变化
  colorChange(ev) {
    this.setState({
      colorValue: ev.hex
    })
  }
}

export default User