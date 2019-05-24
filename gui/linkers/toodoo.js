function alertTemplate(content) {
    return `
    <div class="alert alert-success alert-dismissible">
        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
        ${content}
    </div>
    `;
}

function myToodoo() {
    var ps = require('python-shell');
    var path = require('path');

    var name = document.getElementById('nameInput').value;
    var date = document.getElementById('dateInput').value;
    var id = document.getElementById('idInput').value;

    document.getElementById('nameInput').value = '';
    document.getElementById('dateInput').value = '';
    document.getElementById('idInput').value = '';

    var options = {
        scriptPath: path.join(__dirname, '/../engine/'),
        args: [name, date, id]
    };

    const eventAddSuccessTemplate = alertTemplate(
        `Event ${name} successfully added.`
    )

    var d1 = document.getElementById('submitButton');

    ps.PythonShell.run('toodoo.py', options, function (err, results) {
        if (err) throw err;
        d1.insertAdjacentHTML('afterend',eventAddSuccessTemplate);  
        swal(results[0]);
      });
}
