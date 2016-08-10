import React, { PropTypes, Component } from 'react';
import S_S_ from './dragresize.scss';

class Dragresize extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elmX: 10,
      elmY: 20,
      elmW: 200,
      elmH: 200,
      isResize: true,
      isDrag: false,
    };

    let a = 0;
    let b = 0;
    let c = 0;
    let d = 0;
    this.mouseDown = e => {
      e.preventDefault();
      this.setState({ isDrag: true });
      a = e.pageX;
      b = e.pageY;
      c = this.state.elmX;
      d = this.state.elmY;
      window.document.addEventListener('mousemove', this.mouseMove);
    };

    this.mouseMove = e => {
      if (!this.state.isDrag) return;
      e.preventDefault();
      this.setState({ elmX: c + (e.pageX - a), elmY: d + (e.pageY - b) });
    };

    this.mouseUp = () => {
      this.setState({ isDrag: false });
      window.document.removeEventListener('mousemove', this.mouseMove);
    };
  }

  componentDidMount() {
    window.document.addEventListener('mouseup', this.mouseUp);
  }

  componentWillUnmount() {
    window.document.removeEventListener('mouseup', this.mouseUp);
  }

  render() {
    const { elmX, elmY, elmW, elmH } = this.state;
    const style = {
      left: elmX,
      top: elmY,
      width: elmW,
      height: elmH,
    };

    return (
      <div
        className={S_S_.dragresize_wrapper}
        style={style}
        onMouseDown={this.mouseDown}
      >
        {this.props.children}
      </div>
    );
  }
}

Dragresize.propTypes = {
  children: PropTypes.element,
};

export default Dragresize;
