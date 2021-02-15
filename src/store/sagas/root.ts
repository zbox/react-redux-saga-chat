import { SagaIterator } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';
import WebSocketService from '../../services/socketclient';
import * as types from '../actions/types';

function* handleAddUser(params): SagaIterator {
    yield takeEvery(types.ADD_USER, (action) => {
        params.socket.send(action);
    });
}

function* handleAddMessage(params): SagaIterator {
    yield takeEvery(types.ADD_MESSAGE, (action) => {
        params.socket.send(action);
    });
}

export default function* root(params: { socket: WebSocketService }) {
    yield all([handleAddUser(params), handleAddMessage(params)]);
}
