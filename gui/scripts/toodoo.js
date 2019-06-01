function alertTemplate(type, content) {
    return `
    <div class="alert-${type}">
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
        ${content}
    </div>
    `
}

function addEvent() {
    let ps = require('python-shell');
    let path = require('path');

    let func = 1;
    let name = document.getElementById('nameInput').value;
    let date = document.getElementById('dateInput').value;
    let id = document.getElementById('idInput').value; 

    let options = {
        scriptPath: path.join(__dirname, '../../engine/'),
        args: [func, name, date, id]
    };

    const eventAddSuccessTemplate = alertTemplate(
        'success',
        `Event ${name} successfully added.`
    )

    if ((name != "") && (date != "") && (id != "")) {
        ps.PythonShell.run('toodoo.py', options, function (err, results) {
            console.log(results);
    
            $(document).ready(() => {
                if (results == null){
                    $('#submitButton').after(eventAddSuccessTemplate);
                } else {
                    $('#submitButton').after(alertTemplate('error', results[0]))
                }
            });   
    
            if (err) throw err;
          });
    }
}

function deleteEvent() {
    let ps = require('python-shell');
    let path = require('path');

    let func = 2;

    let id = document.getElementById('idInput').value; 

    let options = {
        scriptPath: path.join(__dirname, '../../engine/'),
        args: [func, null, null, id]
    };

    const eventDeleteSuccessTemplate = alertTemplate(
        'success',
        `Event ID (${id}) successfully removed.`
    )

    if (id != "") {
        ps.PythonShell.run('toodoo.py', options, function (err, results) {
            console.log(results);
    
            $(document).ready(() => {
                if (results == null) {
                    $('#submitButton').after(eventDeleteSuccessTemplate);
                } else {
                    $('#submitButton').after(alertTemplate('error', results[0]))
                }
            });   
    
            if (err) throw err;
          });
    }
}

function listAllEvents() {
    let ps = require('python-shell');
    let path = require('path');
}