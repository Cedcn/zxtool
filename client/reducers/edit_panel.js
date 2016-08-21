import * as TYPE from '../actions/ActionTypes';
import _ from 'lodash';

// module reducer
const initialDataState = {
  panel: 'canvas',
};

function editPanel(state = initialDataState, action) {
  const newState = _.cloneDeep(state);
  switch (action.type) {
    case TYPE.SWITCH_PANEL:
      return { ...newState, panel: action.panel };
    case TYPE.RESET_EDITPANEL: {
      return initialDataState;
    }
    default:
      return newState;
  }
}

export default editPanel;
