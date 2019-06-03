function alertTemplate(type, content) {
    return `
    <div class="alert-${type}">
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
        ${content}
    </div>
    `;
}

function addEvent() {
    const ps = require('python-shell');
    const path = require('path');

    const func = 1;
    const name = document.getElementById('nameInput').value;
    const date = document.getElementById('dateInput').value;

    const options = {
        scriptPath: path.join(__dirname, '../../engine/'),
        args: [func, name, date],
    };

    console.log(options);

    const eventAddSuccessTemplate = alertTemplate(
        'success', // type of alert
        `Event ${name} successfully added.`,
    );

    if ((name !== '') && (date !== '')) {
        ps.PythonShell.run('toodoo.py', options, (err, results) => {
            $(document).ready(() => {
                if (results == null) {
                    $('#submitButton').after(eventAddSuccessTemplate);
                } else {
                    $('#submitButton').after(alertTemplate('error', results[0]));
                }
            });

            if (err) throw err;
        });
    }
}

function deleteEvent() {
    const ps = require('python-shell');
    const path = require('path');

    const func = 2;
    const name = document.getElementById('nameInput').value;
    const date = document.getElementById('dateInput').value;

    const options = {
        scriptPath: path.join(__dirname, '../../engine/'),
        args: [func, name, date],
    };

    const eventDeleteSuccessTemplate = alertTemplate(
        'success', // type of alert
        `Event ${name} on ${date} successfully removed.`,
    );

    if ((name !== '') && (date !== '')) {
        ps.PythonShell.run('toodoo.py', options, (err, results) => {
            $(document).ready(() => {
                if (results == null) {
                    $('#submitButton').after(eventDeleteSuccessTemplate);
                } else {
                    $('#submitButton').after(alertTemplate('error', results[0]));
                }
            });

            if (err) throw err;
        });
    }
}

function listAllEvents() {
    const ps = require('python-shell');
    const path = require('path');

    const func = 3;

    const options = {
        scriptPath: path.join(__dirname, '../../engine/'),
        args: [func, null, null, null],
    };

    ps.PythonShell.run('toodoo.py', options, (err, results) => {
        for (let i = results.length - 1; i >= 0; i -= 1) {
            const myStr = results[i].slice(1, -1).toString().replace(/'/g, '').split(', ');
            const eventListing = alertTemplate('success',
                `
                Event "${myStr[0]}" on ${myStr[1]} with ID ${myStr[2]}
                `);

            $(document).ready(() => {
                $('#listAllButton').after(eventListing);
            });
        }

        if (err) throw err;
    });
}
