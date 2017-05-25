var router = require('express').Router();
var Order = require('../../models/order');
var User = require('../../models/user');

router.get('/:id', function (req, res, next) {
	Order.findOne({id: req.params.id})
	.exec(function (err, order) {
		if (err) { return next(err) }
		if (!order) { return res.send(401) }
		res.status(201).json(order)
	})
});

router.post('/', function (req, res, next) {
	User.findOne({useraccount: req.body.useraccount}, function (err, user) {
		if (err) { return next(err) }
		res.status(201).json(user)
	})
})

module.exports = router
