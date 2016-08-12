import * as TYPE from './ActionTypes';

/* modal */
export const openModal = (component) =>
  ({ type: TYPE.OPEN_MODAL, component });

export const closeModal = () =>
  ({ type: TYPE.CLOSE_MODAL });

/*  data curd */

export const createData = (mid, data) =>
  ({ type: TYPE.CREATE_DATA, mid, data });

export const updateData = (mid, data) =>
  ({ type: TYPE.UPDATE_DATA, mid, data });
