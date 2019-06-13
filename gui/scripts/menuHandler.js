const { remote } = require('electron');

const win = remote.getCurrentWindow();

$('body').prepend(`
    <header>
        <a style="-webkit-app-region: no-drag;" href="index.html"><img src="../media/toodooText380x100.png"
                alt="toodoo icon" height="20" width="76" id="logo"></a>

        <ul class="menu-buttons">
            <li class="unselectable" id="minimize"><img src="../media/minimize.png" alt="minimize" height="2" width"14"></li>
            <li class="unselectable" id="maximize"><img src="../media/fullscreen.png" alt="fullscreen" height="14" width"14"></li>
            <li class="unselectable" id="close"><img src="../media/close.png" alt="close" height="14" width"14"></li>
        </ul>
    </header>
`);

$('#minimize').click(() => {
    win.minimize();
});

$('#maximize').click(() => {
    if (!win.isMaximized()) {
        win.maximize();
        document.getElementById('maximize').innerHTML = '<img src="../media/fullscreen_exit.png" alt="fullscreen" height="14" width"14">';
    } else {
        win.unmaximize();
        document.getElementById('maximize').innerHTML = '<img src="../media/fullscreen.png" alt="fullscreen" height="14" width"14">';
    }
});

$('#close').click(() => {
    win.close();
});
