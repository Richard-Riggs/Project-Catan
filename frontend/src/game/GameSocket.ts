import io from 'socket.io-client';
import GameUpdater from './GameUpdater';

export default class GameSocket {
    private _socket: SocketIOClient.Socket;
    private _updater: GameUpdater;

    constructor(updater: GameUpdater) {
        this._updater = updater;
        this._socket = io('/game', {
            path: '/socket'
        });
        console.log(typeof this._socket.id);
        console.log(typeof this._updater);
    }

}