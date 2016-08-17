import React, { Component, PropTypes } from 'react';

import { getModule } from '../../common/tools';

import S_S_ from './thumb_modules.scss';

class ThumbModules extends Component {
  render() {
    const { data, originalWidth, originalHeight, scaleRatio } = this.props;
    const thumbModulesList = data.map((item, index) => {
      const style = {
        left: item.elmX,
        top: item.elmY,
        width: item.elmW,
        height: item.elmH,
      };
      return (
        <div className={S_S_.thumb_module} key={index} style={style}>
          {React.createElement(getModule(item.template), { data: item })}
        </div>
      );
    });
    const style = {
      width: originalWidth,
      height: originalHeight,
      transformOrigin: 'top left',
      transform: `scale(${scaleRatio})`,
    };
    return (
      <div className={S_S_.thumb_modules} style={style}>
        {thumbModulesList}
      </div>
    );
  }
}

ThumbModules.propTypes = {
  actions: PropTypes.object,
  data: PropTypes.array,
  originalWidth: PropTypes.number,
  originalHeight: PropTypes.number,
  scaleRatio: PropTypes.number,
};


export default ThumbModules;
