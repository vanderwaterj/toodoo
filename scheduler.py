import sqlite3
import datetime
from event import Event

conn = sqlite3.connect('schedule.db')
c = conn.cursor()

c.execute("""CREATE TABLE todo (
    name text,
    date text,
    id integer
    )""")

def insert_event(event):
    with conn:
        c.execute(f"INSERT INTO todo VALUES (:name , :date, :id)",
                  {'name': event.name, 'date': event.date, 'id': event.id})

count = c.execute("SELECT COUNT(*) FROM todo").fetchone()[0]
today = Event("my_event", datetime.date.today(), count)

insert_event(today)

c.execute(f"SELECT * FROM todo WHERE date='{today.date}'")

print(c.fetchall())

conn.commit()
conn.close()
