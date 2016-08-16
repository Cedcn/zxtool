import React, { Component, PropTypes } from 'react';
import S_S_ from './module.scss';

import structure from './module.json';

class Module extends Component {
  static getStructure() {
    return structure;
  }
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.data) return false;
    const { imagelink } = this.props.data;
    return (
      <a className={S_S_.image} href="javascript:;">
        <div>{imagelink}</div>
      </a>
    );
  }
}

Module.propTypes = {
  data: PropTypes.object,
};

export default Module;
