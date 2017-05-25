var router = require('express').Router();
var Position = require('../../../models/position')
var bcrypt = require('bcrypt')

router.post('/', function (req, res, next) {
	// console.log("RECE")
	// console.log(req.body.ac)
	// console.log(req.body.lon)
	// console.log(req.body.lat)
	// console.log(req.body.moving)
	var position = new Position({
			useraccount: req.body.ac,
			latitude: req.body.lat,
			longitude: req.body.lon,
			moving: req.body.moving
		})
	position.save(function (err) {
				if (err) { return next(err) }
				res.status(200).send(req.body.ac + "成功將位置存至資料庫")
			})
})

module.exports = router