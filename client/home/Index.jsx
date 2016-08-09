import React, { Component } from 'react';
import { Button } from 'antd';

import style from './index.scss';

class Home extends Component {
  render() {
    return (
      <div className={`page ${style.page_home}`}>
        <div className={style.name}>
          Cedcn
        </div>
        <Button type="primary">Primary</Button>
      </div>
    );
  }
}

module.exports = Home;
