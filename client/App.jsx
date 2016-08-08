import React from 'react';
import { render } from 'react-dom';

import { compose, createStore, applyMiddleware, bindActionCreators } from 'redux';
import thunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';
import createLogger from 'redux-logger';
import { Router, hashHistory } from 'react-router';

import reducers from './reducers';

import * as ActionCreates from './actions/ActionCreates';
import routes from './route';


const middlewares = process.env.NODE_ENV === 'production' ?
  applyMiddleware(thunk) : applyMiddleware(thunk, createLogger());


const store = compose(
  middlewares,
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)(reducers);


const select = state => ({
  modal: state.modal,
});

const createElement = (Component, props) => {
  const NewComponent = connect(select, (dispatch) => (
  { actions: bindActionCreators(ActionCreates, dispatch) }
  ))(Component);

  return <NewComponent {...props} />;
};

render(
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} createElement={createElement} />
  </Provider>,
  window.document.getElementById('app')
);