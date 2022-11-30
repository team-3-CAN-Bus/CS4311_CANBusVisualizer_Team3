
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://dhernandez79:DEVCOM12@cluster0.qe1gcvs.mongodb.net/test";

var myobj = [{id:"01", canv:"0", packet_data:"insertmany1"}, {id:"02", canv:"0", packet_data:"many2"}]
// var myobj_1 = {id:"01", canv:"0", packet_data:"one1"}

//     try {
//         MongoClient.connect(url, function(err, db) {
//             if (err) throw err;
//             var dbo = db.db("packet_test");//change this name: packet_test
//             dbo.collection("packet-test").insertOne(myobj_1, function(err, res) {//change the packet_test here too
//               if (err) throw err;
//               console.log("1 document inserted");
//               db.close();
//             });
//           });
    
//       } catch (error) {
//         console.log(error);
//       }

//          to insert whole array
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("packet_test");
    dbo.collection("packet_test").insertMany(myobj, function(err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
    });
});