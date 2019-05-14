import React from 'react'
import { ColorPicker, Title } from 'moha-ui'
import '../assets/css/user/user.css'
import util from '../assets/js/utils';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorValue: util.localStore.get('mainColor')  //颜色值
    }
  }
  render() {
    return (
      <div className="user-wrap">
        <Title titleName="我的" className="mainBgColor" />
        <ul className="user-list">
          <li className="clearfix icon icon-colorPicker">
            <span >选择主题：</span>
            <div>
              <ColorPicker
                className="ColorPicker"
                type='BlockPicker'
                color={this.state.colorValue}
                onChange={this.colorChange.bind(this)}
              />
            </div>
          </li>
        </ul>
      </div >
    )
  }
  //颜色值变化
  colorChange({ hex }) {
    this.setState({
      colorValue: hex
    });
    util.setMainColor(hex);
    util.localStore.set('mainColor', hex)
  }
}

export default User