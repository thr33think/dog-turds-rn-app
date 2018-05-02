import { actionTypes } from './actionTypes'

export function getDogshits() {
  return {
    type: actionTypes.DOGSHITS_LIST,
  }
}

export function addDogshit(newEntry) {
  return {
    type: actionTypes.DOGSHITS_ADD,
    payload: newEntry,
  }
}

export function getTurd(id) {
  return {
    type: actionTypes.DOGSHITS_GET,
    payload: id,
  }
}

export function clearImage() {
  return {
    type: actionTypes.DOGSHITS_GET_CLEAR_IMAGE,
  }
}

export default {
  getDogshits,
  addDogshit,
}
