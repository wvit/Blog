import React from 'react'
import { Title } from 'moha-ui'
import axios from '../../axios'
import '../../assets/css/public/blogDetail.css'

class BlogDetail extends React.Component {
  constructor(props) {
    super(props)
    //发送请求获取blog详情
    axios.get(`/app/getBlogDetail?id=${props.match.params.id}`).then(res => {
      if (res.data.code !== 0) return;
      this.setState({
        blogData: res.data.data
      })
    })
    this.state = {
      blogData: {},//blog详细数据
    }
  }
  render() {
    const { title, content, addTime } = this.state.blogData
    return (
      <div >
        <Title titleName='详情' className="mainBgColor" />
        <div className="body">
          <h2 className="title">{title}</h2>
          <p className="clearfix">
            <span className="addTime">
              <i className="icon icon-shijian"></i> {addTime}
            </span>
          </p>
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="content"
          >
          </div>
        </div>

      </div>
    )
  }
}

export default BlogDetail