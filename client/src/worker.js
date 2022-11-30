//import createRawChannel from "../node_modules/socketcan/dist/socketcan";
//import ("../node_modules/socketcan/dist/socketcan.js");
//const can = require('socketcan');

//var channel = can.createRawChannel("vcan0", true);

// Log any message
//channel.addListener("onMessage", function(msg) { console.log(msg); } );

// Reply any message
//channel.addListener("onMessage", channel.send, channel);

//channel.start();
function sleep(milliseconds) {  
  return new Promise(resolve => setTimeout(resolve, milliseconds));  
}

var listen = false;

self.onmessage = async function (message) {
  if(message.data == "read"){
    listen = true;
    while(listen == true){
      await sleep(5000);
      const response = await fetch('http://127.0.0.1:8383/buffer',{method: 'GET'})
      //console.log(response)
      const data = await response.json();
      console.log(data.info);
      if(data != ""){
        self.postMessage(data);
      }
      
      
    }
  }else{
    listen = false;
  }


    //let length = parseInt(message.data)
    //console.log('something from the other side');
    //console.log(message.data);
    //const array = [0,0,0,0];
    // Log any message
    //channel.addListener("onMessage", function(msg) { console.log(msg);    self.postMessage(msg); } );

    // Reply any message
    //channel.addListener("onMessage", channel.send, channel);
    //channel.start();
    //let obj = JSON.parse(JSON.stringify(obj));
    

  }