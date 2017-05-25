var Order = require('../../models/order');
var router = require('express').Router();

router.get('/:useraccount', function (req, res, next) {
	Order.find({useraccount: req.params.useraccount}).exec(function (err, orders) {
		if (err) { return next(err) }
		if (!orders) { return res.send(401) }
			res.send(orders)
	})
});

module.exports = router;