var express = require('express');
var router = express.Router();
var path = require('path');
var auth = require('./api/auth.js');

router.use(express.static(__dirname + '/../assets'));
router.use(express.static(__dirname + '/../templates'))

router.get('/', function (req, res) {
	res.sendFile('app.html', { root: path.join(__dirname, '../layouts') });
})

router.get('/posts', function (req, res) {
	res.sendFile(path.join(__dirname, '../layouts/app.html'));
})

router.get('/register', function (req, res) {
	res.sendFile(path.join(__dirname, '../layouts/app.html'));
})

router.get('/login', function (req, res) {
	res.sendFile(path.join(__dirname, '../layouts/app.html'));
})

router.get('/menu', [auth], function (req, res) {
	res.sendFile(path.join(__dirname, '../layouts/app.html'));
})

router.get('/menulist', [auth], function (req, res) {
	res.sendFile(path.join(__dirname, '../layouts/app.html'));
})

router.get('/list', [auth], function (req, res) {
	res.sendFile(path.join(__dirname, '../layouts/app.html'));
})

router.get('/personal', [auth], function (req, res) {
	res.sendFile(path.join(__dirname, '../layouts/app.html'));
})

router.get('/edit', [auth], function (req, res) {
	res.sendFile(path.join(__dirname, '../layouts/app.html'));
})

router.get('/order', function (req, res) {
	res.sendFile(path.join(__dirname, '../layouts/app.html'));
})

router.get('/checkout', function (req, res) {
	res.sendFile(path.join(__dirname, '../layouts/app.html'));
})

router.get('/complete', function (req, res) {
	res.sendFile(path.join(__dirname, '../layouts/app.html'));
})

module.exports = router;