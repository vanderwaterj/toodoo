import sqlite3
import datetime
import os.path
import sys
from event import Event

dbname = 'engine/schedule.db'

conn = sqlite3.connect(dbname)
c = conn.cursor()

c.execute("""CREATE TABLE IF NOT EXISTS todo (
name text,
date text,
id text primary key
)""")

def vali_date(date_text): # Very funny, I know
    try:
        datetime.datetime.strptime(date_text, '%Y-%m-%d')
        return 0
    except ValueError:
        print("Incorrect data format, should be YYYY-MM-DD")
        return 1

def insert_event():
    event_name = sys.argv[2]
    event_date = sys.argv[3]

    event = Event(event_name, event_date)

    with conn:
        try:
            c.execute(f"INSERT INTO todo VALUES (?, ?, ?)", (event.name, event.date, event.id))
        except sqlite3.IntegrityError:
            print(f'Error: Event ID ({event.id}) is not unique.')

def delete_event():
    event_name = sys.argv[2]
    event_date = sys.argv[3]

    with conn:
        c.execute(f"DELETE FROM todo WHERE name=? AND date=?", (event_name, event_date))

def list_events():
    with conn:
        c.execute("SELECT * FROM todo")

    events = sorted(c.fetchall(), key=lambda x: datetime.datetime.strptime(x[1], '%Y-%m-%d'))

    for event in events:
        print(event)

func = int(sys.argv[1])

if (func == 1):
    insert_event()
elif (func == 2):
    delete_event()
elif (func == 3):
    list_events()

sys.stdout.flush()

conn.commit()
conn.close()