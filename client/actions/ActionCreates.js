import * as TYPE from './ActionTypes';

/* modal */
export const openModal = (component) =>
  ({ type: TYPE.OPEN_MODAL, component });

export const closeModal = () =>
  ({ type: TYPE.CLOSE_MODAL });
