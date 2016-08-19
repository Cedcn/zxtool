import * as TYPE from '../actions/ActionTypes';

// module reducer
const initialDataState = {
  panel: 'canvas',
};

function editPanel(state = initialDataState, action) {
  const newState = state;
  switch (action.type) {
    case TYPE.SWITCH_PANEL:
      return { ...newState, panel: action.panel };
    default:
      return newState;
  }
}

export default editPanel;
