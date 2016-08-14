import React, { Component, PropTypes } from 'react';
import { InputNumber } from 'antd';
import S_S_ from './work_size.scss';

class WorkPanelSize extends Component {
  render() {
    const { actions, width, height } = this.props;
    return (
      <div className={S_S_.work_panel_size}>
        <h4 className={S_S_.field}>
          主尺寸:
        </h4>
        <div className={S_S_.field}>
          <div className={S_S_.label}>宽度：</div>
          <InputNumber min={0} max={2000} value={width} onChange={value => actions.setWorkPanelWidth(value)} />
        </div>
        <div className={S_S_.field}>
          <div className={S_S_.label}>高度：</div>
          <InputNumber min={0} max={2000} value={height} onChange={value => actions.setWorkPanelHeight(value)} />
        </div>
      </div>
    );
  }
}

WorkPanelSize.propTypes = {
  actions: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
};


export default WorkPanelSize;
