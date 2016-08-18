import React, { Component, PropTypes } from 'react';
import ThumbCanvases from '../components/left_sidebar/ThumbCanvases';
import ModuleList from '../components/modules/ModuleList';
import UUID from 'uuid-js';

import S_S_ from './left_sidebar.scss';

class LeftSidebar extends Component {
  constructor(props) {
    super(props);
    const { actions } = props;
    this.state = {
      show: 'modules',
    };
    this.addModule = template => {
      const { checkedCid } = this.props;
      const uuid1 = UUID.create(1).toString();
      actions.createModule(checkedCid, uuid1, { template, elmX: 80, elmY: 40, elmW: 80, elmH: 140 });
      actions.checkModule(checkedCid, uuid1);
    };
    this.addCanvas = () => {
      const uuid1 = UUID.create(1).toString();
      actions.createCanvas(uuid1);
      actions.checkCanvas(uuid1);
    };
  }

  render() {
    const { actions, canvasesData, originalWidth, originalHeight, checkedCid } = this.props;
    return (
      <div className={S_S_.left_sidebar}>
        <div className={S_S_.nav}>
          <a
            className={this.state.show === 'canvases' ? S_S_.active : null}
            href="javascript:;"
            onClick={() => this.setState({ show: 'canvases' })}
          >
            <i className={`${S_S_.icon} iconfont icon-pages`} />
            <div>页面</div>
          </a>
          <a
            className={this.state.show === 'modules' ? S_S_.active : null}
            href="javascript:;"
            onClick={() => this.setState({ show: 'modules' })}
          >
            <i className={`${S_S_.icon} iconfont icon-module`} />
            <div>工具</div>
          </a>
          <a
            className={this.state.show === 'fodder' ? S_S_.active : null}
            href="javascript:;"
            onClick={() => this.setState({ show: 'modules' })}
          >
            <i className={`${S_S_.icon} iconfont icon-fodder`} />
            <div>素材</div>
          </a>
          <a
            className={this.state.show === 'template' ? S_S_.active : null}
            href="javascript:;"
            onClick={() => this.setState({ show: 'modules' })}
          >
            <i className={`${S_S_.icon} iconfont icon-template`} />
            <div>模板</div>
          </a>
        </div>
        <div className={S_S_.thumb_canvases_wrapper}>
          {
            this.state.show === 'canvases' ?
              <ThumbCanvases
                actions={actions}
                canvasesData={canvasesData}
                originalWidth={originalWidth}
                originalHeight={originalHeight}
                checkedCid={checkedCid}
              /> : null
          }
          {this.state.show === 'modules' ? <ModuleList actions={actions} checkedCid={checkedCid} /> : null}
        </div>
      </div>
    );
  }
}

LeftSidebar.propTypes = {
  actions: PropTypes.object,
  canvasesData: PropTypes.array,
  originalWidth: PropTypes.number,
  originalHeight: PropTypes.number,
  checkedCid: PropTypes.string,
};


export default LeftSidebar;
