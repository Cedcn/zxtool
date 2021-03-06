import * as TYPE from '../actions/ActionTypes';
import _ from 'lodash';
// module reducer
const localWorkPanel = JSON.parse(window.localStorage.getItem('workPanel'));
const initialDataState = {
  islimitScope: true,
  isShowRuler: false,
  isShowStatusBar: true,
  checkedCid: '123',
  width: 950,
  height: 500,
};

function workPanel(state = localWorkPanel || initialDataState, action) {
  const newState = _.cloneDeep(state);
  switch (action.type) {
    case TYPE.LIMITSCOPE:
      return { ...newState, islimitScope: action.isLimit };
    case TYPE.SHOWRULER:
      return { ...newState, isShowRuler: action.isShow };
    case TYPE.SHOWSTATUSBAR:
      return { ...newState, isShowStatusBar: action.isShow };
    case TYPE.WORKPANELWIDTH:
      return { ...newState, width: action.width };
    case TYPE.WORKPANELHEIGHT:
      return { ...newState, height: action.height };
    case TYPE.CHECK_CANVAS: {
      return { ...newState, checkedCid: action.checkedCid };
    }
    case TYPE.RESET_WORKPANEL: {
      return initialDataState;
    }
    default:
      return newState;
  }
}

export default workPanel;
