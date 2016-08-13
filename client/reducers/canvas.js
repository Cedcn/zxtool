import * as TYPE from '../actions/ActionTypes';
import _ from 'lodash';
// module reducer
const initialDataState = [
  { mid: '123', elmX: 10, elmY: 10, elmW: 200, elmH: 100 },
];

function handleData(state = initialDataState, action) {
  const newState = state.slice();

  switch (action.type) {
    case TYPE.UPDATE_DATA: {
      const index = _.findIndex(newState, item => { return item.mid === action.mid; });
      newState[index] = { ...newState[index], ...action.data };
      break;
    }
    case TYPE.CREATE_DATA: {
      newState.push({ mid: action.mid, ...action.data });
      break;
    }
    case TYPE.GOBEHIND: {
      const index = _.findIndex(newState, item => { return item.mid === action.mid; });
      if (index !== newState.length - 1) {
        const thunk = newState.splice(index, 1);
        newState.push(thunk[0]);
      }
      break;
    }
  }

  return newState;
}

export default handleData;
