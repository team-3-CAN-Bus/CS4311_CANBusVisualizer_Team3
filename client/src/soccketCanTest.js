const can = require('socketcan');

var channel = can.createRawChannel("vcan0", true);

// Log any message
channel.addListener("onMessage", async function(msg) { 
    const res =await fetch('http://127.0.0.1:8383/message',{
        method: 'POST',
        headers:{
            "Content-Type": 'application/json'
        },
        body:JSON.stringify({
            parcel: msg
        })
    })
});//console.log(msg); } );

// Reply any message
//channel.addListener("onMessage", channel.send, channel);

channel.start();