import React, { Component, PropTypes } from 'react';
import ThumbModules from './ThumbModules';

import S_S_ from './thumb_canvases.scss';

const width = 100;
class ThumbCanvases extends Component {
  render() {
    const { actions, canvasesData, originalWidth, originalHeight } = this.props;
    const scaleRatio = width / originalWidth;
    const height = originalHeight * scaleRatio;
    const thumbCanvasList = canvasesData.map((item, index) => {
      return (
        <a href="javascript:;" className={S_S_.thumb_modules_wrapper} key={index} style={{ width, height }}>
          <ThumbModules
            data={item.modules}
            actions={actions}
            originalWidth={originalWidth}
            originalHeight={originalHeight}
            scaleRatio={scaleRatio}
          />
        </a>
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
};


export default ThumbCanvases;
