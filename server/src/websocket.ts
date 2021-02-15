import WebSocket, { MessageEvent } from 'ws';
import { v4 as uuidv4 } from 'uuid';

export type BroadcastCall = (data: WebSocket.Data, isDispatchSelf?: boolean) => void;

type WebSocketOnMessageHandler = (event: MessageEvent, connectionId: string, broadcast: BroadcastCall) => void;
type WebSocketOnCloseHandler = (connectionId: string, broadcast: BroadcastCall) => void;

interface WSServerServiceInterface {
    init(): void;
    stop(): void;
    broadcast(data: WebSocket.Data, isDispatchSelf: boolean, socket: WebSocket): void;
}

interface WebSocketConnections {
    [key: string]: WebSocket;
}

class WebSocketServerService implements WSServerServiceInterface {
    server: WebSocket.Server;
    onMessageHandler: WebSocketOnMessageHandler;
    onCloseHandler: WebSocketOnCloseHandler;
    connections: WebSocketConnections;

    constructor(port: number, onMessage: WebSocketOnMessageHandler, onClose: WebSocketOnCloseHandler) {
        this.server = new WebSocket.Server({ port });
        this.connections = {};

        this.onMessageHandler = onMessage;
        this.onCloseHandler = onClose;

        this.init();
    }

    init(): void {
        this.server.on('connection', (socket) => {
            const connectionId = uuidv4();
            this.connections[connectionId] = socket;

            socket.onmessage = (event) =>
                this.onMessageHandler(event, connectionId, (data, isDispatchSelf = false) =>
                    this.broadcast(data, isDispatchSelf, socket),
                );

            socket.on('close', () => {
                this.onCloseHandler(connectionId, (data, isDispatchSelf = false) =>
                    this.broadcast(data, isDispatchSelf, socket),
                );
                delete this.connections[connectionId];
            });
        });
    }

    stop(): void {
        this.server.close();
    }

    broadcast(data: WebSocket.Data, isDispatchSelf: boolean, socket: WebSocket): void {
        Object.values(this.connections).forEach((conn) => {
            const skipIfCondition = conn === socket && !isDispatchSelf;
            if (!skipIfCondition && conn.readyState === WebSocket.OPEN) {
                conn.send(data);
            }
        });
    }
}

export default WebSocketServerService;
