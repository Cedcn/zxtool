import React, { Component, PropTypes } from 'react';
import Scale from 'common/Scale';
import S_S_ from './work_panel.scss';

class WorkPanel extends Component {
  constructor(props) {
    super(props);
    this.mouseDown = e => {
      e.stopPropagation();
      if (this.props.onMouseDown) this.props.onMouseDown();
    };
  }

  render() {
    const { width, height } = this.props;
    const style = {
      width,
      height,
    };
    return (
      <div className={S_S_.work_panel_wrapper} style={style}>
        <Scale width={width} height={height} />
        <div className={S_S_.work_panel} style={style} onMouseDown={this.mouseDown}>
          { this.props.children }
        </div>
      </div>
    );
  }
}

WorkPanel.propTypes = {
  children: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  onMouseDown: PropTypes.func,
};


export default WorkPanel;
