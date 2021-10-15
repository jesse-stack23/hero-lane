const {Client} = require('pg');
var express = require('express');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const client = new Client({
	connectionString: "postgres://fertcugcyczjpp:0458fa8a42c4a15c3a832b5f57633ee4afe1439e1031c51026fac9dcd6c566f1@ec2-54-167-152-185.compute-1.amazonaws.com:5432/d5fgkbi00p3hr4" ,
	ssl: true,
});

client.connect();

var myapp = express();
const path = require('path');
const router = express.Router();

myapp.use(function(req, res, next){
	req.headers['content-type'] = "application/json";
	next();
});

myapp.get('/', function(req, res){
	res.sendFile(__dirname);
	res.sendFile(path.join(__dirname + '/UI/index.html'));
});

myapp.use(express.static(__dirname + '/UI'));
myapp.use(bodyParser.urlencoded({extended: true}));
myapp.use(bodyParser.json());

myapp.post('/auth/signup', function(req, res){
	client.connect();
	var datae = {};
	var user = {};
	var mamail = req.body.email;
	var mauserName = req.body.userName;
	var mateamName = req.body.teamName;
	var mapassword = req.body.password;
	var maId = 3;
	
user['email'] = mamail;
user['password'] = mapassword;

client.query("SELECT user_id FROM accounts ORDER BY user_id DESC;" ,(errf, respf)=>{
			if(errf){
				
			}else{
				
				const text = "INSERT INTO accounts(user_id, username, teamname, password, email, created_on, last_login) VALUES(DEFAUlT, '"+ mauserName +"', '"+ mateamName +"', '"+ mapassword +"', '"+ mamail + "') RETURNING user_id; ";
				
				client.query(text,(err, resp) => {
					if(err){
						datae['status'] = 404;
						datae['error'] = "Error: Problem occured when signing up...";
						res.send(datae);
					}else{
						
						datae['status'] = 200;
						var arr = {};
						arr['user_id'] = resp.rows[0].user_id;
						arr['username'] = mauserName;
						arr['teamname'] = mateamName;
						arr['email'] = mamail;
						arr['password'] = mapassword;
						datae['data'] = arr;
						res.send(datae);
					}
				});
			}
		});		

});
const portr = process.env.PORT || 3000;
myapp.listen(portr);