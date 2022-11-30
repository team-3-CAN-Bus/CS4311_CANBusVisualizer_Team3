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
    res.status(200).json({info:arr[indx]});//send('something');
    indx = indx+1;
    console.log(res.info);
})

app.post('/message',(req,res)=>{
    const {parcel} =req.body
    console.log(parcel);
    arr[indx] = parcel;
    if(!parcel){return res.status(400).send({status: 'failed'})}
    res.status(200).send({status: 'recieved'})
})

app.get('/save_packet',(req,res)=>{
    console.log('success');
    //const {parcel} =req.body
    console.log(arr);
    //Demys script...try to save array, even if empty, or fill arr to test saving
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://dhernandez79:DEVCOM12@cluster0.qe1gcvs.mongodb.net/test";
    var myobj = [{id:"01", canv:"0", packet_data:"insertmany1"}, {id:"02", canv:"0", packet_data:"many2"}]

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("packet_test");
        dbo.collection("packet_test").insertMany(myobj, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            db.close();
        });
    });

    res.status(200).send({status: 'recieved'})

})


app.listen(port,()=> console.log('listening on port 8383'));