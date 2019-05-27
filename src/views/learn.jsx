import React from 'react'
import { Title } from 'moha-ui'
import axios from '../axios'
import '../assets/css/learn/learn.css'

class Learn extends React.Component {
  constructor(props) {
    super(props)
    this.getBlogList();
    this.state = {
      blogList: []//博客列表
    }
  }
  render() {
    return (
      <div>
        <Title titleName='学习日志' className="mainBgColor" />
        <ul className="blog-list">
          {
            this.state.blogList.map((item, index) => {
              return <li key={index}>
                <div className="item-head">
                  <h4>{item.title}</h4>
                  <p><i className="icon icon-shijian"></i> {item.addTime}</p>
                </div>
                <div className="item-content clearfix">
                  <div className="text" dangerouslySetInnerHTML={{ __html: item.content }}></div>
                  {
                    item.img ? <img src={item.img} className="img" alt="" /> : ''
                  }
                </div>
              </li>
            })
          }
        </ul>
      </div>
    )
  }
  //获取blog列表
  getBlogList() {
    const blogList = [];
    axios.get(`/app/getBlogs?key=&page=1&pageSize=10`).then(res => {
      if (res.data.code !== 0) return;
      res.data.data.list.forEach(item => {
        const content = new DOMParser().parseFromString(item.content, 'text/html');
        const img = content.querySelector('img');
        if (img) item.img = img.src;
        blogList.push(item)
      });
      this.setState({
        blogList
      });
    });
  }
}

export default Learn