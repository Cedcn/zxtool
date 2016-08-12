import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import UUID from 'uuid-js';

import S_S_ from './index.scss';
import EditPanel from '../components/panels/EditPanel';
import WorkPanel from '../components/panels/WorkPanel';

import structure from '../components/modules/linkblock/module.json';
import Module from '../components/modules/linkblock/Module';
import Dragresize from '../common/Dragresize';

class Home extends Component {
  constructor(props) {
    super(props);
    const { actions } = props;
    this.state = {
      checkedID: '',
      width: 1000,
      height: 500,
    };
    this.change = mid => {
      return arg => {
        actions.updateData(mid, arg);
      };
    };
    this.check = mid => {
      return () => {
        this.setState({ checkedID: mid });
      };
    };
    this.addModule = () => {
      const uuid1 = UUID.create(1).toString();
      actions.createData(uuid1, { elmX: 80, elmY: 40, elmW: 80, elmH: 40 });
      this.setState({ checkedID: uuid1 });
    };
  }

  render() {
    const { canvasData } = this.props;
    const editData = _.find(canvasData, item => { return item.mid === this.state.checkedID; });
    console.log(this.state.checkedID);
    const moduleList = canvasData.map((item, index) => {
      return (
        <Dragresize
          {...item}
          key={index}
          isChecked={this.state.checkedID === item.mid}
          isResize
          isRatio={false}
          onMove={this.change(item.mid)}
          onResize={this.change(item.mid)}
          onMouseDown={this.check(item.mid)}
          maxLeft={this.state.width}
          maxTop={this.state.height}
        >
          <Module />
        </Dragresize>
      );
    });

    return (
      <div className={`page ${S_S_.page_home}`}>
        <WorkPanel {...this.state}>
          { moduleList }
        </WorkPanel>
        <a href="javascript:;" onClick={this.addModule}>添加一个热区</a>
        <a href="javascript:;" onClick={() => this.setState({ width: 400 })}>400</a>
        <EditPanel structure={structure} data={editData} actions={this.props.actions} />
      </div>
    );
  }
}

Home.propTypes = {
  canvasData: PropTypes.array,
  actions: PropTypes.object,
};

module.exports = Home;
