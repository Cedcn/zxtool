import React, { Component, PropTypes } from 'react';
import { SketchPicker } from 'react-color';
import { Popover } from 'antd';

import S_S_ from './color.scss';
class Color extends Component {

  constructor() {
    super();

    this.handleChange = color => {
      if (this.props.onChange) this.props.onChange(color.rgb);
    };
  }

  render() {
    const color = this.props.value || { r: 255, g: 255, b: 255, a: 1 };
    const content = <SketchPicker color={color} onChange={this.handleChange} />;
    const { r, g, b, a } = color;
    return (
      <div className={S_S_.color}>
        <Popover content={content} trigger="click">
          <div className={S_S_.btn_wrapper}>
            <div className={S_S_.btn} style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})` }} />
          </div>
        </Popover>
      </div>
    );
  }
}

Color.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.object,
};

export default Color;
