import React, { Component, PropTypes } from 'react';

import S_S_ from './canvases.scss';

import Modules from './Modules';

class Canvases extends Component {
  render() {
    const { canvasesData, actions, maxLeft, maxTop, islimitScope } = this.props;
    const canvasesList = canvasesData.map((item, index) => {
      if (!item.modules) return false;
      return (
        <div className={S_S_.canvas} key={index}>
          <Modules
            actions={actions}
            cid={item.cid}
            maxLeft={maxLeft}
            maxTop={maxTop}
            islimitScope={islimitScope}
            modulesData={item.modules}
            checkedMid={item.checkedMid}
          />
        </div>
      );
    });
    return (
      <div className={S_S_.canvases}>
        {canvasesList}
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
};


export default Canvases;
