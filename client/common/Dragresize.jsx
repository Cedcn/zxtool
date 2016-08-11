import React, { PropTypes, Component } from 'react';
import S_S_ from './dragresize.scss';

const getValue = (value, max_value, min_value) => {
  if (value > max_value) {
    return max_value;
  } else if (value < min_value) {
    return min_value;
  } else {
    return value;
  }
};

class Dragresize extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elmX: 10,
      elmY: 20,
      elmW: 200,
      elmH: 150,
      isResize: true,
      isDrag: false,
    };

    let a = 0;
    let b = 0;
    let w = 0;
    let h = 0;
    let x = 0;
    let y = 0;

    const minWidth = this.props.minWidth || 10;
    const minHeight = this.props.minHeight || 10;
    const isRatio = this.props.isRatio || true;
    const [ minLeft, minTop, maxLeft, maxTop ] = this.props.dragScope || [ 0, 0, 900, 500 ];

    this.mouseDown = e => {
      if (e.button !== 0) return;
      e.preventDefault();
      this.setState({ isDrag: true, isResize: true });
      a = e.pageX;
      b = e.pageY;
      x = this.state.elmX;
      y = this.state.elmY;
      w = this.state.elmW;
      h = this.state.elmH;
      document.addEventListener('mousemove', this.mouseMove);
    };

    const getDragRealX = value => {
      const max_value = maxLeft - w;
      const min_value = minLeft;
      return getValue(value, max_value, min_value);
    };

    const getDragRealY = value => {
      const max_value = maxTop - h;
      const min_value = minTop;
      return getValue(value, max_value, min_value);
    };

    this.mouseMove = e => {
      if (!this.state.isDrag) return;

      e.preventDefault();
      this.setState({ elmX: getDragRealX(x + (e.pageX - a)), elmY: getDragRealY(y + (e.pageY - b)) });
    };

    this.mouseUp = () => {
      this.setState({ isDrag: false });
      document.removeEventListener('mousemove', this.mouseMove);
      document.removeEventListener('mousemove', this.moveResize);
    };

    let seat = '';  // 角标
    this.resizeHandle = s => {
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

    // 限制宽度
    const limit_W = (value, tempX) => {
      const max_value = maxLeft - tempX;
      const min_value = minWidth;
      return getValue(value, max_value, min_value);
    };

    // 限制高度
    const limit_H = (value, tempY) => {
      const max_value = maxTop - tempY;
      const min_value = minHeight;
      return getValue(value, max_value, min_value);
    };

    // 限制X点的位置
    const limit_X = value => {
      const max_value = (x + w) - minWidth;
      const min_value = minLeft;
      return getValue(value, max_value, min_value);
    };

    // 限制Y点的位置
    const limit_Y = value => {
      const max_value = (y + h) - minHeight;
      const min_value = minTop;
      return getValue(value, max_value, min_value);
    };

    this.moveResize = e => {
      e.preventDefault();
      const ratio = h / w;
      let tempW = w, tempH = h, tempX = x, tempY = y;

      // set attribute of this dragbox
      if (seat === 'br') {
        tempW = limit_W(e.pageX - x, tempX);

        if (isRatio) {
          tempH = tempW * ratio;
          tempH = limit_H(tempH, tempY);

          if (tempH >= maxTop - tempY) {
            tempH = maxTop - tempY;
            tempW = tempH / ratio;
          }
        } else {
          tempH = limit_H(e.pageY - y, tempY);
        }
      }

      if (seat === 'tl') {
        tempX = limit_X(e.pageX);
        tempW = limit_W((w + x) - tempX, tempX);

        if (isRatio) {
          tempH = tempW * ratio;
          tempY = y - (tempH - h);
          if (tempY <= minTop) {
            tempY = minTop;
            tempX = x - ((y - tempY) / ratio);
            tempW = limit_W((w + x) - tempX, tempX);
            tempH = tempW * ratio;
          }
        } else {
          tempY = limit_Y(e.pageY);
          tempH = limit_H((h + y) - tempY, tempY);
        }
      }

      if (seat === 'tr') {
        tempX = x;
        tempW = limit_W(e.pageX - x, tempX);

        if (isRatio) {
          tempH = tempW * ratio;
          tempY = y - (tempH - h);
          if (tempY <= minTop) {
            tempY = minTop;
            tempW = ((y - tempY) + h) / ratio;
            tempH = tempW * ratio;
          }
        } else {
          tempY = limit_Y(e.pageY);
          tempH = limit_H((h + y) - tempY, tempY);
        }
      }

      if (seat === 'bl') {
        tempX = limit_X(e.pageX);
        tempW = limit_W((w + x) - tempX, tempX);

        if (isRatio) {
          tempH = tempW * ratio;
          if (tempH >= maxTop - y) {
            tempH = maxTop - y;
            tempW = tempH / ratio;
            tempX = x - (tempW - w);
          }
        } else {
          tempH = limit_H(e.pageY - y, tempY);
        }
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
        <div className={`${S_S_.handle_btn} ${S_S_.handle_tl}`} onMouseDown={this.resizeHandle('tl')} />
        <div className={`${S_S_.handle_btn} ${S_S_.handle_tr}`} onMouseDown={this.resizeHandle('tr')} />
        <div className={`${S_S_.handle_btn} ${S_S_.handle_bl}`} onMouseDown={this.resizeHandle('bl')} />
        <div className={`${S_S_.handle_btn} ${S_S_.handle_br}`} onMouseDown={this.resizeHandle('br')} />
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
  dragScope: PropTypes.array,
};

export default Dragresize;
