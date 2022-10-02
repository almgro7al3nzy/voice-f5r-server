class ChatController {
    constructor(roomController, chat) {
        this._roomController = roomController;
        this._chat = chat;
        this._feed = document.getElementById('feed');
        this._input = document.getElementById('input');
        this._text = document.getElementById('text');
        this._send = document.getElementById('send');

        this._input.onsubmit = (event) => {
            event.preventDefault();

            const msg = this._text.value;

            this._text.value = "";

            this._roomController.socketController.send(JSON.stringify({chat: msg}));
        }
    }

    addMessage(name, content) {
        console.log(name);
        console.log(content);
        const message = document.createElement('DIV');
        const nameEl = document.createElement('B');
        const contentEl = document.createElement('SPAN');

        nameEl.appendChild(document.createTextNode(name + ': '));
        contentEl.appendChild(document.createTextNode(content));

        message.appendChild(nameEl);
        message.appendChild(contentEl);

        this._feed.appendChild(message);
    }
}