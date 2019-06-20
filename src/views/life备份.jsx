import React from 'react'
import { Title, Toolbar } from 'moha-ui'
import { NavLink } from 'react-router-dom'
import { tagStore, mainColorStore } from '../store'
import { sessionStore, query, axios } from '../utils'
import '../assets/css/life/life.css'
import '../assets/css/public/blogList.css'

class Find extends React.Component {
  constructor(props) {
    super(props)
    this.reqTimer = null;//请求间隔定时器
    this.reqOnOff = true;//是否允许请求
    this.blogListHeight = 0;//博客容器的高
    //监听标签容器变化
    tagStore.subscribe(() => {
      this.setState({
        type: tagStore.getState().type
      })
    })
    this.activeStyle = { background: mainColorStore.getState(), color: '#fff' };//选中类型样式
    this.state = {
      toolbarVisible: false,//是否显示
      type: tagStore.getState().type,//类型数据
      typeActiveIndex: '',//类型选中索引
      blogList: sessionStore.get('lifeBlogList') || [],//博客列表
    };
  }
  render() {
    const { toolbarVisible, type, typeActiveIndex, blogList } = this.state;
    return (
      <div className='wrap'>
        <Title titleName="生活记录" className="mainBgColor" />
        <Toolbar visible={toolbarVisible} onVisible={this.showHideToolbar.bind(this)}>
          <ul className="type-wrap" style={{ width: `${(type.length + 1) * 105}px` }}>
            <li onClick={this.typeChange.bind(this, '', '')} style={typeActiveIndex === '' ? this.activeStyle : {}}>
              全部
            </li>
            {
              type.map((item, index) => {
                return (
                  <li key={index} onClick={this.typeChange.bind(this, item._id, index)} style={typeActiveIndex === index ? this.activeStyle : {}}>
                    {item.tag}
                  </li>
                )
              })
            }
          </ul>
        </Toolbar>
        {
          blogList.length < 1 ? <p className="body">暂无内容</p> : ''
        }
        <ul className="blog-list">
          {
            blogList.map((item, index) => {
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
    const titleHeight = query('.head-wrap')[0].offsetHeight;
    const tabberHeight = query('.tabber-wrap ul')[0].offsetHeight;
    const clientHeight = window.screen.height - titleHeight - tabberHeight;
    if (this.state.blogList.length === 0) this.typeChange();
    window.onscroll = () => {
      const scrollTop = clientHeight + document.documentElement.scrollTop;
      if (this.state.blogList.length === 0) return;
      if (scrollTop > this.blogListHeight) {
        this.page = this.page + 1
        this.getBlogList();
      }
    }
  }
  //类型改变
  typeChange(id = '', typeActiveIndex = '') {
    if (this.classId === id) return;
    query('.loading')[0].style.display = 'block';
    this.page = 1;
    this.classId = id;
    this.setState({
      typeActiveIndex,
      blogList: []
    }, this.getBlogList);
  }
  //获取blog列表
  getBlogList() {
    if (!this.reqOnOff) return;
    const lifeBlogList = sessionStore.get('lifeBlogList') || [];
    this.reqOnOff = false;
    if (lifeBlogList.length === 0) {
      this.reqBlogList();
    } else {
      this.setState({
        blogList: lifeBlogList
      });
      this.page = sessionStore.get('lifeBlogPage');
      sessionStore.set('lifeBlogList', []);
      window.scrollTo(0, sessionStore.get('lifeBlogScrollTop'));
      this.setBlogListHeight();
    }
  }
  //发送获取博客的请求
  reqBlogList() {
    const blogList = this.state.blogList;
    const blogListLength = blogList.length;
    axios.get(`/app/getBlogs?page=${this.page}&pageSize=10&model=2&classId=${this.classId}`).then(res => {
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
      this.setBlogListHeight();
      if (blogListLength !== this.state.blogList.length) return;
      query('.loading')[0].style.display = 'none';
      window.onscroll = null;
    });
  }
  //设置blogListd的高
  setBlogListHeight() {
    this.blogListHeight = query('.blog-list')[0].offsetHeight;
    this.reqOnOff = true;
  }
  //工具栏显示隐藏
  showHideToolbar() {
    const toolbarVisible = !this.state.toolbarVisible;
    this.setState({ toolbarVisible });
  }
  //组件卸载移除事件
  componentWillUnmount() {
    sessionStore.set('lifeBlogList', this.state.blogList);
    sessionStore.set('lifeBlogPage', this.page);
    sessionStore.set('lifeBlogScrollTop', document.documentElement.scrollTop);
    window.onscroll = null;
  }
}

export default Find
