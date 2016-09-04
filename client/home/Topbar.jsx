import React, { Component, PropTypes } from 'react';
import WorkPanelSize from '../components/topbar/WorkPanelSize';
import { Button, Modal } from 'antd';
import S_S_ from './topbar.scss';
import generateCode from '../common/generateCode';
import Setting from '../components/setting/Setting';

const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
class Topbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
    this.generateCode = () => {
      const { workPanel, canvasesData } = this.props;
      const code = generateCode(workPanel, canvasesData);
      console.log(code);
    };

    this.reset = () => {
      const { actions } = this.props;
      confirm({
        title: '您是否确认要恢复默认设置',
        content: '恢复默认会清除你现在的编辑',
        onOk() {
          actions.reset_workpanel();
          actions.reset_editpanel();
          actions.reset_canvas();
        },
      });
    };

    this.showModal = () => {
      this.setState({
        visible: true,
      });
    };
    this.handleOk = () => {
      this.setState({
        visible: false,
      });
    };
    this.handleCancel = () => {
      this.setState({
        visible: false,
      });
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
              <Button className={S_S_.btn} type="ghost" onClick={this.reset}>
                <i className="iconfont icon-reset" />
                恢复默认
              </Button>
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
          <a className={S_S_.setting} href="javascript:;" onClick={this.showModal}>
            <i className="iconfont icon-setting" />
          </a>
          <Modal
            title="Setting"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
          >
            <Setting />
          </Modal>
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
