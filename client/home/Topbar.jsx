import React, { Component, PropTypes } from 'react';
import WorkPanelSize from '../components/topbar/WorkPanelSize';
import { Button } from 'antd';
import S_S_ from './topbar.scss';
import { generateCode } from '../common/tools';

const ButtonGroup = Button.Group;
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
          <div className={S_S_.logo}>T</div>
          <WorkPanelSize actions={actions} {...workPanel} />
        </div>
        <div className={S_S_.right}>
          <div className={S_S_.generate}>
            <ButtonGroup>
              <Button type="primary" onClick={this.generateCode}>生成代码</Button>
              <Button type="primary" onClick={() => window.open('/preview')}>效果预览</Button>
            </ButtonGroup>
          </div>
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
