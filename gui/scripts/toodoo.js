// -------------------- HTML Templates --------------------

function alertTemplate(type, content) {
    return `
    <div class="alert-${type}">
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
        ${content}
    </div>
    `;
}

// -------------------- Crypto Functions --------------------

function hashString(str) {
    const crypto = require('crypto');
    const hash = crypto.createHash('md5').update(str).digest('hex').slice(0, 16);

    return hash;
}

// -------------------- SQL Functions --------------------

function dbCommand(sqlstr, params, successMessage) {
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('schedule.db');

    db.serialize(() => {
        db.run(`
        CREATE TABLE IF NOT EXISTS todo (
            name text,
            date text,
            id text primary key
            )
        `);

        db.run(sqlstr, params, (err) => {
            if (err) {
                $('#submitButton').after(alertTemplate('error', err));
            } else {
                $('#submitButton').after(alertTemplate('success', successMessage));
            }
        });

        db.close();
    });
}

function addEvent() {
    const name = document.getElementById('nameInput').value;
    const date = document.getElementById('dateInput').value;

    if ((name !== '') && (date !== '')) {
        dbCommand('INSERT INTO todo VALUES (?, ?, ?)', [name, date, hashString(name + date)], `Event ${name} successfully added.`);
    }
}

function deleteEvent() {
    const name = document.getElementById('nameInput').value;
    const date = document.getElementById('dateInput').value;

    if ((name !== '') && (date !== '')) {
        dbCommand('DELETE FROM todo WHERE name=? AND date=?', [name, date], `Event ${name} on ${date} successfully removed.`);
    }
}


async function listAllEvents() {
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('schedule.db');

    const selectionArray = [];

    const promise = new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`
            CREATE TABLE IF NOT EXISTS todo (
            name text,
                date text,
                id text primary key
                )
            `);

            db.all('SELECT * FROM todo ORDER BY date', [], (err, rows) => {
                if (err) {
                    // add code here to reject promise
                    throw err;
                }

                rows.forEach((row) => {
                    selectionArray.push(row);
                });
                resolve(selectionArray);// resolve the promise
            });
        });
    });

    const results = await promise;
    return results;
}

// -------------------- DOM Manipulation Functions --------------------

async function displayUpcomingEvents() {
    const myEvents = listAllEvents();

    myEvents.then((result) => {
        for (let i = 0; i < result.length; i += 1) {
            $('#upcomingEvents').prepend(`<li>${result[i].name}</li>`);
        }
    });
}
