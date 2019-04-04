import React from 'react';
import '../../assets/css/public/Tabber.css'

class Tabber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //tabber配置
      tabberConfig: [
        { name: '首页' },
        { name: '发现' },
        { name: '我的' }
      ],
      activeIndex: 0,//当前选中
    }
  }
  render() {
    return (
      <div className="tabber-wrap">
        <ul className="clearfix">
          {
            this.state.tabberConfig.map((item, index) => {
              return <li
                key={index}
                className={[index === this.state.activeIndex ? 'active' : '']}
                onClick={this.tabberChange.bind(this, index)}
                style={{
                  width: `${100 / this.state.tabberConfig.length}%`
                }}
              >
                {item.name}
              </li>
            })
          }
        </ul>
      </div>
    )
  }
  //点击切换tabber
  tabberChange(activeIndex) {
    this.setState({
      activeIndex
    })
  }
}

export default Tabber