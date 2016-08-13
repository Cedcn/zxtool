import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import UUID from 'uuid-js';

import S_S_ from './index.scss';
import EditPanel from '../components/panels/EditPanel';
import WorkPanel from '../components/panels/WorkPanel';

import structure from '../components/modules/linkblock/module.json';
import Module from '../components/modules/linkblock/Module';
import Dragresize from '../common/Dragresize';

let tempMid = '';
class Home extends Component {
  constructor(props) {
    super(props);
    const { actions } = props;
    this.state = {
      checkedID: null,
      width: 1000,
      height: 500,
    };
    this.change = mid => {
      tempMid = mid;
      return arg => {
        actions.updateData(tempMid, arg);
      };
    };
    this.check = mid => {
      return () => {
        if (this.state.checkedID === mid) return;
        this.setState({ checkedID: mid });
        actions.goBehind(mid);
        tempMid = mid;
      };
    };
    this.addModule = () => {
      const uuid1 = UUID.create(1).toString();
      actions.createData(uuid1, { elmX: 80, elmY: 40, elmW: 80, elmH: 140 });
      this.setState({ checkedID: uuid1 });
    };
  }

  render() {
    const { canvasData } = this.props;
    const editData = _.find(canvasData, item => { return item.mid === this.state.checkedID; });
    const moduleList = canvasData.map((item, index) => {
      return (
        <Dragresize
          key={index}
          elmX={item.elmX}
          elmY={item.elmY}
          elmW={item.elmW}
          elmH={item.elmH}
          isChecked={this.state.checkedID === item.mid}
          isResize
          isRatio={false}
          minLeft={0}
          minTop={0}
          maxLeft={this.state.width}
          maxTop={this.state.height}
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
    const tempCanvasData = canvasData.slice();
    const sortList = tempCanvasData.reverse().map((item, index) => {
      return (
        <div key={index} onClick={this.check(item.mid)}>
          {item.mid}
        </div>
      );
    });
    return (
      <div className={`page ${S_S_.page_home}`}>
        <WorkPanel {...this.state} onMouseDown={() => this.setState({ checkedID: null })}>
          { moduleList }
        </WorkPanel>
        <a href="javascript:;" onClick={this.addModule}>添加一个热区</a>
        <a href="javascript:;" onClick={() => this.setState({ width: 400 })}>400</a>
        <EditPanel structure={structure} data={editData} actions={this.props.actions} />
        <div>
          <div>组件的顺序:</div>
          {sortList}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  canvasData: PropTypes.array,
  actions: PropTypes.object,
};

module.exports = Home;
