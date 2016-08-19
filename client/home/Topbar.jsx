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
              <Button className={S_S_.btn} type="ghost" onClick={this.generateCode}>
                <i className="iconfont icon-code" />
                生成代码
              </Button>
              <Button className={S_S_.btn} type="ghost" onClick={() => window.open('/preview')}>
                <i className="iconfont icon-preview" />
                效果预览
              </Button>
            </ButtonGroup>
          </div>
          <a className={S_S_.message} href="javascript:;">
            <i className="iconfont icon-message" />
          </a>
          <a className={S_S_.message} href="javascript:;">
            <i className="iconfont icon-setting" />
          </a>
          <div className={S_S_.outh}>
            <a className={S_S_.sign_btn} href="/login">登陆</a>
            <span>/</span>
            <a className={S_S_.sign_btn} href="/signup">注册</a>
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
