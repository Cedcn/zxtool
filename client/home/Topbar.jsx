import React, { Component, PropTypes } from 'react';
import WorkPanelSize from '../components/topbar/WorkPanelSize';
import S_S_ from './topbar.scss';

class Topbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions, workPanel } = this.props;
    return (
      <div className={S_S_.topbar}>
        <div className={S_S_.left}>
          LOGO
        </div>
        <div className={S_S_.right}>
          <WorkPanelSize actions={actions} {...workPanel} />
        </div>
      </div>
    );
  }
}

Topbar.propTypes = {
  actions: PropTypes.object,
  workPanel: PropTypes.object,
};


export default Topbar;
