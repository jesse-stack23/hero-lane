const {client} = require('pg');
var express = require('express');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const client = new client({
	connectionString: "postgres://fertcugcyczjpp:0458fa8a42c4a15c3a832b5f57633ee4afe1439e1031c51026fac9dcd6c566f1@ec2-54-167-152-185.compute-1.amazonaws.com:5432/d5fgkbi00p3hr4" ,
	ssl: true,
});

client.connect();

var myapp = express();
const path = require('path');
const router = express.Router();

myapp.get('/' function(req, res){
	res.sendFile(__dirname);
	res.sendFile(path:join(__dirname + '/UI/index.html'));
});

myapp.use(express.static(__dirname + '/UI'));
myapp.use(bodyParser.urlencoded({extended: true}));
myapp.use(bodyParser.json());

myapp.post('/auth/signup', function(req, res){
	client.connect();
	
	var datae = {};
	var user = {};
	var mamail = req.body.email;
	var mafirst_name = req.body.first_name;
	var mateam_name = req.body.last_name;
	var mapassword = req.body.Password;
	var maId = 3;
	
user['email'] = mamail;
user['secretKey'] = mapassword;
jwt.sign(user, mapassword, {expiresIn: '/h'},(errt, token) => {
	
	if(errt){
		datae['status'] = 404;
		datae['error'] = "Error: Connection Not Secure...";
		res.send(datae);
	}else{
		client.query("SELECT id FROM users ORDER BY id DESC;" ,(errf, respf)=>{
			if(errf){
				
			}else{
				var newid = respf.rows[0].id + 1;
				const text = "INSERT INTO users(id, user_name, team_name, password, email) VALUES ('" + newId +"', '"+ mauser_name +"', '"+ mateam_name +"', '"+ mapassword +"', '"+ mamail + "') RETURNING id; ";
				
				client.query(text,(err, resp) => {
					if(err){
						datae['status'] = 404;
						datae['error'] = "Error: Problem occured when signing up...";
						res.send(datae);
					}else{
						
						datae['status'] = 200;
						var arr = {};
						arr['id'] = resp.rows[0].id;
						arr['first_name'] = mafirst_name;
						arr['last_name'] = malast_name;
						arr['email'] = mamail;
						arr['secretKey'] = mapassword;

						datae['data'] = arr;
						res.send(datae);
					}
				});
			}
		});		
	}
});

});
const potr = process.env.PORT || 3000;

myapp.listen(portr)	;