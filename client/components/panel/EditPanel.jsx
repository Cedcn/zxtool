import React, { Component, PropTypes } from 'react';
import { InputNumber, Input } from 'antd';

import S_S_ from './edit_panel.scss';

const value = {
  width: 200,
  height: 200,
};

class Panel extends Component {
  constructor(props) {
    super(props);
    this.getInput = (type, name) => {
      switch (type) {
        case 'number':
          return <InputNumber min={1} max={1000} defaultValue={value[name]} />;
        case 'text':
          return <Input defaultValue={value[name]} />;
      }
    };
  }

  render() {
    const { name, parameters } = this.props.data;
    const categoryList = parameters.map((category, index) => {
      const paramList = category.section.map((param, sub) => {
        return (
          <div className={S_S_.filed} key={sub} style={{ width: param.per || '50%' }}>
            <div className="label">{param.label}:</div>
            {this.getInput(param.type, param.name)}
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
        </div>
        <div>
          {categoryList}
        </div>
      </div>
    );
  }
}


Panel.propTypes = {
  data: PropTypes.object,
};

export default Panel;
