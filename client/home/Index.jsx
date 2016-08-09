import React, { Component } from 'react';

import S_S_ from './index.scss';
import EditPanel from '../components/panel/EditPanel';

import data from '../components/modules/linkblock/module.json';
import Module from '../components/modules/linkblock/Module';

class Home extends Component {
  render() {
    return (
      <div className={`page ${S_S_.page_home}`}>
        <Module />
        <EditPanel data={data} />
      </div>
    );
  }
}

module.exports = Home;
