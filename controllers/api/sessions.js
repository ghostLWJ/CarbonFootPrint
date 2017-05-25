var router = require('express').Router()
var User = require('../../models/user')
var bcrypt = require('bcrypt')
var jwt = require('jwt-simple')
var config = require('../../config')
var moment = require('moment')

router.post('/', function (req, res, next) {
	// console.log('sessions received!')
	// console.log(req.body.useraccount)
	// console.log(req.body.password)
	User.findOne({useraccount: req.body.useraccount})
		.select('password').select('useraccount')
		.exec(function (err, user) {
			if (err) { return next(err) }
			if (!user) { return res.send(401) }
			bcrypt.compare(req.body.password, user.password, function (err, valid) {
				if (err) { return next(err) }
				if (!valid) {return res.send(401) }
				var expires = moment().add(5, 'hours').format('YYYYMMDDHHMM')
				var token = jwt.encode({
					useraccount: user.useraccount,
					exp: expires
				}, config.secret)
				// var decoded = jwt.decode(token, config.secret);
				// console.log(expires)
				// console.log(decoded)
				// console.log(decoded.exp)
				// var st =moment(decoded.exp, "YYYYMMDDHHMM").fromNow()
				// console.log(moment('201508160200', "YYYYMMDDHHMM").fromNow())
				// console.log(st)
				res.send(token)
			})
		})
})

module.exports = router