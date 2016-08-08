import React, { PropTypes, Component } from 'react';
import Modal from './Modal';

class AppWrapper extends Component {
  componentDidMount() {
    this.context.router.listen(() => {
      window.scroll(0, 0);
    });
  }
  render() {
    const { actions, modal } = this.props;
    return (
      <div className="app-wrapper">
        {modal.type === 'show' ? <Modal actions={actions} {...modal} /> : null}
        {this.props.children}
      </div>
    );
  }
}

AppWrapper.propTypes = {
  children: PropTypes.element,
  history: PropTypes.object,
  actions: PropTypes.object,
  modal: PropTypes.object,
};

AppWrapper.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default AppWrapper;
