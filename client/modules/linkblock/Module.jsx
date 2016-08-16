import React, { Component, PropTypes } from 'react';
import S_S_ from './module.scss';

class Module extends Component {
  static getStructure() {
    return require('./module.json');
  }

  // constructor(props) {
  //   super(props);
  //   this.onChange = value => {
  //     this.setState({ width: value });
  //   };
  // }
  render() {
    if (!this.props.data) return false;
    const { mid } = this.props.data;
    return (
      <div className={S_S_.linkblock} href="javascript:;">
        {mid}
      </div>
    );
  }
}

Module.propTypes = {
  data: PropTypes.object,
};

export default Module;
