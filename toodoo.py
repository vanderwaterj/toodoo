import sqlite3
import datetime
import os.path
from event import Event

dbname = 'schedule.db'

conn = sqlite3.connect(dbname)
c = conn.cursor()

c.execute("""CREATE TABLE IF NOT EXISTS todo (
name text,
date text,
id integer primary key
)""")

def insert_event(event):
    with conn:
        try:
            c.execute(f"INSERT INTO todo VALUES (?, ?, ?)", (event.name, event.date, event.id))
        except sqlite3.IntegrityError:
            print(f'ID "{event.id}" is not unique.')

def delete_event(event):
    with conn:
        c.execute(f"DELETE FROM todo WHERE id=?", (event.id,))

my_event = Event("my_event", datetime.date.today(), 1)
insert_event(my_event)

conn.commit()
conn.close()