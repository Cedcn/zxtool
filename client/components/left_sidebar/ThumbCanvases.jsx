import React, { Component, PropTypes } from 'react';
import ThumbModules from './ThumbModules';

import S_S_ from './thumb_canvases.scss';

const width = 100;
class ThumbCanvases extends Component {
  constructor(props) {
    super(props);
    const { actions } = props;
    this.switchCanvas = cid => {
      if (this.props.checkedCid === cid) return;
      actions.checkCanvas(cid);
    };
  }
  render() {
    const { actions, canvasesData, originalWidth, originalHeight, checkedCid } = this.props;
    const scaleRatio = width / originalWidth;
    const height = originalHeight * scaleRatio;
    const thumbCanvasList = canvasesData.map((item, index) => {
      return (
        <div
          className={`${S_S_.thumb_modules_wrapper} ${checkedCid === item.cid ? S_S_.active : null}`}
          key={index}
          style={{ width, height }}
          onClick={() => this.switchCanvas(item.cid)}
        >
          <ThumbModules
            data={item.modules}
            actions={actions}
            originalWidth={originalWidth}
            originalHeight={originalHeight}
            scaleRatio={scaleRatio}
          />
        </div>
      );
    });
    return (
      <div className={S_S_.thumb_canvases}>
        {thumbCanvasList}
      </div>
    );
  }
}

ThumbCanvases.propTypes = {
  actions: PropTypes.object,
  canvasesData: PropTypes.array,
  originalWidth: PropTypes.number,
  originalHeight: PropTypes.number,
  checkedCid: PropTypes.string,
};


export default ThumbCanvases;
