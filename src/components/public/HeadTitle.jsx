import React from 'react';
import { createBrowserHistory } from 'history'
import '../../assets/css/public/HeadTitle.css'

class HeadTitle extends React.Component {
  render() {
    const { titleName } = this.props;
    const history = createBrowserHistory();
    return (
      <div className="head-title">
        <span className="head-back" onClick={() => { history.goBack() }}></span>
        <p className="head-text">
          {titleName}
        </p>
      </div>
    )
  }
}

export default HeadTitle