import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers/root';
import rootSagas from './sagas/root';
import { createLogger } from 'redux-logger';
import WebSocketService from '../services/socketclient';
import { socketURL } from '../constants';

const isDevelopment = process.env.NODE_ENV === 'development';
if (isDevelopment) {
    localStorage.clear();
}
const sagaMiddleware = createSagaMiddleware();
const middlewares = isDevelopment ? [sagaMiddleware, createLogger()] : [sagaMiddleware];

const enhancer = applyMiddleware(...middlewares);

const store = createStore(reducers, enhancer);

sagaMiddleware.run(rootSagas, { socket: new WebSocketService(socketURL, store) });

export default store;
