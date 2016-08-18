import React, { Component, PropTypes } from 'react';
import ThumbCanvases from '../components/left_sidebar/ThumbCanvases';
import ModuleList from '../components/modules/ModuleList';
import UUID from 'uuid-js';

import S_S_ from './left_sidebar.scss';

class LeftSidebar extends Component {
  constructor(props) {
    super(props);
    const { actions } = props;
    this.addModule = template => {
      const { checkedCid } = this.props;
      const uuid1 = UUID.create(1).toString();
      actions.createModule(checkedCid, uuid1, { template, elmX: 80, elmY: 40, elmW: 80, elmH: 140 });
      actions.checkModule(checkedCid, uuid1);
    };
    this.addCanvas = () => {
      const uuid1 = UUID.create(1).toString();
      actions.createCanvas(uuid1);
      actions.checkCanvas(uuid1);
    };
  }

  render() {
    const { actions, canvasesData, originalWidth, originalHeight, checkedCid } = this.props;
    return (
      <div className={S_S_.left_sidebar}>
        <div className={S_S_.nav}>
          <a href="javascript:;">页面</a>
        </div>
        <div className={S_S_.thumb_canvases_wrapper}>
          <ThumbCanvases
            actions={actions}
            canvasesData={canvasesData}
            originalWidth={originalWidth}
            originalHeight={originalHeight}
            checkedCid={checkedCid}
          />
          <ModuleList actions={actions} checkedCid={checkedCid} />
        </div>
      </div>
    );
  }
}

LeftSidebar.propTypes = {
  actions: PropTypes.object,
  canvasesData: PropTypes.array,
  originalWidth: PropTypes.number,
  originalHeight: PropTypes.number,
  checkedCid: PropTypes.string,
};


export default LeftSidebar;
