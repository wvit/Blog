import React from 'react';
import { BlockPicker } from 'react-color'
import '../../assets/css/user/colorPicker.css'

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //弹出开关
      showOnOff: false,
      //颜色值
      colorValue: 'red',
    }
  };
  render () {
    const { size, type } = this.props;
    return (
      <div>
        <div
          className={`colorPicker-btn ${size === 'small' ? 'btn-small' : 'btn-medium'}`}
          style={{ background: this.state.colorValue }}
          onClick={this.showHideColorPicker.bind(this)}
        >
          <div className={`BlockPicker-wrap ${this.state.showOnOff ? type : ''}-wrap-show`}>
            <BlockPicker
              className="BlockPicker" color={this.state.colorValue}
              onChange={this.colorChange.bind(this)}
            />
          </div>
        </div>
      </div>
    )
  }
  //监听dom挂载完毕
  componentDidMount () {
    document.addEventListener('click', () => {
      this.setState({ showOnOff: false })
    })
  }
  //颜色选择器的显示与隐藏
  showHideColorPicker (ev) {
    ev.nativeEvent.stopImmediatePropagation()
    if (ev.target.classList.contains('colorPicker-btn')) {
      this.setState({ showOnOff: !this.state.showOnOff })
    }
  }
  //选择颜色
  colorChange (ev) {
    this.setState({
      colorValue: ev.hex
    })
  }
}

export default ColorPicker