import React, { PropTypes, Component } from 'react';
import S_S_ from './scale.scss';

class Scale extends Component {
  render() {
    let xScaleList = [];
    let yScaleList = [];
    const width = this.props.width > window.innerWidth - 175 ? this.props.width : window.innerWidth - 175;
    const height = this.props.height > window.innerHeight - 65 ? this.props.height : window.innerHeight - 65;
    for (let i = 0; i < width; i++) {
      if (i % 5 === 0) {
        let jsx = <span key={i} className={S_S_.diff}></span>;
        if (i % 10 === 0) {
          jsx = <span key={i} className={`${S_S_.diff} ${S_S_.primary}`}></span>;
        }
        if (i % 100 === 0) {
          jsx = <span key={i} className={`${S_S_.diff} ${S_S_.long}`}><div className={S_S_.text}>{i}</div></span>;
        }
        xScaleList.push(jsx);
      }
    }

    for (let i = 0; i < height; i++) {
      if (i % 5 === 0) {
        let jsx = <div key={i} className={S_S_.diff}></div>;
        if (i % 10 === 0) {
          jsx = <div key={i} className={`${S_S_.diff} ${S_S_.primary}`}></div>;
        }
        if (i % 100 === 0) {
          jsx = <div key={i} className={`${S_S_.diff} ${S_S_.long}`}><div className={S_S_.text}>{i}</div></div>;
        }
        yScaleList.push(jsx);
      }
    }
    return (
      <div className={S_S_.scale}>
        <div className={S_S_.x_scale}>
          {xScaleList}
        </div>
        <div className={S_S_.y_scale}>
          {yScaleList}
        </div>
      </div>
    );
  }
}

Scale.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  actions: PropTypes.object,
};

export default Scale;
