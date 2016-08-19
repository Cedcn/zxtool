import React, { Component, PropTypes } from 'react';
import UUID from 'uuid-js';

import ThumbModules from './ThumbModules';

import S_S_ from './thumb_canvases.scss';

class ThumbCanvases extends Component {
  constructor(props) {
    super(props);
    const { actions } = props;
    this.switchCanvas = cid => {
      if (this.props.checkedCid === cid) return;
      actions.switchPanel('canvas');
      actions.checkCanvas(cid);
    };

    this.addCanvas = () => {
      const uuid1 = UUID.create(1).toString();
      actions.createCanvas(uuid1);
      actions.checkCanvas(uuid1);
    };
  }
  render() {
    const { actions, canvasesData, originalWidth, originalHeight, checkedCid } = this.props;
    let width = 90;
    let scaleRatio = width / originalWidth;
    let height = originalHeight * scaleRatio;
    if (height > 100) {
      height = 100;
      scaleRatio = height / originalHeight;
      width = originalWidth * scaleRatio;
    }
    const thumbCanvasList = canvasesData.map((item, index) => {
      return (
        <div key={index} className={S_S_.thumb_modules_container}>
          <div className={S_S_.index}>{index + 1}</div>
          <div
            className={`${S_S_.thumb_modules_wrapper} ${checkedCid === item.cid ? S_S_.active : null}`}
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
        </div>
      );
    });
    return (
      <div className={S_S_.thumb_canvases}>
        <a className={S_S_.add_canvas_btn} href="javascript:;" onClick={this.addCanvas}>添加页面</a>
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
