import React from 'react';
import { BrowserRouter, NavLink } from 'react-router-dom';
import TabberRouter from '../../router/tabberTouter'
import '../../assets/css/public/tabber.css';

class Tabber extends React.Component {
  render() {
    const { tabberConfig } = this.props;
    return (
      <BrowserRouter >
        <TabberRouter />
        <div className="tabber-wrap">
          <ul className="clearfix">
            {
              tabberConfig.map((item, index) => {
                return <li
                  key={index}
                  style={{
                    width: `${100 / tabberConfig.length}%`
                  }}
                >
                  <NavLink
                    activeClassName='active'
                    to={item.route}>
                    {item.name}
                  </NavLink>
                </li>
              })
            }
          </ul>
        </div>
      </BrowserRouter>
    )
  }
}

export default Tabber