var express = require('express'),
    app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var nickname;

//Mongoose stuff
mongoose.connect('mongodb://heroku_sl5t668c:d4gmc54o0iiei8jfqc27e2gife@ds033066.mlab.com:33066/heroku_sl5t668c');
var db = mongoose.connection;

db.on('error', function (err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function () {
  console.log('Mongoose connection successful.');
});

var Schema = mongoose.Schema;

var newUserSchema = new Schema({
	username: String,
	email: String
});

var newUser = mongoose.model('newUser', newUserSchema);

//Body Parser
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.static('www'));


app.post('/signUp', function(req, res){
	var username = req.body.username;
	var email = req.body.email;
	var userData = new newUser({username: username, email: email});
	userData.save(function (err, result){
		if(err){
			console.log(err);
			res.send('Sorry there was an error!');
		}
		else{
			res.send('Data successfully saved!');
		}
	});
	
});

app.post('/login', function(req, res){
	var email = req.body.email;
	newUser.findOne({email: email}, function(err, data){
		if(err){
			console.log(err);
			res.send('there was an error!');
		}
		else{
			//console.log(data);
			nickname = data.username;
			//console.log(nickname);
			res.json(data);
		}
	})
	
});

app.get('/main', function(req, res){
	res.sendfile('www/main.html');
});

app.get('/retrieve', function(req, res){
	res.send(nickname);
});

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// API Routes
// app.get('/blah', routeHandler);

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
