import React from 'react';
import { Link, BrowserRouter, Route, Router,NavLink ,Switch } from 'react-router-dom';
import Home from "./views/home"
import Index from "./views/index"
import Find from "./views/find"
import My from "./views/my"

React.Link = Link;
React.BrowserRouter = BrowserRouter;
React.Route = Route;
React.Router = Router;
React.NavLink  = NavLink ;
React.Switch  = Switch ;


const routeConfig = [
    {
        path: '/',
        component: Home,
        indexRoute: { component: Index },
        childRoutes: [
            { path: 'index', component: Index },
            { path: 'find', component: Find },
            { path: 'my', component: My }
        ]
    }
]

export default () => (
    <Router routes={routeConfig} />
)