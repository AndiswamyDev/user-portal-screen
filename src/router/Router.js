import React, { Fragment } from 'react';
import { Switch, Route, Router, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import SignUp from '../components/signup/signup';
import PortalLogin from '../components/login/login';
import Portal from '../components/portal/portal';

const history = createBrowserHistory();

const Routing = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/'  component={PortalLogin} />
        <Route exact={true} path='/signup' component={SignUp} />
        <Route exact={true} path='/user' component={Portal} />
      </Switch>
    </Router>
  );
};

export default Routing;
