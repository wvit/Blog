import React from 'react'
import { Title } from 'moha-ui'
import '../../assets/css/user/introduce.css'

class Introduce extends React.Component {
  render() {
    return (
      <div>
        <Title titleName="网站介绍" className="mainBgColor" />
        <div className="body">
          你好,欢迎来到wv的blog
        </div>
      </div>
    )
  }
}

export default Introduce