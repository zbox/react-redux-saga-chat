import WebSocketServerService, { BroadcastCall } from './websocket';
import { Data as MessagePayload, MessageEvent } from 'ws';

const users = {};

const onMessageHandler = (event: MessageEvent, connectionId: string, broadcast: BroadcastCall) => {
    const { data } = event;

    const parsePayload = (msg: MessagePayload): Record<string, unknown> => {
        // There has to be logic for all types: string | Buffer | ArrayBuffer | Buffer[]
        if (typeof msg !== 'string') {
            throw new Error('Payload type is not supported');
        }
        return JSON.parse(msg);
    };

    try {
        const payload = parsePayload(data);
        console.log('Websocket message JSON payload', payload);

        switch (payload.type) {
            case 'ADD_USER': {
                users[connectionId] = { name: payload.name };

                broadcast(
                    JSON.stringify({
                        type: 'USERS_LIST',
                        users: Object.values(users),
                    }),
                    true,
                );
                break;
            }
            case 'ADD_MESSAGE':
                broadcast(
                    JSON.stringify({
                        type: 'ADD_MESSAGE',
                        id: payload.id,
                        message: payload.message,
                        user: payload.user,
                    }),
                );
                break;
            default:
                break;
        }
    } catch (e) {
        console.log('Log error onMessage: ', e.message);
    }
};

const onCloseHandler = (connectionId: string, broadcast: BroadcastCall) => {
    try {
        delete users[connectionId];
        broadcast(
            JSON.stringify({
                type: 'USERS_LIST',
                users: Object.values(users),
            }),
        );
    } catch (e) {
        console.log(`Log error onClose: ${e.message}`);
    }
};

new WebSocketServerService(9333, onMessageHandler, onCloseHandler);
