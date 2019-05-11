import React from 'react'
import util from '../../assets/js/utils'
import './dialog.css'
import "animate.css";

class Dialog extends React.Component {
  render() {
    //传参
    const { title = '提示', children, visible } = this.props;
    const animationDuration = { animationDuration: '200ms' };
    this.showHide();
    return (
      <div className={`dialog-wrap animated ${visible ? 'fadeIn' : 'fadeOut'}`} style={animationDuration} onClick={this.props.onClose}>
        <div className={`dialog ${visible ? 'fadeInDown' : 'fadeOutDown'}`} style={animationDuration} onClick={ev => { ev.stopPropagation() }}>
          <div className="clearfix dialog-head">
            <p className="title-text">{title}</p>
            <span className="close" onClick={this.props.onClose}></span>
          </div>
          <div className="clearfix dialog-body">
            {children}
          </div>
          <div className="clearfix dialog-foot">
            <div>
              <span onClick={this.props.onClose}>取消</span>
              <span onClick={this.props.onAffirm}>确认</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  //监听dom挂载完毕
  componentDidMount() {
    util.query('.dialog-wrap')[0].style.display = this.props.visible ? 'block' : 'none';
  }
  //显示隐藏
  showHide() {
    const dialogWrap = util.query('.dialog-wrap')[0];
    const visible = this.props.visible;
    if (!dialogWrap) return;
    setTimeout(() => {
      dialogWrap.style.display = visible ? 'block' : 'none';
    }, visible ? 50 : 300);
  }
}

export default Dialog