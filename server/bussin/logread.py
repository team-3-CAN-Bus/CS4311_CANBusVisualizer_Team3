import can
import cantools
import os
import json

class read():

    def __init__(self):
        self.pkt=None
        self.cwd = os.getcwd()
        self.db = cantools.db.load_file(self.cwd + "/CANBusReader/j1939_1.dbc")
        self.bus = can.interface.Bus(bustype='socketcan', channel='vcan0', bitrate = 1000)
        self.db_msg = self.db.get_message_by_name("Message")
        self.json = []
        self.decoded_json = []


def recvDBC(self):

    while True:
        msg = self.bus.recv(4)
        print("Message: ", msg)
        print("Channel Info", self.bus.channel_info, ".")
        if msg:
            self.decoded - self.db.decode_message(msg.arbitration_id, msg.data)
            print("Decoded Message:", self.db.decode_message(msg.arbitration_id, msg.data))
            self.packet =  msg

            if self.pkt:
                self.writeJson()
                self.writeDecodedJson()


def DecodedJSON(self, filename = "decoded_json.json"):
    with open(filename, "w", encoding = 'utf8') as file:
        self.decoded = str(self.decoded)
        values = self.decoded.split()
        self.decoded_json.append({
            "Enable": values[1],
            "AverageRadius": values[3],
            "Temperature": values[5],
        })

        json.dump(self.decoded_json, file, indent=2)
        print("Decoded JSON: ")


def EncodedJSON(self, filename = "json.json"):
    with open(filename, "w", encoding = 'utf8') as file:
        self.pkt = str(self.pkt)
        values = self.pkt.split()