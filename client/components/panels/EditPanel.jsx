import React, { Component, PropTypes } from 'react';
import { InputNumber, Input } from 'antd';

import S_S_ from './edit_panel.scss';

class Panel extends Component {
  constructor(props) {
    super(props);
    const { actions } = this.props;
    this.change = name => {
      return value => {
        const { data } = this.props;
        const obj = {};
        obj[name] = value;
        actions.updateData(data.mid, obj);
      };
    };
  }

  render() {
    const { name, parameters } = this.props.structure;
    const data = this.props.data;

    if (!data) {
      return (
        <div>23423</div>
      );
    }
    const getInput = (type, name) => {
      switch (type) {
        case 'number':
          return <InputNumber min={1} max={1000} value={data[name]} onChange={this.change(name)} />;
        case 'text':
          return <Input value={data[name]} />;
      }
    };
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
        <div className={S_S_.name}>
          {name}
          <div>{data.mid}</div>
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
};

export default Panel;
