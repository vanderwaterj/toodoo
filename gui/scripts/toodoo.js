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
                resolve(selectionArray); // resolve the promise
            });
        });
    });

    const results = await promise;
    return results;
}

// -------------------- Other --------------------

function sortIntoDates(myEvents) {
    const len = myEvents.length;

    const eventList = [];
    const dateList = [];

    for (let i = 0; i < len; i += 1) {
        if (dateList.includes(myEvents[i].date)) {
            eventList[dateList.indexOf(myEvents[i].date)].push(myEvents[i]);
        } else {
            dateList.push(myEvents[i].date);
            eventList.push([myEvents[i]]);
        }
    }

    return [eventList, dateList];
}

function dateName(dateString) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const myDate = new Date(dateString); // .toJSON().slice(0, 10);
    const dayName = days[myDate.getDay()];

    return dayName;
}

function displayUpcomingDateNames(dateString) {
    const today = new Date();
    const myDate = new Date(dateString);
    const dayDiff = Math.ceil((myDate.getTime() - today.getTime()) / (1000 * 3600 * 24));

    switch (dayDiff) {
    case -7:
    case -6:
    case -5:
    case -4:
    case -3:
    case -2: {
        return `Last ${dateName(dateString)}`;
    }
    case -1: {
        return 'Yesterday';
    }
    case 0: {
        return 'Today';
    }
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6: {
        return dateName(dateString);
    }
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13: {
        return `Next ${dateName(dateString)}`;
    }
    default: {
        const mm = parseInt(dateString.slice(5, 7), 10);
        const dd = parseInt(dateString.slice(8, 10), 10);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return `${months[mm - 1]} ${dd}`;
    }
    }
}
// -------------------- DOM Manipulation Functions --------------------

async function displayUpcomingEvents(parentDiv, datesToDisplay) {
    const myEvents = listAllEvents();

    myEvents.then((result) => {
        const sortedToDates = sortIntoDates(result);
        const eventList = sortedToDates[0];
        const numDates = sortedToDates[1].length;

        if (result.length === 0) {
            $(`#${parentDiv}`).append('<p class="dateTitle">No events found.</p>');
        }

        const displayUntil = (datesToDisplay == null ? numDates : datesToDisplay);

        for (let i = 0; i < displayUntil; i += 1) {
            $(`#${parentDiv}`).append(`<div class = "dateBox" id="${eventList[i][0].date}"><p class="dateTitle">${displayUpcomingDateNames(eventList[i][0].date)}</p></div>`);
            for (let j = 0; j < eventList[i].length; j += 1) {
                $(`#${eventList[i][j].date}`).append(`<li>${eventList[i][j].name}</li>`);
            }
        }
    });
}
