import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Index from '../views/index.jsx'
import Find from '../views/find.jsx'
import My from '../views/my.jsx'

function TabberTouter() {
    return (
        <Switch>
            <Route exact path="/" render={() =>
                <Redirect to='/index'></Redirect>}>
            </Route>
            <Route path='/index' component={Index} />
            <Route path='/find' component={Find} />
            <Route path='/my' component={My} />
        </Switch>
    )
}

export default TabberTouter