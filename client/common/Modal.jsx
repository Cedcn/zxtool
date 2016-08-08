import React, { PropTypes } from 'react';

const Modal = props => {
  const { actions, component } = props;
  return (
    <div className="modal-layer">
      <div className="modal-layer-content">
        {component}
      </div>
      <div className="modal-layer-mask" onClick={() => actions.closeModal()} />
    </div>
  );
};

Modal.propTypes = {
  component: PropTypes.element,
  actions: PropTypes.object,
};

export default Modal;
