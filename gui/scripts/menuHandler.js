const $ = require('jquery');
const { remote } = require('electron');

var win = remote.getCurrentWindow();

$('body').prepend(`
    <header>
        <a style="-webkit-app-region: no-drag;" href="index.html"><img src="../media/toodooText380x100.png"
                alt="toodoo icon" height="20" width="76" id="logo"></a>

        <ul class="menu-buttons">
            <li class="unselectable" id="minimize">-</li>
            <li class="unselectable" id="maximize">+</li>
            <li class="unselectable" id="close">&times</li>
        </ul>
    </header>
`)

$('#minimize').click(function(){
    win.minimize();
});

$('#maximize').click(function(){
    if(!win.isMaximized()) {
        win.maximize();
    } else {
        win.unmaximize();
    }
})

$('#close').click(function(){
    win.close();
});