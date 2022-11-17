


self.onmessage = function (message) {
 
    //let length = parseInt(message.data)
    console.log('something from the other side');
    console.log(message.data);

    //let obj = JSON.parse(JSON.stringify(obj));
    self.postMessage(message.data);
  };