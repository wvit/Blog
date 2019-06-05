import React from 'react'
import { Title } from 'moha-ui'
import '../../assets/css/user/contact.css'

class Introduce extends React.Component {
  render() {
    return (
      <div>
        <Title titleName="联系我" className="mainBgColor" />
        <div className="body introduce-wrap">
          <p className="introduce-text mt10">
            您好，如果博客中有错误或应用有bug，欢迎向我提出。当然，如果不嫌弃，技术交流也是非常欢迎的。
          </p>
          <p className="email google">
            <i className="icon icon-google"></i>  1999wuwei@gmail.com
          </p>
          <p className="email qq">
            <i className="icon icon icon-qq"></i>  1083926534@qq.com
          </p>
        </div>
      </div>
    )
  }
}

export default Introduce