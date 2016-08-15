import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import UUID from 'uuid-js';

import S_S_ from './index.scss';
import Topbar from './Topbar';
import LeftSidebar from './LeftSidebar';

import Canvases from '../components/workbench/Canvases';

import EditPanel from '../components/panels/EditPanel';
import WorkPanel from '../components/panels/WorkPanel';

import structure from '../components/modules/linkblock/module.json';

class Home extends Component {
  constructor(props) {
    super(props);
    const { actions } = props;
    this.addModule = () => {
      const { workPanel } = this.props;
      const uuid1 = UUID.create(1).toString();
      console.log(workPanel.checkedCid);
      actions.createModule(workPanel.checkedCid, uuid1, { elmX: 80, elmY: 40, elmW: 80, elmH: 140 });
      actions.checkModule(workPanel.checkedCid, uuid1);
    };
    this.addCanvas = () => {
      const uuid1 = UUID.create(1).toString();
      actions.createCanvas(uuid1);
      actions.checkCanvas(uuid1);
    };
  }

  render() {
    const { canvasesData, actions, workPanel } = this.props;
    console.log(workPanel.checkedCid);
    const canvasDada = _.find(canvasesData, item => { return item.cid === workPanel.checkedCid; });
    const editData = _.find(canvasDada.modules, item => { return item.mid === canvasDada.checkedMid; });

    return (
      <div className={`page ${S_S_.page_home}`}>
        <Topbar actions={actions} workPanel={workPanel} />
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
        <div style={{ paddingLeft: 200 }}>
          <a href="javascript:;" onClick={this.addModule}>添加一个热区</a>
          <a href="javascript:;" onClick={this.addCanvas}>添加一个画布</a>
        </div>
        <EditPanel
          structure={structure}
          minLeft={0}
          minTop={0}
          data={editData}
          cid={workPanel.checkedCid}
          actions={this.props.actions}
        />
      </div>
    );
  }
}

Home.propTypes = {
  canvasesData: PropTypes.array,
  workPanel: PropTypes.object,
  actions: PropTypes.object,
};

module.exports = Home;
