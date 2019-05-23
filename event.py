class Event:
    """Class to be manipulated for handling of events"""

    def __init__(self, name, date, id):
        self.name = name
        self.date = date
        self.id = id

    def __repr__(self):
        return f"Event: ('{self.name}','{self.date}','{self.id}')"
