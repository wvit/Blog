import React from 'react'
import './toolbar.css'

class Toolbar extends React.Component {
  render() {
    return (
      <div className="toolbar-wrap clearfix">
        <span className="left icon icon-Left"></span>

        <div className="toolbar">
          你好
        </div>
      </div>
    )
  }
}

export default Toolbar