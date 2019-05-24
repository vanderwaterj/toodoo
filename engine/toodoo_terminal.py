import sqlite3
import datetime
import os.path
import sys
from event import Event

dbname = 'schedule.db'

conn = sqlite3.connect(dbname)
c = conn.cursor()

c.execute("""CREATE TABLE IF NOT EXISTS todo (
name text,
date text,
id integer primary key
)""")

def generate_query(elements):
    query_string = "Select:\n"

    for index, element in enumerate(elements):
        query_string += f"\t{index + 1}.) {element}\n"
    query_string += "?.) "
    
    user_choice = input(query_string)

    return user_choice

def vali_date(date_text): # Very funny, I know
    try:
        datetime.datetime.strptime(date_text, '%Y-%m-%d')
        return 0
    except ValueError:
        print("Incorrect data format, should be YYYY-MM-DD")
        return 1

def insert_event():
    event_name = input("Event name: ")

    event_date = input("Event date: (YYYY-MM-DD) ")
    while (vali_date(event_date) == 1):
        event_date = input("Event date: (YYYY-MM-DD) ")

    event_id   = int(input("Event ID: "))

    event = Event(event_name, event_date, event_id)

    with conn:
        try:
            c.execute(f"INSERT INTO todo VALUES (?, ?, ?)", (event.name, event.date, event.id))
        except sqlite3.IntegrityError:
            print(f'Error: Event ID "{event.id}" is not unique.')

def delete_event():
    id = int(input("Event ID: "))

    with conn:
        c.execute(f"DELETE FROM todo WHERE id=?", (id,))

def list_events():
    with conn:
        c.execute("SELECT * FROM todo")

    events = sorted(c.fetchall(), key=lambda x: datetime.datetime.strptime(x[1], '%Y-%m-%d'))

    for index, event in enumerate(events):
        print(f"({index + 1}) {event[1]}: {event[0]}")

loop = True

while (loop): # Main loop
    menu_input = generate_query(["Add Event", "Delete Event", "List Events", "Exit"])
    
    if (menu_input == "1"):
        insert_event()
    elif (menu_input == "2"):
        delete_event()
    elif (menu_input == "3"):
        list_events()
    elif (menu_input == "4"):
        loop = False

conn.commit()
conn.close()