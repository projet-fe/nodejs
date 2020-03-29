var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  // table SEANCE
  var myobj = [
    {date_sc:getDate(), id_sc:'111111' ,filiere:'GI2',etds:	[
                                                              {numApg:'182201',etat:'absent'},
                                                              {numApg:'182202',etat:'absent'},
                                                              {numApg:'182203',etat:'absent'},
                                                              {numApg:'182204',etat:'absent'},
                                                              {numApg:'182205',etat:'absent'},
                                                            ],},
    {date_sc:getDate(), id_sc:'222222' ,filiere:'GI',etds:	[
                                                              {numApg:'182201',etat:'absent'},
                                                              {numApg:'182202',etat:'absent'},
                                                              {numApg:'182203',etat:'absent'},
                                                              {numApg:'182204',etat:'absent'},
                                                              {numApg:'182205',etat:'absent'},
                                                            ],}
    ];
  dbo.collection("seance").insertMany(myobj, function(err, res){
    if (err) throw err;
    console.log("\nNumber of documents inserted: " + res.insertedCount+"\n");
    db.close();
  }); 
}); 

function getDate(){
  let date_ob = new Date(Date.now());
  let day = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let hr = date_ob.getUTCHours();
  let min = date_ob.getUTCMinutes();
  return  day+ "-" + month + "-" +year +" "+hr+":"+min;
}