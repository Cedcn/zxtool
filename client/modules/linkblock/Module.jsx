import React, { Component, PropTypes } from 'react';

class Module extends Component {
  static getStructure() {
    return require('./module.json');
  }
  static getTemplate(data) {
    const { link, hint, isBlank } = data;
    return `<a href="${link}" alt="${hint}" target="${isBlank ? '_blank' : '_self'}" style="width: 100%; height:100%; display:block;"></a>`;
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
