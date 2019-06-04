import React from 'react'
import { Title } from 'moha-ui'
import Toolbar from '../components/moha-ui-test/toolbar'

class Find extends React.Component {
  render() {
    return (
      <div>
        <Title titleName="生活记录" className="mainBgColor" />
        <Toolbar></Toolbar>
        <div className="body">
          <p>暂无内容</p>

        </div>
      </div>
    )
  }
}

export default Find
