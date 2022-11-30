const express = require('express');
const cors = require('cors');
const app = express();
const port = 8383;

app.use(cors());
app.use(cors({origin:'*'}));

//app.use(express.static("public"));
app.use(express.json());

const arr = [NaN];
var indx =0;
app.get('/buffer',(req,res) =>{
    //console.log('response');
    res.status(200).json(arr[indx]);//send('something');
    indx = indx+1;
    console.log(res.info);
})

app.post('/message',(req,res)=>{
    
    console.log(req.body);
    arr[indx] = req.body;
    //if(!parcel){return res.status(400).send({status: 'failed'})}
    res.status(200).send({status: 'recieved'})
})

app.post('/something',(req,res)=>{
    //const {parcel} =req.body
    console.log(req.body.somekey);
    //arr[indx] = parcel;
    if(!req.body){return res.status(400).send({status: 'failed'})}
    res.status(200).send({status: 'recieved'})
})
app.listen(port,()=> console.log('listening on port 8383'));