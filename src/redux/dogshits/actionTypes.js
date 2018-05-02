export const actionTypes = {
  DOGSHITS_LIST: 'tt/DOGSHITS_LIST',
  DOGSHITS_LIST_SUCCESS: 'tt/DOGSHITS_LIST_SUCCESS',
  DOGSHITS_LIST_ERROR: 'tt/DOGSHITS_LIST_ERROR',

  DOGSHITS_ADD: 'tt/DOGSHITS_ADD',
  DOGSHITS_ADD_SUCCESS: 'tt/DOGSHITS_ADD_SUCCESS',
  DOGSHITS_ADD_ERROR: 'tt/DOGSHITS_ADD_ERROR',

  DOGSHITS_GET: 'tt/DOGSHITS_GET',
  DOGSHITS_GET_SUCCESS: 'tt/DOGSHITS_GET_SUCCESS',
  DOGSHITS_GET_ERROR: 'tt/DOGSHITS_GET_ERROR',
  DOGSHITS_GET_CLEAR_IMAGE: 'tt/DOGSHITS_GET_CLEAR_IMAGE',
}

export function dogshitsList(state) {
  return {
    ...state,
    isLoading: true,
    hasError: false,
  }
}

export function dogshitsListSuccess(state, action) {
  return {
    ...state,
    records: action.payload,
    isLoading: false,
    hasError: false,
  }
}

export function dogshitsListError(state) {
  return {
    ...state,
    isLoading: false,
    hasError: true,
  }
}

export function dogshitsAdd(state) {
  return {
    ...state,
    isLoading: true,
    hasError: false,
  }
}

export function dogshitsAddSuccess(state, action) {
  return {
    ...state,
    records: action.payload,
    isLoading: false,
    hasError: false,
  }
}

export function dogshitsAddError(state) {
  return {
    ...state,
    isLoading: false,
    hasError: true,
  }
}

export function dogshitsGet(state) {
  return {
    ...state,
    isLoading: true,
    hasError: false,
  }
}

export function dogshitsGetSuccess(state, action) {
  return {
    ...state,
    isLoading: false,
    hasError: false,
    currentTurd: action.payload.image_base64,
  }
}

export function dogshitsGetError(state) {
  return {
    ...state,
    isLoading: false,
    hasError: true,
    currentTurd: null,
  }
}

export function dogshitsGetClearImage(state) {
  return {
    ...state,
    currentTurd: null,
  }
}

export const actionHandlers = {
  [actionTypes.DOGSHITS_LIST]: dogshitsList,
  [actionTypes.DOGSHITS_LIST_SUCCESS]: dogshitsListSuccess,
  [actionTypes.DOGSHITS_LIST_ERROR]: dogshitsListError,

  [actionTypes.DOGSHITS_ADD]: dogshitsAdd,
  [actionTypes.DOGSHITS_ADD_SUCCESS]: dogshitsAddSuccess,
  [actionTypes.DOGSHITS_ADD_ERROR]: dogshitsAddError,

  [actionTypes.DOGSHITS_GET]: dogshitsGet,
  [actionTypes.DOGSHITS_GET_SUCCESS]: dogshitsGetSuccess,
  [actionTypes.DOGSHITS_GET_ERROR]: dogshitsGetError,
  [actionTypes.DOGSHITS_GET_CLEAR_IMAGE]: dogshitsGetClearImage,
}
