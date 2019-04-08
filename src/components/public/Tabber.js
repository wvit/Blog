import React, { BrowserRouter, Switch, Route, NavLink } from 'react';
import homeRoute from '../../router/home';
import '../../assets/css/public/Tabber.css';

class Tabber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //tabber配置
      tabberConfig: [
        { name: '首页', route: '/index' },
        { name: '发现', route: '/find' },
        { name: '我的', route: '/my' }
      ],
    }
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {homeRoute.map((item, index) => {
            return (
              <Route
                key={index}
                path={item.path}
                exact={item.exact}
                component={item.component}
              />
            )
          })}
        </Switch>
        <div className="tabber-wrap">
          <ul className="clearfix">
            {
              this.state.tabberConfig.map((item, index) => {
                return <li
                  key={index}
                  style={{
                    width: `${100 / this.state.tabberConfig.length}%`
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