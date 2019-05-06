import React from 'react';
import '../../assets/css/public/HeadTitle.css'

class HeadTitle extends React.Component {
  render() {
    const { titleName } = this.props;
    return (
      <div className="head-title">
        <span className="head-back"></span>
        <p className="head-text">
          {titleName}
        </p>
      </div>
    )
  }
}

export default HeadTitle