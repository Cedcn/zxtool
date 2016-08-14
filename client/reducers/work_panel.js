import * as TYPE from '../actions/ActionTypes';
// module reducer
const initialDataState = {
  islimitScope: true,
  isShowRuler: false,
  isShowStatusBar: true,
  width: 950,
  height: 300,
};

function workPanel(state = initialDataState, action) {
  const newState = state;
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
    default:
      return newState;
  }
}

export default workPanel;
