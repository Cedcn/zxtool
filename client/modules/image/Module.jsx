import React, { Component, PropTypes } from 'react';
import structure from './module.json';

class Module extends Component {
  static getStructure() {
    return structure;
  }
  static getTemplate(data) {
    const { imagelink, aas } = data;
    return `<div><img src="${imagelink}" style="width: 100%">${aas}</div>`;
  }
  render() {
    if (!this.props.data) return false;

    return (
      <div dangerouslySetInnerHTML={{ __html: Module.getTemplate(this.props.data) }} />
    );
  }
}

Module.propTypes = {
  data: PropTypes.object,
};

export default Module;
