import * as TYPE from '../actions/ActionTypes';
import _ from 'lodash';

const localCanvasesData = JSON.parse(window.localStorage.getItem('canvasesData'));

const initialCanvasState = [
  {
    cid: '123',
    modules: [],
    checkedMid: '1212',
  },
];

function canvasesData(state = localCanvasesData || initialCanvasState, action) {
  const newState = state.slice();
  switch (action.type) {
    case TYPE.CREATE_CANVAS: {
      newState.push({ modules: [], cid: action.cid });
      break;
    }
    case TYPE.DELETE_CANVAS: {
      const canvasIndex = _.findIndex(newState, item => { return item.cid === action.cid; });
      newState.splice(canvasIndex, 1);
      break;
    }
    case TYPE.UPDATE_MODULE: {
      const canvasIndex = _.findIndex(newState, item => { return item.cid === action.cid; });
      const moduleIndex = _.findIndex(newState[canvasIndex].modules, item => { return item.mid === action.mid; });
      newState[canvasIndex].modules[moduleIndex] = { ...newState[canvasIndex].modules[moduleIndex], ...action.data };
      break;
    }
    case TYPE.CREATE_MODULE: {
      const canvasIndex = _.findIndex(newState, item => { return item.cid === action.cid; });
      newState[canvasIndex].modules.push({ mid: action.mid, ...action.data });
      break;
    }
    case TYPE.DELETE_MODULE: {
      const canvasIndex = _.findIndex(newState, item => { return item.cid === action.cid; });
      const moduleIndex = _.findIndex(newState[canvasIndex].modules, item => { return item.mid === action.mid; });
      newState[canvasIndex].modules.splice(moduleIndex, 1);
      break;
    }
    case TYPE.GOBEHIND: {
      const canvasIndex = _.findIndex(newState, item => { return item.cid === action.cid; });
      const moduleIndex = _.findIndex(newState[canvasIndex].modules, item => { return item.mid === action.mid; });
      if (moduleIndex !== newState[canvasIndex].modules.length - 1) {
        const thunk = newState[canvasIndex].modules.splice(moduleIndex, 1);
        newState[canvasIndex].modules.push(thunk[0]);
      }
      break;
    }
    case TYPE.CHECK_MODULE: {
      const canvasIndex = _.findIndex(newState, item => { return item.cid === action.cid; });
      newState[canvasIndex].checkedMid = action.checkedMid;
      break;
    }
  }
  return newState;
}

export default canvasesData;
