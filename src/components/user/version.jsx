import React from 'react'
import { Title } from 'moha-ui'
import { mainColorStore } from '../../store'
import '../../assets/css/user/version.css';

//版本数据
const versionData = [
  [
    {
      description: '雏形---发布第一篇测试博客',
      hint: '2019-05-31'
    },
    {
      description: '0.1.0---最初版上线',
      hint: '2019-06-06'
    },
    {
      description: '0.1.11版---修改下拉触底加载数据逻辑，添加版本查看，清除缓存',
      hint: '2019-06-20'
    },
    {
      description: '获取网易云音乐数据 / 添加ip白名单权限',
      hint: '后续迭代'
    }
  ],
  [
    {
      description: '0.1.2---添加一些基础组件到moha-ui',
      hint: '初始化'
    }, {
      description: '0.1.23---修复一些小bug',
      hint: '2019-06-22'
    },
    {
      description: '封装<Paging />组件到moha-ui',
      hint: '后续迭代'
    },
  ]
];

class Version extends React.Component {
  constructor(props) {
    super(props)
    const mainColor = mainColorStore.getState();  //主色调
    //默认样式
    this.defaultStyle = {
      background: mainColor,
      border: `1px solid ${mainColor}`
    };
    //选中样式
    this.activeStyle = {
      background: '#fff',
      color: mainColor
    }
    this.btnList = ['网站版本', 'moha-ui版本'];   //按钮列表
    this.actives = [2, 1];//选中步骤
    this.state = {
      btnActiveIndex: 0,//按钮选中
      versionData//版本数据
    }
  }
  render() {
    const { versionData, btnActiveIndex } = this.state;
    return (
      <div>
        <Title titleName="版本进度" className="mainBgColor" >
          <span className="progress-icon icon icon-jindu"></span>
        </Title>
        <div className="body introduce-wrap">
          <div className="btn-list">
            <ul className="clearfix" style={this.defaultStyle}>
              {
                this.btnList.map((item, index) => {
                  return (
                    <li
                      key={index}
                      style={btnActiveIndex === index ? this.activeStyle : {}}
                      onClick={() => { this.setState({ btnActiveIndex: index }) }}
                    >
                      {item}
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <ul className="steps-list">{
            versionData[btnActiveIndex].map((item, index) => {
              return (
                <li key={index}>
                  <div className={`steps-icon ${index <= this.actives[btnActiveIndex] ? 'active' : ''}`}>
                    <i>
                      {index + 1}
                    </i>
                    {
                      index + 1 === versionData[btnActiveIndex].length ? '' : <span></span>
                    }
                  </div>
                  <div className="steps-item">
                    <p>{item.description}</p>
                    <span>{item.hint}</span>
                  </div>
                </li>
              )
            })
          }
          </ul>
        </div>
      </div>
    )
  }
}

export default Version