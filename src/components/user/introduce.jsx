import React from 'react'
import { Title } from 'moha-ui'
import demo from '../../assets/img/demo.jpg'
import demo1 from '../../assets/img/demo1.jpg'

class Introduce extends React.Component {
  render() {
    return (
      <div>
        <Title titleName="网站介绍" className="mainBgColor" />
        <div className="body introduce-wrap">
          <p className="introduce-text mt10">
            你好，欢迎来到wv的个人主页，网站的开发者是我和levin，目的是为了记录日常和练习新技术。
            网站是单页应用,后面会优化PWA相关内容，也可能尝试着使用react native编写。
          </p>
          <p className="introduce-text">
            前端，后端，后台是我开发，nginx,https等相关配置部署是由levin完成。
            为了更好的学习react,所以前端是由react编写,顺便封装了一些组件到moha-ui。
            后端是nodejs(koa2)+ mongoDB(mongoose)编写(增删改查)。
            后台是vue + element-ui编写。
          </p>
          <p className="introduce-text">
            因为这个网站属于SPA,PWA。
            所以如果您的浏览器是火狐或者谷歌等支持PWA的浏览器，您可以将网站添加到主屏幕，需注意不是添加快捷方式。
          </p>
          <p className="img-wrap">
            <img src={demo} alt="" />
            <span>谷歌浏览器</span>
          </p>
          <p className="img-wrap">
            <img src={demo1} alt="" />
            <span>火狐浏览器</span>
          </p>
          <p className="introduce-text">
            感谢您的访问
          </p>
        </div>
      </div>
    )
  }
}

export default Introduce