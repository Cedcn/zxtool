import React, { Component, PropTypes } from 'react';
import { InputNumber, Input, Button, Select, Switch, Icon } from 'antd';
import Color from '../../common/Color';
import S_S_ from './index.scss';

class EditCanvasPanel extends Component {
  change(name) {
    return e => {
      this.updateValue(name, e.target.value);
    };
  }

  changeInputNumber(name) {
    return value => {
      this.updateValue(name, value);
    };
  }

  updateValue(name, value) {
    const { cid, actions } = this.props;
    const obj = {};
    obj[name] = value;
    actions.updateCanvas(cid, obj);
  }

  render() {
    const { data } = this.props;
    return (
      <div className={S_S_.edit_canvas_panel}>
        <h4 className={S_S_.section_header}>基础属性</h4>
        <div className={S_S_.group}>
          <div className={S_S_.filed} style={{ width: '100%' }}>
            <div className="label">背景颜色:</div>
            <Color value={data.backgroundColor} onChange={this.changeInputNumber('backgroundColor')} />
          </div>
          <div className={S_S_.filed} style={{ width: '100%' }}>
            <div className="label">背景图片:</div>
            <Input value={data.backgroundImage} onChange={this.change('backgroundImage')} />
          </div>
          <div className={S_S_.filed} style={{ width: '100%' }}>
            <div className="label">是否重复:</div>
            <Switch
              checked={data.backgroundRepeat}
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="cross" />}
              onChange={this.changeInputNumber('backgroundRepeat')}
            />
          </div>
        </div>
      </div>
    );
  }
}


EditCanvasPanel.propTypes = {
  data: PropTypes.object,
  actions: PropTypes.object,
  cid: PropTypes.string,
};

export default EditCanvasPanel;
