import React from 'react'
import { Title, Sidebar } from 'moha-ui'
import { NavLink } from 'react-router-dom'
import { tagStore, mainColorStore } from '../store'
import { sessionStore, query } from '../utils'
import Paging from '../components/moha-ui-test/paging'
import '../assets/css/learn/learn.css'
import '../assets/css/public/blogList.css'

class Learn extends React.Component {
  constructor(props) {
    super(props);
    //监听标签容器变化
    tagStore.subscribe(() => {
      this.setState({
        tags: tagStore.getState().tag
      });
    })
    let tags = [];//初始化选择的标签
    tagStore.getState().tag.forEach(item => {
      if (item.checked) tags.push(item.tag);
    })
    this.state = {
      tags: tagStore.getState().tag,//博客标签
      blogList: sessionStore.get('learnBlogList') || [],//博客列表
      page: sessionStore.get('learnBlogPage') || 1,//开始页码
      sidebarOnOff: false,//菜单栏显示开关
      mainColor: mainColorStore.getState(),//主题颜色
      clientHeight: 0,//可视区高度
      //请求分页参数
      reqData: {
        pageSize: 10,
        model: 1,
        tags: JSON.stringify(tags)
      },
    };

  }
  //渲染
  render() {
    const style = { overflow: "hidden", height: 'calc(100vh - 89px)' };
    const { sidebarOnOff, blogList, tags, mainColor, clientHeight, reqData, page } = this.state;
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
        <Paging
          clientHeight={clientHeight}
          pageKey="page"
          page={page}
          data={reqData}
          onGetPageData={this.getPageData.bind(this)}
          onLeave={this.pageLeave.bind(this)}>
          <ul className="blog-list">
            {
              blogList.map((item, index) => {
                return <li key={index} >
                  <NavLink to={`/interior/blogDetail/${item._id}`} className="link">
                    <div className="item-head">
                      <h4>{item.title}</h4>
                      <p><i className="icon icon-shijian"></i> {item.addTime}</p>
                    </div>
                    <p className="item-tag icon icon-tag">
                      {
                        item.tags.map((item, index) => {
                          return <em key={index}>{item}</em>
                        })
                      }
                    </p>
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
        </Paging>
      </div>
    )
  }
  //组件初始化完成
  componentDidMount() {
    const titleHeight = query('.head-wrap')[0].offsetHeight;
    const tabberHeight = query('.tabber-wrap ul')[0].offsetHeight;
    const clientHeight = window.screen.height - titleHeight - tabberHeight;
    window.scrollTo(0, sessionStore.get('learnBlogScrollTop') || 0);
    this.setState({
      clientHeight
    })
    this.setTag();
  }
  //离开页面
  pageLeave(data) {
    sessionStore.set('learnBlogPage', data.page);
  }
  //获取分页信息
  getPageData({ data, code }) {
    query('.loading')[0].style.display = data.list.length === 0 ? 'none' : 'block';
    if (code !== 0) return;
    const blogList = this.state.blogList;
    data.list.forEach(item => {
      const content = new DOMParser().parseFromString(item.content, 'text/html');
      const img = content.querySelector('img');
      if (img) item.img = img.src;
      blogList.push(item)
    });
    this.setState({
      blogList
    });
  }
  //选择标签
  checkTag(index) {
    const tags = this.state.tags;
    tags[index].checked = !tags[index].checked;
    tagStore.dispatch({
      type: 'tag',
      data: tags
    });
    this.setTag();
  }
  //设置标签
  setTag() {
    const tags = tagStore.getState().tag;
    const { reqData } = this.state;
    const queryTags = [];
    if (tags) {
      tags.forEach(item => {
        if (item.checked) queryTags.push(item.tag);
      })
      reqData.tags = JSON.stringify(queryTags);
      this.setState({
        reqData,
        blogList: []
      })
    }
  }
  //显示侧边栏
  showHideMenuBar(sidebarOnOff) {
    this.setState({
      sidebarOnOff
    });
  }
  //组件卸载移除事件
  componentWillUnmount() {
    sessionStore.set('learnBlogList', this.state.blogList);
    sessionStore.set('learnBlogScrollTop', document.documentElement.scrollTop);
    this.setState = () => { };
  }
}

export default Learn