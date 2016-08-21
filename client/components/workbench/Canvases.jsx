import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import S_S_ from './canvases.scss';

import Modules from './Modules';

class Canvases extends Component {
  render() {
    const { canvasesData, actions, maxLeft, maxTop, islimitScope, checkedCid } = this.props;
    const modulesData = _.find(canvasesData, item => item.cid === checkedCid);
    console.log(modulesData);
    const { r, g, b, a } = modulesData.backgroundColor || { r: 255, g: 255, b: 255, a: 1 };
    console.log(r);
    return (
      <div className={S_S_.canvas} style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})` }}>
        <Modules
          actions={actions}
          cid={checkedCid}
          maxLeft={maxLeft}
          maxTop={maxTop}
          islimitScope={islimitScope}
          modulesData={modulesData.modules}
          checkedMid={modulesData.checkedMid}
        />
      </div>
    );
  }
}

Canvases.propTypes = {
  actions: PropTypes.object,
  canvasesData: PropTypes.array,
  maxLeft: PropTypes.number,
  maxTop: PropTypes.number,
  islimitScope: PropTypes.bool,
  checkedCid: PropTypes.string,
};


export default Canvases;
