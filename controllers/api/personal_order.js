var Order = require('../../models/order');
var User = require('../../models/user');
var router = require('express').Router();

router.get('/:useraccount', function (req, res, next) {
	Order.find({useraccount: req.params.useraccount}).exec(function (err, order) {
		if (err) { return next(err) }
		if (!order) { return res.send(401) }
			res.send(order)
	})
});

module.exports = router;