import * as TYPE from './ActionTypes';

/* modal */
export const openModal = (component) =>
  ({ type: TYPE.OPEN_MODAL, component });

export const closeModal = () =>
  ({ type: TYPE.CLOSE_MODAL });

/*  data curd */
export const createModule = (cid, mid, data) =>
  ({ type: TYPE.CREATE_MODULE, cid, mid, data });

export const updateModule = (cid, mid, data) =>
  ({ type: TYPE.UPDATE_MODULE, cid, mid, data });
export const goBehind = (cid, mid) =>
  ({ type: TYPE.GOBEHIND, cid, mid });

export const checkModule = (cid, checkedMid) =>
  ({ type: TYPE.CHECK_MODULE, cid, checkedMid });

export const delete_module = (cid, mid) =>
  ({ type: TYPE.DELETE_MODULE, cid, mid });

/* work_panel */
export const limitScope = isLimit =>
  ({ type: TYPE.LIMITSCOPE, isLimit });

export const showRuler = isShow =>
  ({ type: TYPE.SHOWRULER, isShow });

export const showStatusBar = isShow =>
  ({ type: TYPE.SHOWSTATUSBAR, isShow });

export const setWorkPanelWidth = width =>
  ({ type: TYPE.WORKPANELWIDTH, width });

export const setWorkPanelHeight = height =>
  ({ type: TYPE.WORKPANELHEIGHT, height });

export const reset_workpanel = () =>
  ({ type: TYPE.RESET_WORKPANEL });


export const createCanvas = cid =>
  ({ type: TYPE.CREATE_CANVAS, cid });

export const updateCanvas = (cid, data) =>
  ({ type: TYPE.UPDATE_CANVAS, cid, data });

export const deleteCanvas = cid =>
  ({ type: TYPE.DELETE_CANVAS, cid });

export const checkCanvas = checkedCid =>
  ({ type: TYPE.CHECK_CANVAS, checkedCid });

export const reset_canvas = () =>
  ({ type: TYPE.RESET_CANVAS });


export const switchPanel = panel =>
  ({ type: TYPE.SWITCH_PANEL, panel });

export const reset_editpanel = () =>
  ({ type: TYPE.RESET_EDITPANEL });
