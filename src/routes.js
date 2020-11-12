import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './pages/login';
import Home from './pages/home';
import Create from './pages/create';
import Edit from './pages/edit';
import Profile from './pages/profile';

function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/edit/:id" component={Edit} />
                <Route path="/profile/:id" component={Profile} />
                <Route path="/create" component={Create} />
                <Route path="/" component={Login} />
            </Switch>
        </BrowserRouter>
    );
}
export default Routes;