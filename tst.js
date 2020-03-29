var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Abdelhakim:Abdelhakim123@qrproject-vweio.mongodb.net/test?retryWrites=true&w=majority";

//====================================== Login ====================================//
app.get('/user/tst',(req,res)=>{

	var quiry = {};
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("Etudiant");
	
		dbo.collection("etudiants").find(quiry).toArray(function(err, result) {
			if (err) throw err;
			if(result.length > 0){
                var dt = result;
				res.json({rep:"true",seance:dt});
			}else{  
				res.json({rep:'VIIIIIDE'});
			}
			db.close();
		});
	});  
});

app.listen(8899,()=>{
    console.log("lestening to 8899\n");
});