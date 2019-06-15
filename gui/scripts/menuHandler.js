const { remote } = require('electron');

const win = remote.getCurrentWindow();

const iconSize = 14;

$('body').prepend(`<header class="header">
<h1 class="unselectable logo">
    <span class="helper"></span><a href="index.html" draggable="false"><img src="../media/toodooText.png"
    alt="toodoo icon" height="20" width="80" draggable="false"></a>
</h1>

<ul class="main-nav">
    <li class="frame" id="settings">
        <span class="helper"></span><a href="#"><img src="../media/settings.svg" height="${iconSize}" width="${iconSize}"></a>
    </li>
    <li class="frame" id="minimize">
        <span class="helper"></span><a href="#"><img src="../media/minimize.svg" height="${iconSize}" width="${iconSize}"></a>
    </li>
    <li class="frame" id="maximize">
        <span class="helper"></span><a href="#"><img src="../media/fullscreen.svg" height="${iconSize}" width="${iconSize}"></a>
    </li>
    <li class="frame" id="close">
        <span class="helper"></span><a href="#"><img src="../media/close.svg" height="${iconSize}" width="${iconSize}"></a>
    </li>
</ul>
</header>`);

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
