const {Client} = require('pg');
var express = require('express');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const connectStr = "postgres://evbwzlacegshgs:305f85b3d186ce49b82d933cc5a191350c1c0534fc9a04ae07f867a510a21d4a@ec2-3-220-90-40.compute-1.amazonaws.com:5432/d86178g12tqr2c";
const client = new Client({
	connectionString: connectStr,
	ssl: false,
});

client.connect();	

var myapp = express();
const path = require('path');
const router = express.Router();

myapp.use(function(req, res, next){ 
req.headers['content-type'] = "application/json"; 
next();
});

myapp.get('/', function(req, res) {
   res.sendFile( __dirname);
   res.sendFile(path.join(__dirname + '/UI/index.html'));
});
myapp.use(express.static(__dirname + '/UI'));
myapp.use(bodyParser.urlencoded({ extended: true }));
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
		
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';		
				const text = "INSERT INTO users (id, username, teamname, password, email) VALUES (DEFAULT ,'jerome', 'teamone', 'tesla56', 'olajt@gmailyyyyyyy.com')";
			
			
				client.query(text,(err, resp) => {
				
						if (err){
                           datae['status'] = 404;
                           datae['error'] = "Error: Problem occur when signing up...";
                           res.send(datae);
                           }else{
						   datae['status'] = 200;
						   var arr = {};
						   arr['id'] = 1;
						   arr['username'] = mauserName;
						   arr['teamname'] = mateamName;
				 		   arr['email'] = mamail;
						   arr['password'] = mapassword;
						   datae['data'] = arr;
						   res.send(datae);
						
					   }
		         });
		
		
});
const portr = process.env.PORT || 3000;
myapp.listen(portr);