import React, { Component, PropTypes } from 'react';
import ThumbCanvases from '../components/left_sidebar/ThumbCanvases';

import S_S_ from './left_sidebar.scss';

class LeftSidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions, canvasesData, originalWidth, originalHeight } = this.props;
    return (
      <div className={S_S_.left_sidebar}>
        <div className={S_S_.thumb_canvases_wrapper}>
          <ThumbCanvases
            actions={actions}
            canvasesData={canvasesData}
            originalWidth={originalWidth}
            originalHeight={originalHeight}
          />
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
};


export default LeftSidebar;
