/**
 * Created by yuan on 16/8/5.
 */
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppWrapper from './common/AppWrapper';

const Home = (nextState, callback) => {
  require.ensure([], require => {
    callback(null, require('./home/Index'));
  }, 'index');
};

const MainRoute = (
  <Route path="/" component={AppWrapper}>
    <IndexRoute getComponent={Home} />
  </Route>
);

export default MainRoute;
