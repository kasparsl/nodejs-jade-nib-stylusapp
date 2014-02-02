//module dependencies
var express = require('express');
var stylus = require('stylus');
var nib = require('nib');


//server port number
var portnumber = 3000;

//Init Express
var app = express();
console.log('Express has been initialized');

function compile(str,path) {
	return stylus(str)
	.set('filename', path)
	.use(nib())
}


//set Views folder
app.set('views', __dirname+'/views');

//init Jade
app.set('view engine', 'jade');
console.log('Jade has been initialized');

//Stylus Middleware
app.use(express.logger('dev'));

//to have static files in /public folder
app.use(stylus.middleware(
	{
			src:__dirname + '/public',
			compile: compile
	}

))

app.use(express.static(__dirname+ '/public'));


//Render index page
app.get('/', function(req,res){
		res.render('index', 
		{title: 'Hi there!'}
		);	
});

app.listen(portnumber);
console.log('Server is UP on port ' + portnumber);
