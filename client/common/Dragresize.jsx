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
      isDrag: false,
    };

    let m_x = 0; // 鼠标点击时X轴的位置
    let m_y = 0; // 鼠标点击时Y轴的位置
    let w = 0; // 鼠标点击时BOX的宽度
    let h = 0; // 鼠标点击时BOX的高度
    let x = 0; // 鼠标点击时BOX的X轴坐标
    let y = 0; // 鼠标点击时BOX的Y轴坐标

    const minWidth = this.props.minWidth || 10;
    const minHeight = this.props.minHeight || 10;
    const isRatio = this.props.isRatio || false;
    const [ minLeft, minTop, maxLeft, maxTop ] = this.props.dragScope || [ 0, 0, 900, 500 ];

    this.mouseDown = e => {
      if (e.button !== 0) return;
      e.preventDefault();
      this.setState({ isDrag: true });
      m_x = e.pageX;
      m_y = e.pageY;
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
      this.setState({ elmX: getDragRealX(x + (e.pageX - m_x)), elmY: getDragRealY(y + (e.pageY - m_y)) });
    };

    this.mouseUp = () => {
      this.setState({ isDrag: false });
      document.removeEventListener('mousemove', this.mouseMove);
      document.removeEventListener('mousemove', this.moveResize);
    };

    let seat = '';  // 角标
    this.resizeHandle = s => {
      // if (!this.state.isResize) return;
      return e => {
        e.stopPropagation();
        seat = s;
        document.removeEventListener('mousemove', this.mouseMove);
        document.addEventListener('mousemove', this.moveResize);
        m_x = e.pageX;
        m_y = e.pageY;
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
      switch (seat) {
        case 'br':
          tempW = limit_W(w + (e.pageX - m_x), tempX);
          tempH = limit_H(h + (e.pageY - m_y), tempY);
          if (isRatio) {
            tempW = limit_W(tempH / ratio, tempX);
            tempH = limit_H(tempW * ratio, tempY);
          }
          break;
        case 'tl':
          tempX = limit_X(e.pageX - (m_x - x));
          tempY = limit_Y(e.pageY - (m_y - y));
          if (isRatio) {
            tempX = limit_X(x - ((y - tempY) / ratio));
            tempY = limit_Y(y - ((x - tempX) * ratio));
          }
          tempW = limit_W((w + x) - tempX, tempX);
          tempH = limit_H((h + y) - tempY, tempY);
          break;
        case 'tr':
          tempY = limit_Y(e.pageY - (m_y - y));
          tempW = limit_W(w + (e.pageX - m_x));
          tempH = limit_H((h + y) - tempY, tempY);
          if (isRatio) {
            tempH = limit_H(tempW * ratio, tempY);
            tempY = limit_Y(y - (tempH - h));
            tempW = limit_W(((y - tempY) + h) / ratio, tempX);
            tempH = limit_H(tempW * ratio, tempY);
          }
          break;
        case 'bl':
          tempX = limit_X(e.pageX - (m_x - x));
          tempW = limit_W((w + x) - tempX, tempX);
          tempH = limit_H(h + (e.pageY - m_y), tempY);
          if (isRatio) {
            tempH = limit_H(tempW * ratio, tempY);
            tempW = limit_W(tempH / ratio, tempX);
            tempX = limit_X(x - (tempW - w));
          }
          break;
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
    const { elmX, elmY, elmW, elmH } = this.state;
    const isChecked = this.props.isChecked || false;
    const isResize = (this.props.isResize && isChecked) || false;
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

    const borderList = isChecked ? (
      <div>
        <div className={`${S_S_.border_line} ${S_S_.border_top}`} />
        <div className={`${S_S_.border_line} ${S_S_.border_left}`} />
        <div className={`${S_S_.border_line} ${S_S_.border_right}`} />
        <div className={`${S_S_.border_line} ${S_S_.border_bottom}`} />
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
        {borderList}
      </div>
    );
  }
}

Dragresize.propTypes = {
  children: PropTypes.element,
  minWidth: PropTypes.number,
  minHeight: PropTypes.number,
  isRatio: PropTypes.bool,
  isResize: PropTypes.bool,
  isChecked: PropTypes.bool,
  dragScope: PropTypes.array,
};

export default Dragresize;
