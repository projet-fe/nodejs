var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Abdelhakim:Abdelhakim123@qrproject-vweio.mongodb.net/test?retryWrites=true&w=majority";

//====================================== Login ====================================//

app.get('/user/:user/:pass/:id',(req,res)=>{
	var user = req.params.user;
    var pass = req.params.pass;
    var id = req.params.id;
	var quiry = {numApg: user , Date_naissance: pass};
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("Etudiant");
		dbo.collection("etudiants").find(quiry).toArray(function(err, result) {
			if (err) throw err;
			if(result.length > 0){
				if(result[0]['id_device'] == ""){
					ajouter(user, id,dbo);
					res.json({rep:'true',info:result});
				}else{
                    if(id == result[0]['id_device']){
                        res.json({rep:'true',info:result});
                    }else{
                        res.json({rep:'id_x'});
                    }
				}
			}else{  
				res.json({rep:'false'});
			}
			db.close();
		});
	});  
});
function ajouter(num , id_dev,dbo){
    var quiry = {numApg : num};
    var setvalue = {$set : {id_device : id_dev}};
        dbo.collection("etudiants").updateOne(quiry, setvalue, function(err){
            if(err) throw err; 
        });
}

//====================================== Present ====================================//

app.get('/present/:date_sc/:filiere/:id_sc/:numApg',(req,res)=>{
    var date_sc = req.params.date_sc;
    var id_sc = req.params.id_sc;
    var filiere = req.params.filiere;
    var numApg = req.params.numApg;
    var quiry = {"date":date_sc,"filiere":filiere,"qr":id_sc,"etudiants.numApg":numApg};
    var setvalue = {$set:{"etudiants.$.etat":"present"}};
    var fields = {fields:{_id:0,"etudiants.numApg":1,"etudiants.$.etat":1}};
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
        var dbo = db.db("Etudiant");
        dbo.collection("cours").find(quiry, fields).toArray(function(err, result) {
            if (err) throw err;
            if(result.length>0){
                if(result[0]["etudiants"][0]["etat"] == "present"){
                    res.json({rep:"present"});
                }else{
                    changeState(quiry,setvalue,dbo);
                    res.json({rep:"present"});
                }
            }else{
                res.json({rep:"false"});//problem in the QRcode
            } 
            db.close();
        });
	});  
});

/*------------- change to present --------------*/

function changeState(quiry,setvalue,dbo){
    dbo.collection("cours").updateOne(quiry,setvalue, function(err, result) {
        if (err) throw err;
        console.log(result.result.nModified + " present");
    });
    dbo.collection("cours").update(quiry,{$inc:{nb_scans:1}}, function(err, result) {
        if (err) throw err;
        console.log(result.result.nModified + " increment");
    });
}


app.listen(8008,()=>{
    console.log("lestening to 8008\n");
});