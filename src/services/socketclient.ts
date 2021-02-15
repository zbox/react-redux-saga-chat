import * as types from '../store/actions/types';
import { addUser, Interfaces, messageReceived, usersList } from '../store/actions/root';
import { Dict } from '../types/dict';
import { Store } from 'redux';
import { StoreState } from '../types/state';

class WebSocketService {
    url: string;
    store: Store<StoreState, Interfaces>;
    client: WebSocket;

    constructor(url: string, store: Store<StoreState, Interfaces>) {
        this.url = url;
        this.store = store;
        this.client = new WebSocket(this.url);
        this.init();
    }

    init(): void {
        this.client.onmessage = (event) => this.getMessages(event);
        this.client.onclose = () => this.reconnect();
    }

    reconnect(): void {
        this.client = new WebSocket(this.url);
        this.init();
    }

    send(data: Dict): void {
        this.client.send(JSON.stringify(data));
    }

    getMessages(event: MessageEvent): void {
        const data = JSON.parse(event.data);
        switch (data.type) {
            case types.ADD_MESSAGE:
                this.store.dispatch(messageReceived(data.id, data.message, data.user));
                break;
            case types.ADD_USER:
                this.store.dispatch(addUser(data.name));
                break;
            case types.USERS_LIST:
                this.store.dispatch(usersList(data.users));
                break;
            default:
                break;
        }
    }
}

export default WebSocketService;
