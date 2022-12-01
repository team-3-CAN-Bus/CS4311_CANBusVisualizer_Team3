const express = require('express');
const cors = require('cors');
const app = express();
const port = 8383;

app.use(cors());
app.use(cors({ origin: '*' }));

//app.use(express.static("public"));
app.use(express.json());

const arr = [NaN];
var indx = 0;
app.get('/buffer', (req, res) => {
    if (arr[indx] != null) {
        console.log('response');
        res.status(200).json(arr[indx]);//send('something');
        indx = indx + 1;
        console.log(res.info);
    } else { return res.status(400).send({ status: 'failed' }) }
})

app.post('/message', (req, res) => {
    console.log(req.body);
    //arr[indx] = req.body;
    arr.push(req.body);
    //if(!parcel){return res.status(400).send({status: 'failed'})}
    res.status(200).send({ status: 'recieved' })
})

app.post('/something', (req, res) => {
    //const {parcel} =req.body
    console.log(req.body.somekey);
    //arr[indx] = parcel;
    if (!req.body) { return res.status(400).send({ status: 'failed' }) }
    res.status(200).send({ status: 'recieved' })
})

app.post('/save_packet', (req, res) => {
    //Demys script...try to save array, even if empty, or fill arr to test saving
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/";
    let myobj = { packet: req.body.packet };

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db('packet_test');
        dbo.collection('packet_test').insertMany(myobj, function (err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            db.close;
        });
    });

    res.status(200).send({ status: 'recieved' })

})

app.listen(port, () => console.log('listening on port 8383'));