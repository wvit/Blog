import React from 'react'
import { Title, Dialog } from 'moha-ui'
// import { SketchPicker, AlphaPicker, BlockPicker, ChromePicker, CirclePicker, GithubPicker, HuePicker } from 'react-color-moha'

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DialogOnOff: false//弹窗开关
    }
  }
  render() {
    return (
      <div>
        <Title titleName="首页" className="mainBgColor" />
        <div className="body">
          <button onClick={this.changeShow.bind(this)}>按钮</button>
          <Dialog
            visible={this.state.DialogOnOff}
            onClose={this.close.bind(this)}
            onAffirm={this.affirm.bind(this)}
          >
            <p>欢迎来到wv的blog，应用正在开发</p>
          </Dialog>
          {/* <SketchPicker />
          <div style={{ border: '2px solid red', margin: '30px auto' }}></div>
          <AlphaPicker color='red' />
          <div style={{ border: '2px solid red', margin: '30px auto' }}></div>
          <BlockPicker />
          <div style={{ border: '2px solid red', margin: '30px auto' }}></div>
          <ChromePicker />
          <div style={{ border: '2px solid red', margin: '30px auto' }}></div>
          <CirclePicker />
          <div style={{ border: '2px solid red', margin: '30px auto' }}></div>
          <GithubPicker />
          <div style={{ border: '2px solid red', margin: '30px auto' }}></div>
          <HuePicker />
          <div style={{ border: '2px solid red', margin: '30px auto' }}></div>
          <div style={{ border: '2px solid red', margin: '30px auto' }}></div> */}
        </div>
      </div>
    )
  }
  //控制显示
  changeShow() {
    this.setState({
      DialogOnOff: true
    })
  }
  //隐藏
  close() {
    this.setState({
      DialogOnOff: false
    })
  }
  //确认对话
  affirm() {
    this.setState({
      DialogOnOff: false
    })
  }
}

export default Index