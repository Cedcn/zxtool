import React, { Component, PropTypes } from 'react';
import { InputNumber, Input } from 'antd';

import { Linkblock, Image } from 'modules';

import S_S_ from './edit_panel.scss';

class Panel extends Component {
  constructor(props) {
    super(props);
    const { actions } = this.props;

    this.getStructure = template => {
      switch (template) {
        case 'linkblock':
          return Linkblock.getStructure();
        case 'image':
          return Image.getStructure();
      }
    };

    this.change = name => {
      return e => {
        const { data, cid } = this.props;
        const obj = {};
        obj[name] = Number(e.target.value);
        actions.updateModule(cid, data.mid, obj);
      };
    };
  }

  render() {
    const { data, minLeft, minTop, maxLeft, maxTop, actions } = this.props;
    if (!data) {
      return (
        <div>23423</div>
      );
    }
    console.log(data);
    const structure = this.getStructure(data.template);
    const { name, parameters } = structure;
    const getInput = (type, param) => {
      switch (type) {
        case 'number':
          return <input value={data[param]} onChange={this.change(param)} />;
        case 'text':
          return <input value={data[param]} onChange={this.change(param)} />;
      }
    };

    const baseAttrs = (
      <div>
        <div className={S_S_.section_header}>基础属性</div>
        <div className={S_S_.filed} style={{ width: '50%' }}>
          <div className="label">X位置:</div>
          <input value={data.elmX} onChange={this.change('elmX')} />
        </div>
        <div className={S_S_.filed} style={{ width: '50%' }}>
          <div className="label">Y位置:</div>
          <input value={data.elmY} onChange={this.change('elmY')} />
        </div>
        <div className={S_S_.filed} style={{ width: '50%' }}>
          <div className="label">宽度:</div>
          <input value={data.elmW} onChange={this.change('elmW')} />
        </div>
        <div className={S_S_.filed} style={{ width: '50%' }}>
          <div className="label">高度:</div>
          <input value={data.elmH} onChange={this.change('elmH')} />
        </div>
      </div>
    );

    const categoryList = parameters.map((category, index) => {
      const paramList = category.section.map((param, sub) => {
        return (
          <div className={S_S_.filed} key={sub} style={{ width: param.per || '50%' }}>
            <div className="label">{param.label}:</div>
            {getInput(param.type, param.name)}
          </div>
        );
      });

      return (
        <div className={S_S_.section_wrap} key={index}>
          <div className={S_S_.section_header}>
            {category.title}
          </div>
          <div className={S_S_.section_body}>
            {paramList}
          </div>
        </div>
      );
    });
    return (
      <div className={S_S_.edit_panel}>
        <a href="javascript:;" onClick={() => actions.delete_module('123', data.mid)}>删除</a>
        <div className={S_S_.name}>
          {name}
          <div>{data.mid}</div>
        </div>
        <div className={S_S_.baseAttrs}>
          {baseAttrs}
        </div>
        <div>
          {categoryList}
        </div>
      </div>
    );
  }
}


Panel.propTypes = {
  structure: PropTypes.object,
  data: PropTypes.object,
  actions: PropTypes.object,
  minLeft: PropTypes.number,
  minTop: PropTypes.number,
  maxLeft: PropTypes.number,
  maxTop: PropTypes.number,
  cid: PropTypes.string,
};

export default Panel;
