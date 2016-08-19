import React, { Component, PropTypes } from 'react';
import structure from './module.json';

class Module extends Component {
  static getStructure() {
    return structure;
  }
  static getTemplate(data) {
    const { imagelink } = data;
    return `<div style="width: 100%; height: 100%; background-image: url(${imagelink}); background-size: cover;"></div>`;
  }
  render() {
    if (!this.props.data) return false;

    return (
      <div style={{ width: '100%', height: '100%', display: 'block' }} dangerouslySetInnerHTML={{ __html: Module.getTemplate(this.props.data) }} />
    );
  }
}

Module.propTypes = {
  data: PropTypes.object,
};

export default Module;
