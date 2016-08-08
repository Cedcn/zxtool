import React, { Component } from 'react';
import style from './index.css';

class Home extends Component {
  render() {
    return (
      <div className={`page ${style.page_home}`}>
        <div className={style.name}>
          Cedcn
        </div>
      </div>
    );
  }
}

module.exports = Home;
