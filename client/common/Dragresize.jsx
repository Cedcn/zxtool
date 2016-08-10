import React, { PropTypes, Component } from 'react';
import S_S_ from './dragresize.scss';

class Dragresize extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elmX: 10,
      elmY: 20,
      elmW: 300,
      elmH: 200,
      isResize: true,
      isDrag: false,
    };

    let a = 0;
    let b = 0;
    let c = 0;
    let d = 0;

    const minWidth = this.props.minWidth || 10;
    const minHeight = this.props.minHeight || 10;
    const isRatio = this.props.isRatio || true;

    this.mouseDown = e => {
      if (e.button !== 0) return;
      e.preventDefault();
      this.setState({ isDrag: true, isResize: true });
      a = e.pageX;
      b = e.pageY;
      c = this.state.elmX;
      d = this.state.elmY;
      document.addEventListener('mousemove', this.mouseMove);
    };

    this.mouseMove = e => {
      if (!this.state.isDrag) return;
      e.preventDefault();
      this.setState({ elmX: c + (e.pageX - a), elmY: d + (e.pageY - b) });
    };

    this.mouseUp = () => {
      this.setState({ isDrag: false });
      document.removeEventListener('mousemove', this.mouseMove);
      document.removeEventListener('mousemove', this.moveResize);
    };

    let x = 0;
    let y = 0;
    let w = 0;
    let h = 0;
    let seat = '';
    this.resize = s => {
      if (!this.state.isResize) return;
      return e => {
        e.stopPropagation();
        seat = s;
        document.removeEventListener('mousemove', this.mouseMove);
        document.addEventListener('mousemove', this.moveResize);
        w = this.state.elmW;
        h = this.state.elmH;
        x = this.state.elmX;
        y = this.state.elmY;
      };
    };

    const getRealWidth = value => {
      return value > minWidth ? value : minWidth;
    };

    const getRealHeight = value => {
      return value > minHeight ? value : minHeight;
    };

    const getRealX = value => {
      return value < (x + w) - minWidth ? value : (x + w) - minWidth;
    };

    const getRealY = value => {
      return value < (y + h) - minHeight ? value : (y + h) - minHeight;
    };

    this.moveResize = e => {
      e.preventDefault();
      const ratio = h / w;
      let tempW = w, tempH = h, tempX = x, tempY = y;
      // set attribute of this dragbox
      if (seat === 'br') {
        tempW = getRealWidth(e.pageX - x);
        tempH = !isRatio ? getRealHeight(e.pageY - y) : tempW * ratio;
      }

      if (seat === 'tl') {
        tempW = getRealWidth((w + x) - e.pageX);
        tempH = !isRatio ? getRealHeight((h + y) - e.pageY) : tempW * ratio;
        tempX = getRealX(e.pageX);
        tempY = !isRatio ? getRealY(e.pageY) : y + (h - tempH);
      }

      if (seat === 'tr') {
        tempW = getRealWidth(e.pageX - x);
        tempH = !isRatio ? getRealHeight((h + y) - e.pageY) : tempW * ratio;
        tempY = !isRatio ? getRealY(e.pageY) : y + (h - tempH);
      }

      if (seat === 'bl') {
        tempW = getRealWidth((w + x) - e.pageX);
        tempH = !isRatio ? getRealHeight(e.pageY - y) : tempW * ratio;
        tempX = getRealX(e.pageX);
      }

      this.setState({ elmX: tempX, elmY: tempY, elmW: tempW, elmH: tempH });
    };
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.mouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.mouseUp);
  }

  render() {
    const { elmX, elmY, elmW, elmH, isResize } = this.state;
    const style = {
      left: elmX,
      top: elmY,
      width: elmW,
      height: elmH,
    };

    const handleList = isResize ? (
      <div className={S_S_.handle_list}>
        <div className={`${S_S_.handle_btn} ${S_S_.handle_tl}`} onMouseDown={this.resize('tl')} />
        <div className={`${S_S_.handle_btn} ${S_S_.handle_tr}`} onMouseDown={this.resize('tr')} />
        <div className={`${S_S_.handle_btn} ${S_S_.handle_bl}`} onMouseDown={this.resize('bl')} />
        <div className={`${S_S_.handle_btn} ${S_S_.handle_br}`} onMouseDown={this.resize('br')} />
      </div>
    ) : '';
    return (
      <div
        className={S_S_.dragresize_wrapper}
        style={style}
        onMouseDown={this.mouseDown}
      >
        <div className={S_S_.content}>
          {this.props.children}
        </div>
        {handleList}
      </div>
    );
  }
}

Dragresize.propTypes = {
  children: PropTypes.element,
  minWidth: PropTypes.number,
  minHeight: PropTypes.number,
  isRatio: PropTypes.bool,
};

export default Dragresize;
