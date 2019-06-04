import React from 'react'
import { Title, Toolbar } from 'moha-ui'
import { tagStore, mainColorStore } from '../store'
import '../assets/css/life/life.css'

class Find extends React.Component {
  constructor(props) {
    super(props)
    //监听标签容器变化
    tagStore.subscribe(() => {
      this.setState({
        type: tagStore.getState().type
      })
    })
    this.activeStyle = { background: mainColorStore.getState(), color: '#fff' };//选中类型样式
    this.state = {
      visible: false,//是否显示
      type: tagStore.getState().type,//类型数据
      typeActiveIndex: 0,//类型选中索引
    };
  }
  render() {
    const { visible, type, typeActiveIndex } = this.state;
    return (
      <div>
        <Title titleName="生活记录" className="mainBgColor" />
        <Toolbar visible={visible} onVisible={this.showHideToolbar.bind(this)}>
          <ul className="type-wrap" style={{ width: `${type.length * 105}px` }}>
            {
              type.map((item, index) => {
                return (
                  <li key={index} onClick={this.typeChange.bind(this, item._id, index)} style={typeActiveIndex === index ? this.activeStyle : {}}>
                    {item.tag}
                  </li>
                )
              })
            }
          </ul>
        </Toolbar>
        <div className="body">
          <p>暂无内容</p>
        </div>
      </div>
    )
  }
  //类型改变
  typeChange(id, index) {
    if (index === this.typeActiveIndex) return;
    this.setState({
      typeActiveIndex: index
    })
  }
  //工具栏显示隐藏
  showHideToolbar() {
    const visible = !this.state.visible;
    this.setState({ visible });
  }
}

export default Find
