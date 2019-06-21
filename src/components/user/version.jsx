import React from 'react'
import { Title } from 'moha-ui'
import '../../assets/css/user/version.css';

const active = 1;//选中步骤
//版本数据
const versionData = [
  {
    description: '0.1.0最初版上线',
    hint: '2019-06-06'
  },
  {
    description: '0.1.11版---修改下拉触底加载数据',
    hint: '2019-06-20'
  },
  {
    description: '获取网易云音乐数据 / 添加ip白名单权限',
    hint: '后续迭代'
  }
];

class Version extends React.Component {
  render() {
    return (
      <div>
        <Title titleName="版本进度" className="mainBgColor" >
          <span className="progress-icon icon icon-jindu"></span>
        </Title>
        <div className="body introduce-wrap">
          <ul className="steps-list">{
            versionData.map((item, index) => {
              return (
                <li key={index}>
                  <div className={`steps-icon ${index <= active ? 'active' : ''}`}>
                    <i>
                      {index + 1}
                    </i>
                    {
                      index + 1 === versionData.length ? '' : <span></span>
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