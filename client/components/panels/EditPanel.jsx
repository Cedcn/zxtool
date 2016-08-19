import React, { Component, PropTypes } from 'react';
import { InputNumber, Input, Button, Select, Switch, Icon } from 'antd';

import { getModule } from '../../common/tools';
import S_S_ from './edit_panel.scss';

const Option = Select.Option;

class Panel extends Component {
  change(name) {
    return e => {
      this.updateValue(name, e.target.value);
    };
  }

  changeInputNumber(name) {
    return value => {
      this.updateValue(name, value);
    };
  }

  updateValue(name, value) {
    const { data, cid, actions } = this.props;
    const obj = {};
    obj[name] = value;
    actions.updateModule(cid, data.mid, obj);
  }

  render() {
    const { data, cid, minLeft, minTop, maxLeft, maxTop, actions } = this.props;
    if (!data) {
      return (
        <div>23423</div>
      );
    }
    const structure = getModule(data.template).getStructure();
    const { name, parameters } = structure;
    const getInput = (param) => {
      switch (param.type) {
        case 'number':
          return <InputNumber value={data[param.name]} onChange={this.changeInputNumber(param.name)} />;
        case 'text':
          return <Input value={data[param.name]} onChange={this.change(param.name)} />;
        case 'select': {
          let defaultValue;
          const optionsList = param.options.map((item) => {
            if (item.checked) defaultValue = item.value;
            return <Option key={item.value}>{item.label}</Option>;
          });
          console.log(optionsList);

          return (
            <Select defaultValue={defaultValue} onChange={this.changeInputNumber(param.name)} style={{ width: '100%' }}>
              {optionsList}
            </Select>
          );
        }
        case 'switch': {
          return (
            <Switch
              checked={data[param.name]}
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="cross" />}
              onChange={this.changeInputNumber(param.name)}
            />
          );
        }
      }
    };

    const baseAttrs = (
      <div>
        <h4 className={S_S_.section_header}>基础属性</h4>
        <div className={S_S_.group}>
          <div className={S_S_.filed} style={{ width: '50%' }}>
            <div className="label">X轴:</div>
            <InputNumber value={data.elmX} onChange={this.changeInputNumber('elmX')} />
            <span className={S_S_.unit}>px</span>
          </div>
          <div className={S_S_.filed} style={{ width: '50%' }}>
            <div className="label">Y轴:</div>
            <InputNumber value={data.elmY} onChange={this.changeInputNumber('elmY')} />
            <span className={S_S_.unit}>px</span>
          </div>
          <div className={S_S_.filed} style={{ width: '50%' }}>
            <div className="label">宽度:</div>
            <InputNumber value={data.elmW} onChange={this.changeInputNumber('elmW')} />
            <span className={S_S_.unit}>px</span>
          </div>
          <div className={S_S_.filed} style={{ width: '50%' }}>
            <div className="label">高度:</div>
            <InputNumber value={data.elmH} onChange={this.changeInputNumber('elmH')} />
            <span className={S_S_.unit}>px</span>
          </div>
        </div>
      </div>
    );

    const categoryList = parameters.map((category, index) => {
      const paramList = category.section.map((param, sub) => {
        return (
          <div className={S_S_.filed} key={sub} style={{ width: param.per || '100%' }}>
            <div className="label">{param.label}:</div>
            {getInput(param)}
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
          <Button size="small" type="ghost" onClick={() => actions.delete_module(cid, data.mid)}>
            删除
          </Button>
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
