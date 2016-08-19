import React, { Component, PropTypes } from 'react';
import EditModulePanel from './EditModulePanel';
import EditCanvasPanel from './EditCanvasPanel';
import _ from 'lodash';

import S_S_ from './index.scss';

class EditPanel extends Component {
  render() {
    const { canvasDada, cid, actions, panel } = this.props;
    const editData = _.find(canvasDada.modules, item => { return item.mid === canvasDada.checkedMid; });

    return (
      <div className={S_S_.edit_panel}>
        <div className={S_S_.switch_panel}>
          <a
            className={`${S_S_.item} ${panel === 'module' ? 'active' : ''} ${!editData ? 'disable' : ''}`}
            onClick={() => {
              if (!editData) return;
              actions.switchPanel('module');
            }}
          >
            模块信息
          </a>
          <a
            className={`${S_S_.item} ${panel === 'canvas' ? 'active' : ''}`}
            onClick={() => actions.switchPanel('canvas')}
          >
            页面信息
          </a>
        </div>
        {
          panel === 'module' ? (
            <EditModulePanel
              minLeft={0}
              minTop={0}
              data={editData}
              cid={cid}
              actions={actions}
            />
          ) : (
            <EditCanvasPanel
              data={canvasDada}
              cid={cid}
              actions={actions}
            />
          )
        }
      </div>
    );
  }
}


EditPanel.propTypes = {
  canvasDada: PropTypes.object,
  actions: PropTypes.object,
  cid: PropTypes.string,
  panel: PropTypes.string,
};

export default EditPanel;
