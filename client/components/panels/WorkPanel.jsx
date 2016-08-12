import React, { Component, PropTypes } from 'react';

import S_S_ from './work_panel.scss';

class WorkPanel extends Component {
  render() {
    const { width, height } = this.props;
    return (
      <div className={S_S_.work_panel} style={{ width, height }}>
        { this.props.children }
      </div>
    );
  }
}

WorkPanel.propTypes = {
  children: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
};


export default WorkPanel;
