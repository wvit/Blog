import React from 'react'
import { Title, Toolbar } from 'moha-ui'
import { NavLink } from 'react-router-dom'
import { tagStore, mainColorStore } from '../store'
import { sessionStore, query } from '../utils'
import Paging from '../components/moha-ui-test/paging'
import '../assets/css/life/life.css'
import '../assets/css/public/blogList.css'

class Find extends React.Component {
  constructor(props) {
    super(props)
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
      page: sessionStore.get('lifeBlogPage') || 1,//开始页码
      clientHeight: 0,//可视区高度
      //请求分页参数
      reqData: {
        pageSize: 10,
        model: 2,
        classId: ''
      },
    };
  }
  render() {
    const { toolbarVisible, type, typeActiveIndex, blogList, clientHeight, reqData, page } = this.state;
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
        <Paging
          clientHeight={clientHeight}
          pageKey="page"
          data={reqData}
          page={page}
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
    window.scrollTo(0, sessionStore.get('lifeBlogScrollTop') || 0);
    this.setState({
      clientHeight
    });
  }
  //离开页面
  pageLeave(data) {
    sessionStore.set('lifeBlogPage', data.page);
  }
  //获取分页信息
  getPageData({ data, code }) {
    const lifeBlogList = sessionStore.get('lifeBlogList') || [];
    query('.loading')[0].style.display = data.list.length === 0 ? 'none' : 'block';
    if (code !== 0 || lifeBlogList.length > 0) {
      sessionStore.set('lifeBlogList', []);
      return
    };
    const blogList = this.state.blogList;
    data.list.forEach(item => {
      const content = new DOMParser().parseFromString(item.content, 'text/html');
      const img = content.querySelector('img');
      if (img) item.img = img.src;
      blogList.push(item);
    });
    this.setState({
      blogList
    });
  }
  //类型改变
  typeChange(id = '', typeActiveIndex = '') {
    if (this.classId === id) return;
    const { reqData } = this.state;
    reqData.classId = id;
    this.setState({
      typeActiveIndex,
      reqData,
      blogList: []
    });
  }
  //工具栏显示隐藏
  showHideToolbar() {
    const toolbarVisible = !this.state.toolbarVisible;
    this.setState({ toolbarVisible });
  }
  //组件卸载移除事件
  componentWillUnmount() {
    sessionStore.set('lifeBlogList', this.state.blogList);
    sessionStore.set('lifeBlogScrollTop', document.documentElement.scrollTop);
  }
}

export default Find
