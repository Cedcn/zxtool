import React from 'react';
import { combineReducers } from 'redux';

import * as TYPE from '../actions/ActionTypes';

// modal reducer
const initialModalState = {
  type: 'hide',
  component: <div />,
};

function modalSwitch(state = initialModalState, action) {
  switch (action.type) {
    case TYPE.OPEN_MODAL:
      return { ...state, type: 'show', component: action.component };
    case TYPE.CLOSE_MODAL:
      return { ...state, type: 'hide', component: action.component };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  modal: modalSwitch,
});

export default rootReducer;
