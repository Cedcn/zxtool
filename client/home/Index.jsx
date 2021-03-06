import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import UUID from 'uuid-js';

import S_S_ from './index.scss';
import Topbar from './Topbar';
import LeftSidebar from './LeftSidebar';

import Canvases from './components/workbench/Canvases';
import EditPanel from './components/edit_panel/Index';

import WorkPanel from './components/panels/WorkPanel';

class Home extends Component {
  constructor(props) {
    super(props);
    const { actions } = props;
    this.addModule = template => {
      const { workPanel } = this.props;
      const uuid1 = UUID.create(1).toString();
      actions.createModule(workPanel.checkedCid, uuid1, { template, elmX: 80, elmY: 40, elmW: 80, elmH: 140 });
      actions.checkModule(workPanel.checkedCid, uuid1);
    };
    this.addCanvas = () => {
      const uuid1 = UUID.create(1).toString();
      actions.createCanvas(uuid1);
      actions.checkCanvas(uuid1);
    };
  }

  render() {
    const { canvasesData, actions, workPanel, editPanel } = this.props;
    const canvasDada = _.find(canvasesData, item => { return item.cid === workPanel.checkedCid; });

    return (
      <div className={`page ${S_S_.page_home}`}>
        <Topbar actions={actions} workPanel={workPanel} canvasesData={canvasesData} />
        <LeftSidebar
          actions={actions}
          canvasesData={canvasesData}
          originalWidth={workPanel.width}
          originalHeight={workPanel.height}
          checkedCid={workPanel.checkedCid}
        />
        <WorkPanel
          {...workPanel}
          onMouseDown={() => {
            actions.checkModule(workPanel.checkedCid, null);
            actions.switchPanel('canvas');
          }}
        >
          <Canvases
            canvasesData={canvasesData}
            actions={actions}
            maxLeft={workPanel.width}
            maxTop={workPanel.height}
            islimitScope={workPanel.islimitScope}
            checkedCid={workPanel.checkedCid}
          />
        </WorkPanel>
        <EditPanel
          canvasDada={canvasDada}
          panel={editPanel.panel}
          cid={workPanel.checkedCid}
          actions={actions}
        />
      </div>
    );
  }
}

Home.propTypes = {
  canvasesData: PropTypes.array,
  workPanel: PropTypes.object,
  actions: PropTypes.object,
  editPanel: PropTypes.object,
};

module.exports = Home;
