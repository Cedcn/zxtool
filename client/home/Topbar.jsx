import React, { Component, PropTypes } from 'react';
import WorkPanelSize from '../components/topbar/WorkPanelSize';
import S_S_ from './topbar.scss';
import { getModule } from '../common/tools';

class Topbar extends Component {
  constructor(props) {
    super(props);

    this.generateCode = () => {
      const { workPanel, canvasesData } = this.props;
      console.log(canvasesData);
      const modules = canvasesData[0].modules;
      const moduleList = modules.map(item => {
        const elements = getModule(item.template).getTemplate(item);
        return `<div style="position: absoulte; width: ${item.elmW}px; height: ${item.elmH}px; left: ${item.elmX}px; top: ${item.elmY}px;">${elements}</div>`;
      });
      console.log(`<div style="width: ${workPanel.width}px; height: ${workPanel.height}px">${moduleList.join('')}</div>`);
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
