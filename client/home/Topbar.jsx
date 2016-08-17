import React, { Component, PropTypes } from 'react';
import WorkPanelSize from '../components/topbar/WorkPanelSize';
import S_S_ from './topbar.scss';
import { generateCode } from '../common/tools';

class Topbar extends Component {
  constructor(props) {
    super(props);

    this.generateCode = () => {
      const { workPanel, canvasesData } = this.props;
      const code = generateCode(workPanel, canvasesData);
      console.log(code);
    };
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
          <a href="javascript:;" onClick={this.generateCode}>生成代码</a>
          <a href="/preview" target="_blank">预览</a>
        </div>
      </div>
    );
  }
}

Topbar.propTypes = {
  actions: PropTypes.object,
  workPanel: PropTypes.object,
  canvasesData: PropTypes.array,
};


export default Topbar;
