import can
import cantools
import os

class write():
    def __init__(self):
        self.cwd = os.getcwd()
        self.db = cantools.db.load_file(self.cwd + "/j1939_1.dbc")
        self.bus = can.interface.Bus(bustype='socketcan', channel = 'vcan0', bitrate = 125000)
        self.db_msg = self.db.get_message_by_name("RBR") 

    def sendDBC(self):
        self.msgData = self.DBCmsg.encode({'Enable': 1, 'AverageRadius': 1, 'Temperature': 251})
        self.msg = can.Message(arbitration_id=self.DBCmsg.frame_id, data=self.msgData, is_extended_id=False)

        try:
            self.bus.send(self.msg)
            print("Message sent on {}".format(self.bus.channel_info), self.msg)

        except can.CanError:
            print("Message failed.")
