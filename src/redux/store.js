import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'remote-redux-devtools'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducers from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]
const persistConfig = {
  key: 'root',
  storage,
}

const composeEnhancers = composeWithDevTools({ port: 8005 })

const enhancer = composeEnhancers(applyMiddleware(...middlewares))

const persistedReducer = persistReducer(persistConfig, combineReducers({
  ...reducers,
}))

const store = createStore(persistedReducer, enhancer)
const persistor = persistStore(store)

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.acceptCallback = () => {
      store.replaceReducer(persistedReducer)
    }
  }
}

sagaMiddleware.run(rootSaga)
export { store, persistor }
