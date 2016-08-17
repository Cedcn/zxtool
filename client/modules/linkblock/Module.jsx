import React, { Component, PropTypes } from 'react';

class Module extends Component {
  static getStructure() {
    return require('./module.json');
  }
  static getTemplate(data) {
    const { mid } = data;
    return `<div>${mid}</div>`;
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
