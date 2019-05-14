import React from 'react'
import { Title } from 'moha-ui'

class Learn extends React.Component {
  render() {
    return (
      <div>
        <Title titleName='学习记录' className="mainBgColor" />
        <ul className="body">
          <li>
            <div className="item-head">
              <h4>webpack踩坑 1</h4>
              <p>2019-5-11</p>
            </div>
            <div className="item-content clearfix">
              <div className="text">
                webpack踩坑 webpack踩坑 webpack踩坑 webpack踩坑 webpack踩坑
              </div>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

export default Learn