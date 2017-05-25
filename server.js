var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');

var fs = require('fs');
var https = require('https')

var options = {
    key: fs.readFileSync('./ssl/privatekey.pem'),
    cert: fs.readFileSync('./ssl/certificate.pem')
};

var Post = require('./models/post');
var User = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());

app.use(require('multer')({dest:__dirname + '/img'}));

app.use(require('./controllers/static'));
//app.use(require('./auth'))
app.use('/api/posts', require('./controllers/api/posts'))
app.use('/api/sessions', require('./controllers/api/sessions'))
app.use('/api/users', require('./controllers/api/users'))
app.use('/api/menu', require('./controllers/api/menu'))
app.use('/api/order', require('./controllers/api/order'))
app.use('/api/checkout', require('./controllers/api/checkout'))
app.use('/api/personal_order', require('./controllers/api/personal_order'))
app.use('/api/history_order', require('./controllers/api/history_order'))
app.use('/api/history_position', require('./controllers/api/history_position'))

app.use('/api/mobile/login', require('./controllers/api/mobile/login'))
app.use('/api/mobile/register', require('./controllers/api/mobile/register'))
app.use('/api/mobile/position', require('./controllers/api/mobile/position'))

var server = app.listen(3001, function () {
	console.log('Server listening on', 3001);
});

//require('./websockets').connect(server)

var htpps_server = https.createServer(options, app).listen(3011, function () {
    console.log('Https server listening on port ' + 3011);
});

require('./websockets').connect(htpps_server)