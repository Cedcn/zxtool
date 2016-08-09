import React, { Component, PropTypes } from 'react';
import data from './module.json';
import S_S_ from './module.scss';

console.log(data);
class Module extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: props.width || 100,
      height: props.height || 100,
    };

    this.onChange = value => {
      this.setState({ width: value });
    };
  }
  render() {
    const { width, height } = this.state;
    return (
      <div className="aaa">
        <a className={S_S_.linkblock} style={{ width, height }} href="javascript:;">
          <div className="div" />
        </a>
      </div>
    );
  }
}

Module.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Module;
