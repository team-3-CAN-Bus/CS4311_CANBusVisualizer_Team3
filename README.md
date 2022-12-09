# CAN-Bus-Visualizer

Languages and Technologies:

    - LiveServer Extension for VisualStudios
    - CanUTILS
    - Node.js
    - Express.js
    - HTML
    - Python

We were able to implement the following functionalities:

    - MongoDB Integration
    - Traffic Integration (using the DBC and Traffic Log provided by the DEVCOM Team)
    - Packet Visualization
    - Node Visualization
    - Filtering/Sorting (Partially Implemented, functional on Windows) 
    
We did not implement the following functionalities:

    - Archive Projects
    - Export Projects
    - Sync Projects 
    
To start the project:

Start an instance of MongoDB Compass and connect to the default local string:

    - mongodb://127.0.0.1:27017

In the Server folder (cd server):
    
    node trafficServer.js
    
In the Server folder (cd server):
    
    node server.js

In the Client folder (cd client/src):

    python main.py 
    
In a terminal instance started from the CanTools folder:

    sudo modprobe vcan
    sudo ip link add dev can0 type vcan
    sudo ip link set up can0
    canplayer -I workingTraffic.log can0=can0
