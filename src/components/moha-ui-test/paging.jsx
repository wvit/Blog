import React from 'react'
import { query, axios } from '../../utils'

class Paging extends React.Component {
  constructor(props) {
    super(props);
    const { pageKey, page = 1 } = props;
    this.data = {};//额外请求数据
    this[pageKey] = page;//页码
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
    this.setPagingWrapHeight();
    this.setReqData();
    const { pageKey } = this.props;
    window.onscroll = () => {
      const scrollTop = this.props.clientHeight + document.documentElement.scrollTop;
      if (scrollTop >= this.pagingWrapHeight) {
        this[pageKey] = this[pageKey] + 1;
        this.getPageData();
      }
    }
  }
  //监听props变化
  componentWillReceiveProps(nextProps) {
    this.data = nextProps.data;
    //劫持 this.data 这个对象
    this.observer(this.data)
  }
  //给对象所有属性设置数据劫持  默认为空对象
  observer(obj = {}) {
    //遍历对象的所有属性
    Object.keys(obj).forEach(item => {
      this.defineReactive(obj, item, obj[item])
    })
  }
  //数据劫持 
  defineReactive(obj, key, value) {
    const { pageKey } = this.props;
    Object.defineProperty(obj, key, {
      get: () => {
        return value;
      },
      set: newValue => {
        value = newValue;
        this[pageKey] = 1;
        this.setReqData();
      }
    })
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
    const { pageKey } = this.props;
    this.reqOnOff = false;
    axios.get(`/app/getBlogs?${pageKey}=${this[pageKey]}${this.reqData}`).then(res => {
      this.props.onGetPageData(res.data);
      this.setPagingWrapHeight();
      this.reqOnOff = true;
      if (res.data.data.list.length === 0) this[pageKey]--;
    });
  }
  //设置paging-wrap的高
  setPagingWrapHeight() {
    this.pagingWrapHeight = query('.paging-wrap')[0].offsetHeight;
  }
  //组件卸载移除事件
  componentWillUnmount() {
    const { pageKey } = this.props;
    this.props.onLeave({ [pageKey]: this[pageKey] });
    window.onscroll = null;
  }
}

export default Paging