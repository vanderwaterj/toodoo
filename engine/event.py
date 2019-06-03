import hashlib

def get_id(name, date):
    namedate = name + date
    bytecode = namedate.encode(encoding='UTF-8')
    hash_object = hashlib.md5(bytecode)
    hex_dig = hash_object.hexdigest()

    return hex_dig

class Event:
    """Class to be manipulated for handling of events"""
    def __init__(self, name, date):
        self.name = name
        self.date = date
        self.id = get_id(name, date)

    def __repr__(self):
        return f"Event: ('{self.name}','{self.date}','{self.id}')"