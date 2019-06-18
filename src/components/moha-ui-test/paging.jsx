import React from 'react'
import { query, axios } from '../../utils'

class Paging extends React.Component {
  constructor(props) {
    super(props);
    this.page =  1;//页码
    this.reqOnOff = true;//是否允许请求
    this.setReqData();//设置请求的参数
  }
  render() {
    const { children } = this.props;
    return (
      <div className="paging-wrap">
        {children}
      </div>
    )
  }
  //组件初始化完成
  componentDidMount() {
    this.setReqData();
    window.onscroll = () => {
      const scrollTop = this.props.clientHeight + document.documentElement.scrollTop;
      if (scrollTop >= this.pagingWrapHeight) {
        this.page = this.page + 1;
        this.getPageData();
      }
    }
  }
  //设置请求的参数
  setReqData() {
    const { data } = this.props;
    this.reqData = '';
    for (let key in data) {
      this.reqData += `&${key}=${data[key]}`
    }
    this.getPageData();
  }
  //获取blog列表
  getPageData() {
    if (!this.reqOnOff) return;
    this.reqOnOff = false;
    axios.get(`/app/getBlogs?page=${this.page}&pageSize=10${this.reqData}`).then(res => {
      this.props.onGetPageData(res.data);
      this.setPagingWrapHeight();
      if (res.data.data.list.length === 0) window.onscroll = null;
    });
  }
  //设置paging-wrap的高
  setPagingWrapHeight() {
    this.pagingWrapHeight = query('.paging-wrap')[0].offsetHeight;
    this.reqOnOff = true;
  }
  //组件卸载移除事件
  componentWillUnmount() {
    window.onscroll = null;
  }
}

export default Paging