import React from 'react'
import { Title, Sidebar } from 'moha-ui'
import { NavLink } from 'react-router-dom'
import { tagStore, mainColorStore } from '../store'
import { sessionStore, query, axios } from '../utils'
import '../assets/css/learn/learn.css'

class Learn extends React.Component {
  constructor(props) {
    super(props)
    this.reqTimer = null;//请求间隔定时器
    this.reqOnOff = true;//是否允许请求
    this.blogListHeight = 0;//博客容器的高
    //监听标签容器变化
    tagStore.subscribe(() => {
      this.setState({
        tags: tagStore.getState().tag
      })
    })
    this.state = {
      tags: tagStore.getState().tag,//博客标签
      blogList: [],//博客列表
      sidebarOnOff: false,//菜单栏显示开关
      mainColor: mainColorStore.getState()//主题颜色
    }
  }
  //渲染
  render() {
    const style = { overflow: "hidden", height: 'calc(100vh - 89px)' };
    const { sidebarOnOff, blogList, tags, mainColor } = this.state;
    return (
      <div className="wrap" style={sidebarOnOff ? style : {}}>
        <Title titleName='学习日志' className="mainBgColor">
          <span className="title-btn icon icon-40" onClick={this.showHideMenuBar.bind(this, true)}></span>
        </Title>
        <Sidebar visible={sidebarOnOff} onClose={this.showHideMenuBar.bind(this, false)}>
          <h3 className="tag-title icon icon-tag">请选择博客标签</h3>
          <ul className="tag-list">
            {
              tags.map((item, index) => {
                const checked = item.checked;
                return (
                  <li
                    style={{
                      border: `1px solid ${checked ? mainColor : '#999'}`,
                      background: checked ? mainColor : '',
                      color: checked ? '#fff' : ''
                    }}
                    key={index}
                    onClick={this.checkTag.bind(this, index)}
                  >
                    {item.tag}
                  </li>
                )
              })
            }
          </ul>
        </Sidebar>
        {
          blogList.length < 1 ? <p className="body">暂无内容</p> : ''
        }
        <ul className="blog-list">
          {
            blogList.map((item, index) => {
              return <li key={index} >
                <NavLink to={`/interior/blogDetail/${item._id}`} className="link" onClick={this.saveData.bind(this)}>
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
    this.setTag();
    window.onscroll = () => {
      const scrollTop = clientHeight + document.documentElement.scrollTop;
      if (scrollTop > this.blogListHeight) {
        this.page = this.page + 1
        this.getBlogList();
      }
    }
  }
  //选择标签
  checkTag(index) {
    const tags = this.state.tags;
    tags[index].checked = !tags[index].checked;
    tagStore.dispatch({
      type: 'tag',
      data: tags
    });
    clearTimeout(this.reqTimer);
    this.reqTimer = setTimeout(this.setTag.bind(this), 500);
  }
  //设置标签
  setTag() {
    const tags = tagStore.getState().tag;
    this.page = 1;
    this.queryTags = [];
    this.setState({
      blogList: []
    });
    if (tags) {
      tags.forEach(item => {
        if (item.checked) this.queryTags.push(item.tag);
      })
    }
    this.reqBlogList();
  }
  //显示菜单栏
  showHideMenuBar(sidebarOnOff) {
    this.setState({
      sidebarOnOff
    });
  }
  //获取blog列表
  getBlogList() {
    if (!this.reqOnOff) return;
    const learnBlogList = sessionStore.get('learnBlogList') || [];
    this.reqOnOff = false;
    if (learnBlogList.length === 0) {
      this.reqBlogList();
    } else {
      this.setState({
        blogList: learnBlogList
      });
      this.page = sessionStore.get('learnBlogPage');
      sessionStore.set('learnBlogList', []);
      window.scrollTo(0, sessionStore.get('learnBlogScrollTop'));
      this.setBlogListHeight();
    }
  }
  //发送获取博客的请求
  reqBlogList() {
    const blogList = this.state.blogList;
    const blogListLength = blogList.length;
    axios.get(`/app/getBlogs?page=${this.page}&pageSize=10&tags=${JSON.stringify(this.queryTags)}`).then(res => {
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
    });
  }
  //设置blogListd的高
  setBlogListHeight() {
    this.blogListHeight = query('.blog-list')[0].offsetHeight;
    this.reqOnOff = true;
  }
  //进入详情页保存数据
  saveData() {
    sessionStore.set('learnBlogList', this.state.blogList);
    sessionStore.set('learnBlogPage', this.page);
    sessionStore.set('learnBlogScrollTop', document.documentElement.scrollTop);
  }
  //组件卸载移除时间
  componentWillUnmount() {
    window.onscroll = null;
  }
}

export default Learn