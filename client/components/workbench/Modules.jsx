import React, { Component, PropTypes } from 'react';

import S_S_ from './canvases.scss';

import Dragresize from '../../common/Dragresize';
import Module from '../modules/linkblock/Module';

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
        if (this.props.checkedMid === mid) return;
        actions.checkModule(cid, mid);
        actions.goBehind(cid, mid);
        tempMid = mid;
      };
    };
  }
  render() {
    const { modulesData, checkedMid, maxLeft, maxTop, islimitScope } = this.props;

    const modulesList = modulesData.map((item, index) => {
      return (
        <Dragresize
          key={index}
          elmX={item.elmX}
          elmY={item.elmY}
          elmW={item.elmW}
          elmH={item.elmH}
          isChecked={checkedMid === item.mid}
          isResize
          isRatio
          minLeft={0}
          minTop={0}
          maxLeft={maxLeft}
          maxTop={maxTop}
          islimitScope={islimitScope}
          onMouseDown={this.check(item.mid)}
          onMouseMove={this.change(item.mid)}
          onResizeHandle={this.change(item.mid)}
        >
          <div>
            <div>{item.mid}</div>
            <Module />
          </div>
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
