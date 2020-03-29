var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  // table ETD
  var myobj = [
    {numApg:'182201',nom: 'ycb',prenom: 'hakim',dateNes:'01',filiere:'GI2', id_device : "55"},
    {numApg:'182202',nom: 'lgd',prenom: 'ghani',dateNes:'02',filiere:'GI2', id_device : "11111111"},
    {numApg:'182203',nom: 'abc',prenom: 'ali',dateNes:'03',filiere:'IDSD', id_device : ""},
    {numApg:'182204',nom: 'hamodi',prenom: 'karim',dateNes:'04',filiere:'TM2', id_device : null},
    {numApg:'182122',nom: 'LAQDOUR',prenom: 'Abdelghani',dateNes:'23-04-2000',filiere:'GI2', id_device : null},

  ];
  dbo.collection("etd").insertMany(myobj, function(err, res){
    if (err) throw err;
    console.log("\nNumber of documents inserted: " + res.insertedCount+"\n");
    db.close();
  }); 

});