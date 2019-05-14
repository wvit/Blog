import React from 'react'
import { Title, Dialog } from 'moha-ui'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      DialogOnOff: false//弹窗开关
    }
  }
  render() {
    return (
      <div>
        <Title titleName="首页" className="mainBgColor" />
        <button onClick={this.changeShow.bind(this)}>按钮</button>
        <Dialog
          visible={this.state.DialogOnOff}
          onClose={this.close.bind(this)}
          onAffirm={this.affirm.bind(this)}
        />
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