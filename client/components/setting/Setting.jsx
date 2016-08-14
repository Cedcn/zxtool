import React, { Component, PropTypes } from 'react';
import { InputNumber } from 'antd';
import S_S_ from './setting.scss';

class Setting extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions } = this.props;
    return (
      <div className={S_S_.setting}>
        <a href="javascript:;" onClick={() => actions.showRuler(true)}>显示标尺</a>
        <a href="javascript:;" onClick={() => actions.showStatusBar(true)}>显示状态栏</a>
        <a href="javascript:;" onClick={() => actions.limitScope(true)}>限制范围</a>
        <a href="javascript:;" onClick={() => actions.limitScope(false)}>不限制范围</a>
        <a href="javascript:;" onClick={() => actions.showRuler(false)}>隐藏标尺</a>
        <a href="javascript:;" onClick={() => actions.showStatusBar(false)}>隐藏状态栏</a>
        <div>
          <h4>宽度：</h4>
          <InputNumber />
          <h4>高度：</h4>
          <InputNumber />
        </div>
      </div>
    );
  }
}

Setting.propTypes = {
  children: PropTypes.array,
  actions: PropTypes.object,
};


export default Setting;
