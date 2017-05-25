var router = require('express').Router()
var bcrypt = require('bcrypt')
var jwt = require('jwt-simple')
var User = require('../../models/user')
var config = require('../../config')

router.get('/', function (req, res, next) {
	if (!req.headers['authorization']) {
		return res.send(401)
	}

	try{
		var auth = jwt.decode(req.headers['authorization'], config.secret)
	}catch(err){
		return next()
	}
	
	User.findOne({useraccount: auth.useraccount}, function (err, user) {
		if (err) { return next(err) }
		res.json(user)
	})
})

router.post('/', function (req, res, next) {
	// console.log('register received!');
	// console.log(req.body.useraccount);
	// console.log(req.body.password);
	//res.send(201);
	User.findOne({useraccount: req.body.useraccount}, function (err, user) {
		if (err) { return next(err) }
		if (user) {
			//err = "Username already exists."
			req.flash('err', 'Username already exists.')
			//console.log(req.flash('err'))
			//return res.send(JSON.stringify(req.flash('err')))
			return res.send(401, JSON.stringify(req.flash('err')));
			//return res.send(req.flash('err'))
			//return res.redirect('/register');
			//return res.send(201);
		}
		var user = new User({
			username: req.body.username,
			useraccount: req.body.useraccount,
			sex: req.body.sex,
			phone: req.body.phone,
			email: req.body.email,
			address: req.body.address,
			born: req.body.born
		})
		bcrypt.hash(req.body.password, 10, function (err, hash) {
			if (err) { return (err) };
			user.password = hash
			user.save(function (err) {
				if (err) { return next(err) }
				res.send(201)
			})
		})
	})
})

module.exports = router