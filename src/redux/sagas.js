import { all } from 'redux-saga/effects'
import dogshitsSagas from './dogshits/sagas'

export default function* rootSaga() {
  yield all([
    dogshitsSagas(),
  ])
}
