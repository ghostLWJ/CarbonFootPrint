var router = require('express').Router();
var User = require('../../../models/user')
var bcrypt = require('bcrypt')

router.post('/', function (req, res, next) {
	User.findOne({useraccount: req.body.useraccount})
		.select('password').select('useraccount')
		.exec(function (err, user) {
			if (err) { return next(err) }
			if (!user) { return res.send(401) }
			bcrypt.compare(req.body.password, user.password, function (err, valid) {
				if (err) { return next(err) }
				if (!valid) {return res.send(401) }
				res.status(200).send(req.body.useraccount + " 您好")
			})
		})
})

module.exports = router