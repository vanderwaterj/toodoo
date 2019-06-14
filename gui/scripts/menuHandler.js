const { remote } = require('electron');

const win = remote.getCurrentWindow();

$('#minimize').click(() => {
    win.minimize();
});

$('#maximize').click(() => {
    if (!win.isMaximized()) {
        win.maximize();
    } else {
        win.unmaximize();
    }
});

$('#close').click(() => {
    win.close();
});
