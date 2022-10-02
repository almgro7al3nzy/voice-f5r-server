class RoomController {
    constructor() {
        const canvasElement = document.getElementById('canvas');
        const cameraViewElement = document.getElementById('cameraview');
        const chatElement = document.getElementById('chat');

        this._canvasController = new CanvasController(this, canvasElement);
        this._cameraViewController = new CameraViewController(this, cameraViewElement);
        this._chatController = new ChatController(this, chatElement);
        this._socketController = new SocketController(this);
    }

    get canvasController() { return this._canvasController; }

    get cameraViewController() { return this._cameraViewController; }

    get chatController() { return this._chatController; }

    get socketController() { return this._socketController; }
    set socketController(v) { this._socketController = v; }
}