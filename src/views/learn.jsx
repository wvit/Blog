import React from 'react'
import { Title } from 'moha-ui'
import a from '../assets/img/a.png'
import '../assets/css/learn/learn.css'

class Learn extends React.Component {
  render () {
    return (
      <div>
        <Title titleName='学习日志' className="mainBgColor" />
        <ul className="blog-list">
          {
            [1, 2, 3].map((item, index) => {
              return <li key={index}>
                <div className="item-head">
                  <h4>webpack踩坑{item}</h4>
                  <p><i className="icon icon-shijian"></i> 2019-5-11</p>
                </div>
                <div className="item-content clearfix">
                  <div className="text">
                    webpack踩坑 webpack踩坑 webpack踩坑 webpack踩坑 webpack踩坑
                        </div>
                  <img src={a} alt="" className="img" />
                </div>
              </li>
            })
          }
        </ul>
      </div>
    )
  }
}

export default Learn