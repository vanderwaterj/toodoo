function alertTemplate(content) {
    return `
    <div class="alert">
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
        ${content}
    </div>
    `
    /*
    return `
    <div class="alert alert-success alert-dismissible">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        ${content}
    </div>
    `;
    */
}

function myToodoo() {
    var ps = require('python-shell');
    var path = require('path');

    var name = document.getElementById('nameInput').value;
    var date = document.getElementById('dateInput').value;
    var id = document.getElementById('idInput').value; 

    var options = {
        scriptPath: path.join(__dirname, '/../engine/'),
        args: [name, date, id]
    };

    const eventAddSuccessTemplate = alertTemplate(
        `Event ${name} successfully added.`
    )

    $(document).ready(() => {
        if ((name != "") && (date != "") && (id != "")) {
            $('#submitButton').after(eventAddSuccessTemplate);
        }
    });   

    ps.PythonShell.run('toodoo.py', options, function (err, results) {
        if (err) throw err;
      });
}
