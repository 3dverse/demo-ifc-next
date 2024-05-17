//--------------------------------------------------------------------------
export const enableFullScreen = () => {
    const docEl = window.document.documentElement;
    const requestFullScreen = docEl.requestFullscreen;

    if (requestFullScreen) {
        requestFullScreen.call(docEl);
    }
};
