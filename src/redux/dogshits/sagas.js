import { all, takeEvery, fork, put, call } from 'redux-saga/effects'
import { actionTypes } from './actionTypes'
import * as Api from './api'

export function* dogshitsList() {
  try {
    const records = yield call(Api.dogshitsList)
    yield put({ type: actionTypes.DOGSHITS_LIST_SUCCESS, payload: records })
  } catch (error) {
    yield put({ type: actionTypes.DOGSHITS_LIST_ERROR, payload: error.message })
  }
}

export function* dogshitsAdd(action) {
  try {
    yield call(Api.dogshitsAdd, action.payload)
    yield put({ type: actionTypes.DOGSHITS_ADD_SUCCESS })
  } catch (error) {
    yield put({ type: actionTypes.DOGSHITS_ADD_ERROR, payload: error.message })
  }
}

export function* dogshitsGet(action) {
  try {
    const response = yield call(Api.dogshitsGet, action.payload)
    yield put({ type: actionTypes.DOGSHITS_GET_SUCCESS, payload: response })
  } catch (error) {
    yield put({ type: actionTypes.DOGSHITS_GET_ERROR, payload: error.message })
  }
}

function* watchDogshitsList() {
  yield takeEvery(actionTypes.DOGSHITS_LIST, dogshitsList)
}

function* watchDogshitsAdd() {
  yield takeEvery(actionTypes.DOGSHITS_ADD, dogshitsAdd)
}

function* watchDogshitsGet() {
  yield takeEvery(actionTypes.DOGSHITS_GET, dogshitsGet)
}

export default function* rootSaga() {
  yield all([fork(watchDogshitsList), fork(watchDogshitsAdd), fork(watchDogshitsGet)])
}
