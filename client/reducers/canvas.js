import * as TYPE from '../actions/ActionTypes';
import _ from 'lodash';
// module reducer
const initialDataState = [];

function handleData(state = initialDataState, action) {
  switch (action.type) {
    case TYPE.UPDATE_DATA: {
      const newState = state.slice();
      const index = _.findIndex(newState, item => { return item.mid === action.mid; });
      newState[index] = { ...newState[index], ...action.data };
      return newState;
    }
    case TYPE.CREATE_DATA: {
      const newState = state.slice();
      newState.push({ mid: action.mid, ...action.data });
      return newState;
    }
    default:
      return state;
  }
}

export default handleData;
