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
      <div className={S_S_.module_list_wrapper}>
        <div className={S_S_.title}>
          页面元素
        </div>
        <div className={S_S_.module_list}>
          <div className={S_S_.item}>
            <a href="javascript:;" onClick={() => this.addModule('linkblock')}>热点层</a>
          </div>
          <div className={S_S_.item}>
            <a href="javascript:;" onClick={() => this.addModule('image')}>图片层</a>
          </div>
        </div>
      </div>
    );
  }
}

ModuleList.propTypes = {
  actions: PropTypes.object,
  checkedCid: PropTypes.string,
};


export default ModuleList;
