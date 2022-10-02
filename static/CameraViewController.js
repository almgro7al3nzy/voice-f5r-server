class CameraViewController {
    constructor(roomController, cameraView) {
        this._roomController = roomController;
        this._cameraView = cameraView;
        this._width = 0;
        this._height = 0;
        this._currentViewIndex = 0;

        // Resize the video feeds when needed.
        this._resize();
        addEventListener('resize', () => { this._resize(); });

        this._cycle();
    }

    update() {
        this._resize();

        for (const videoFeed of this._cameraView.childNodes) {
            videoFeed.style.display = 'none';
        }

        if (this._cameraView.childNodes.length === 0) {
            this._currentViewIndex = 0;
            return;
        } else if (this._cameraView.childNodes.length < (this._currentViewIndex + 1)) {
            this._currentViewIndex = 0;
        }
        
        this._cameraView.childNodes[this._currentViewIndex].style.display = 'block';
    }

    /**
     * Resize all video feeds according to the new viewport size.
     */
    _resize() {
        for (const videoFeed of this._cameraView.childNodes) {
            const bcr = this._cameraView.getBoundingClientRect();

            videoFeed.width = bcr.width;
            videoFeed.height = bcr.height;
            this._width = bcr.width;
            this._height = bcr.height;
        }
    }

    _cycle() {
        setTimeout(() => {
            const numViews = this._cameraView.childNodes.length;

            if (numViews > 0) {
                this._cameraView.childNodes[this._currentViewIndex].style.display = 'none';
                this._currentViewIndex = (this._currentViewIndex + 1) % numViews;
                this._cameraView.childNodes[this._currentViewIndex].style.display = 'block';
            }

            this._cycle();
        }, 4000);
    }
}