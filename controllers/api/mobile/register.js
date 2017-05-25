var router = require('express').Router();
var User = require('../../../models/user')
var bcrypt = require('bcrypt')

router.post('/', function (req, res, next) {
	User.findOne({useraccount: req.body.ac}, function (err, user) {
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
			username: req.body.name,
			useraccount: req.body.ac,
			sex: req.body.sex,
			phone: req.body.phone,
			email: req.body.email,
			address: req.body.address,
			born: (req.body.year + "" + req.body.month + "" + req.body.day)
		})
		bcrypt.hash(req.body.pw, 10, function (err, hash) {
			if (err) { return (err) };
			user.password = hash
			user.save(function (err) {
				if (err) { return next(err) }
				res.status(200).send(req.body.name + " 您已完成註冊")
			})
		})
	})
})

module.exports = router