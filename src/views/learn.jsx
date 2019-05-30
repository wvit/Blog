import React from 'react'
import { Title } from 'moha-ui'
import axios from '../axios'
import { NavLink } from 'react-router-dom'
import utils from '../utils'
import '../assets/css/learn/learn.css'

class Learn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogList: [],//博客列表
      page: 1,//页码
      blogListHeight: 0,//博客容器的高
    }
  }
  render() {
    return (
      <div className="wrap">
        <Title titleName='学习日志' className="mainBgColor" />
        <ul className="blog-list">
          {
            this.state.blogList.map((item, index) => {
              return <li key={index} >
                <NavLink to={`/interior/blogDetail/${item._id}`} className="link">
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
                </NavLink>
              </li>
            })
          }
        </ul>
        <p className="loading">正在加载下一页...</p>
      </div>
    )
  }
  //组件初始化完成
  componentDidMount() {
    const titleHeight = utils.query('.head-wrap')[0].offsetHeight;
    const tabberHeight = utils.query('.tabber-wrap ul')[0].offsetHeight;
    const clientHeight = window.screen.height - titleHeight - tabberHeight;
    this.getBlogList();
    window.addEventListener('scroll', () => {
      const scrollTop = clientHeight + document.documentElement.scrollTop;
      if (scrollTop > this.state.blogListHeight) {
        const page = this.state.page + 1;
        this.setState({
          page
        });
        this.getBlogList();
      }
    })
  }
  //获取blog列表
  getBlogList() {
    const blogList = this.state.blogList;
    const blogListLength = blogList.length
    axios.get(`/app/getBlogs?key=&page=${this.state.page}&pageSize=10`).then(res => {
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
      if (blogListLength === this.state.blogList.length) {
        utils.query('.loading')[0].style.display = 'none';
      }
      this.setState({
        blogListHeight: utils.query('.blog-list')[0].offsetHeight
      });
    });
  }
}

export default Learn