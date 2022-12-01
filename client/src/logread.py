import can
import cantools
import os
import json
import requests
import re


class read():

    def __init__(self):
        self.pkt=None
        self.cwd = os.getcwd()
        self.db = cantools.db.load_file(self.cwd + "/j1939_1.dbc")
        self.bus = can.interface.Bus(bustype='socketcan', channel='can0', bitrate = 125000)
        self.db_msg = self.db.get_message_by_name("GFD")
        self.json = []
        self.decoded_json = []

    def int_to_hex(self, nr):
        h = format(int(nr), 'x')
        return '0' + h if len(h) % 2 else h

    def recvDBC(self):
        print("logread recvDBC entered")
        msg = self.bus.recv(4)
        while msg:
            msg = self.bus.recv(4)
            print("Message: ", msg)
            print("Channel Info", self.bus.channel_info, ".")
            if msg:
                msg_arbID = self.int_to_hex(msg.arbitration_id)
                self.decoded = self.db.decode_message(msg.arbitration_id,msg.data)
                print("Decoded Message:", self.db.decode_message(msg.arbitration_id, msg.data))
                self.pkt =  msg

                if self.pkt:
                    self.EncodedJSON()
                   # self.DecodedJSON()



    def DecodedJSON(self, filename = "decoded_json.json"):
        with open(filename, "w", encoding = 'utf8') as file:
            self.decoded = str(self.decoded)
            values = re.split(r'[,:]', self.decoded)
           # i = 0
           # while(i < len(values)-1):

               # r = requests.post('http://127.0.0.1:8383/message', json={
               # "Component": values[i],
                #"Value": values[i+1],
               # })
                #print(f"Status code: {r.status_code}, Response: {r.json()}")
               # i = i+2
        #json.dump(self.decoded_json, file, indent=2)
        #print("Decoded JSON: ")


    def EncodedJSON(self, filename = "json.json"):
        with open(filename, "w", encoding = 'utf8') as file:
            self.pkt = str(self.pkt)
            values = self.pkt.split()
            len = " ".join(values[8:15])
            channel = values[17]
            annotate = '-'
            self.json.append({
                "timestamp": values[1],
                "id": values[3],
                "s": values[5],
                "len": len,
                "channel": channel,
                "annotate": annotate
            })
            json.dump(self.json, file, indent=4)
            print("JSON created ...")
            self.POSTJSON()
    
    
    def POSTJSON(self):
        self.pkt = str(self.pkt)
        values = self.pkt.split()
        len = " ".join(values[8:15])
        channel = values[17]
        annotate = '-'
        r = requests.post('http://127.0.0.1:8383/message', json={
            "timestamp": values[1],
            "id": values[3],
            "s": values[5],
            "len": len,
            "channel": channel,
            "annotate": annotate
        })
        print(f"Status code: {r.status_code}, Response: {r.json()}")