class SocketController {
    constructor(roomController) {
        this._roomController = roomController;
        this._socket = null;
    }

    set socket(v) { this._socket = v; }

    send(data) {
        this._socket.send(data);
    }

    receiveBinary(data) {
        this._roomController.canvasController.runCommand(data);
    }
}