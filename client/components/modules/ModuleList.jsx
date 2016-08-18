import React, { Component, PropTypes } from 'react';
import UUID from 'uuid-js';
import S_S_ from './module_list.scss';

import { Linkblock, Image } from 'modules';

class ModuleList extends Component {
  constructor(props) {
    super(props);
    const { actions } = props;
    this.addModule = template => {
      const { checkedCid } = this.props;
      const uuid1 = UUID.create(1).toString();
      const structure = this.getStructure(template);
      const {
        elmX = 10,
        elmW = 100,
        elmY = 10,
        elmH = 100,
        isResize = true,
        isRatio = false,
        minWidth = 10,
        minHeight = 10,
        maxWidth = null,
        maxHeight = null,
        parameters,
      } = structure;

      const paramsObj = {};
      parameters.forEach(param => {
        param.section.forEach(item => {
          paramsObj[item.name] = item.value;
        });
      });

      actions.createModule(checkedCid, uuid1, { template, elmX, elmY, elmW, elmH, isResize, isRatio, minWidth, minHeight, maxWidth, maxHeight, ...paramsObj });
      actions.checkModule(checkedCid, uuid1);
    };

    this.getStructure = template => {
      switch (template) {
        case 'linkblock':
          return Linkblock.getStructure();
        case 'image':
          return Image.getStructure();
      }
    };
  }

  render() {
    return (
      <div className={S_S_.module_list}>
        <a href="javascript:;" onClick={() => this.addModule('linkblock')}>
          <i className={`${S_S_.icon} iconfont icon-link`} />
          热点
        </a>
        <a href="javascript:;" onClick={() => this.addModule('image')}>
          <i className={`${S_S_.icon} iconfont icon-picture`} />
          图片
        </a>
        <a href="javascript:;" onClick={() => this.addModule('image')}>
          <i className={`${S_S_.icon} iconfont icon-text`} />
          文本
        </a>
        <a href="javascript:;" onClick={() => this.addModule('image')}>
          <i className={`${S_S_.icon} iconfont icon-video`} />
          视频
        </a>
        <a href="javascript:;" onClick={() => this.addModule('image')}>
          <i className={`${S_S_.icon} iconfont icon-wangwang`} />
          旺旺
        </a>
        <a href="javascript:;" onClick={() => this.addModule('image')}>
          <i className={`${S_S_.icon} iconfont icon-wangwang`} />
          旺旺群
        </a>
        <a href="javascript:;" onClick={() => this.addModule('image')}>
          <i className={`${S_S_.icon} iconfont icon-clock`} />
          倒计时
        </a>
        <a href="javascript:;" onClick={() => this.addModule('image')}>
          <i className={`${S_S_.icon} iconfont icon-collect`} />
          收藏
        </a>
        <a href="javascript:;" onClick={() => this.addModule('image')}>
          <i className={`${S_S_.icon} iconfont icon-qrcode`} />
          二维码
        </a>
        <a href="javascript:;" onClick={() => this.addModule('image')}>
          <i className={`${S_S_.icon} iconfont icon-like`} />
          关注
        </a>
        <a href="javascript:;" onClick={() => this.addModule('image')}>
          <i className={`${S_S_.icon} iconfont icon-shopcar`} />
          购物车
        </a>
        <a href="javascript:;" onClick={() => this.addModule('image')}>
          <i className={`${S_S_.icon} iconfont icon-like`} />
          喜欢
        </a>
        <a href="javascript:;" onClick={() => this.addModule('image')}>
          <i className={`${S_S_.icon} iconfont icon-search`} />
          搜索框
        </a>
      </div>
    );
  }
}

ModuleList.propTypes = {
  actions: PropTypes.object,
  checkedCid: PropTypes.string,
};


export default ModuleList;
