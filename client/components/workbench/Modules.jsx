import React, { Component, PropTypes } from 'react';

import S_S_ from './canvases.scss';

import Dragresize from 'dragresize';
// import Module from '../modules/linkblock/Module';
import { Linkblock, Image } from 'modules';

let tempMid = '';
class Modules extends Component {
  constructor(props) {
    super(props);
    const { actions } = props;
    this.change = mid => {
      const { cid } = this.props;
      tempMid = mid;
      return arg => {
        actions.updateModule(cid, tempMid, arg);
      };
    };
    this.check = mid => {
      const { cid } = this.props;

      return () => {
        actions.switchPanel('module');
        if (this.props.checkedMid === mid) return;
        actions.checkModule(cid, mid);
        actions.goBehind(cid, mid);
        tempMid = mid;
      };
    };
  }
  render() {
    const { modulesData, checkedMid, maxLeft, maxTop } = this.props;
    if (!modulesData) return;
    const modulesList = modulesData.map((item, index) => {
      const loadModule = item.template === 'linkblock' ? Linkblock : Image;
      return (
        <Dragresize
          key={index}
          minLeft={0}
          minTop={0}
          maxLeft={maxLeft}
          maxTop={maxTop}
          elmX={item.elmX}
          elmY={item.elmY}
          elmW={item.elmW}
          elmH={item.elmH}
          isChecked={checkedMid === item.mid}
          isResize={item.isResize}
          isRatio={item.isRatio}
          minWidth={item.minWidth}
          minHeight={item.minHeight}
          maxWidth={item.maxWidth}
          maxHeight={item.maxHeight}
          onMouseDown={this.check(item.mid)}
          onMouseMove={this.change(item.mid)}
          onResize={this.change(item.mid)}
        >
          {React.createElement(loadModule, { data: item })}
        </Dragresize>
      );
    });
    return (
      <div className={S_S_.modules}>
        {modulesList}
      </div>
    );
  }
}

Modules.propTypes = {
  actions: PropTypes.object,
  modulesData: PropTypes.array,
  cid: PropTypes.string,
  checkedMid: PropTypes.string,
  maxLeft: PropTypes.number,
  maxTop: PropTypes.number,
  islimitScope: PropTypes.bool,
};


export default Modules;
