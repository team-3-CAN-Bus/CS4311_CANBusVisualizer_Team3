const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
var MongoClient = require('mongodb').MongoClient;
app.use(cors());
app.use(cors({ origin: '*' }));
app.use(express.json());

app.post('/addProject', (req, res) => {
  var url = "mongodb://localhost:27017/";
  //var projectName = req.body.name;
  //var projectLocation = req.body.location;
  let myobj = {
    projectName: req.body.name,
    projectLocation: req.body.location
  };
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db('projectConfig');
    dbo.collection('projectConfig').insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("Success");
      db.close;
    });
  });
  res.status(200).send({ status: 'recieved' })
})
app.listen(port, () => console.log('Listening on port: ' + port));