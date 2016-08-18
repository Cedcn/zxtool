import React, { Component, PropTypes } from 'react';
import { InputNumber, Select } from 'antd';
import S_S_ from './work_size.scss';

const Option = Select.Option;

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
          <Select defaultValue={width} style={{ width: 70 }} onChange={value => actions.setWorkPanelWidth(value)}>
            <Option value="1920">1920</Option>
            <Option value="950">950</Option>
            <Option value="190">190</Option>
          </Select>
          <div className={S_S_.nuit}>px</div>
        </div>
        <div className={S_S_.field}>
          <div className={S_S_.label}>高度：</div>
          <InputNumber min={0} max={2000} style={{ width: 70 }} value={height} onChange={value => actions.setWorkPanelHeight(value)} />
          <div className={S_S_.nuit}>px</div>
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
