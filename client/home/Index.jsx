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
      const uuid1 = UUID.create(1).toString();
      actions.createModule('123', uuid1, { elmX: 80, elmY: 40, elmW: 80, elmH: 140 });
      actions.checkModule('123', uuid1);
    };
  }

  render() {
    const { canvasesData, actions, workPanel } = this.props;
    const canvasDada = _.find(canvasesData, item => { return item.cid === '123'; });
    const editData = _.find(canvasDada.modules, item => { return item.mid === canvasDada.checkedMid; });

    return (
      <div className={`page ${S_S_.page_home}`}>
        <Topbar actions={actions} workPanel={workPanel} />
        <LeftSidebar
          actions={actions}
          canvasesData={canvasesData}
          originalWidth={workPanel.width}
          originalHeight={workPanel.height}
        />
        <WorkPanel
          {...workPanel}
          onMouseDown={() => actions.checkModule('123', null)}
        >
          <Canvases
            canvasesData={canvasesData}
            actions={actions}
            maxLeft={workPanel.width}
            maxTop={workPanel.height}
            islimitScope={workPanel.islimitScope}
          />
          <a href="javascript:;" onClick={this.addModule}>添加一个热区</a>
        </WorkPanel>
        <EditPanel
          structure={structure}
          minLeft={0}
          minTop={0}
          data={editData}
          cid="123"
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
