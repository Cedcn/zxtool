/**
 * Created by yuan on 16/8/5.
 */
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppWrapper from './common/AppWrapper';

const Home = (nextState, callback) => {
  require.ensure([], require => {
    callback(null, require('./home/Index'));
  }, 'home');
};


const Control = (nextState, callback) => {
  require.ensure([], require => {
    callback(null, require('./control/Index'));
  }, 'control');
};

const MainRoute = (
  <Route path="/" component={AppWrapper}>
    <IndexRoute getComponent={Home} />
    <Route path="control" getComponent={Control} />
  </Route>
);

export default MainRoute;
