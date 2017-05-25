var router = require('express').Router();
var Order = require('../../models/order');
var User = require('../../models/user');
var websockets = require('../../websockets');

router.get('/', function (req, res, next) {
	Order.find(function (err, orders) {
		if (err) { return next(err); }
		res.json(orders);
	});
});

router.post('/', function (req, res, next) {
	User.findOne({useraccount: req.body.useraccount}).select('phone').exec(function (err, user) {
		if(err) { return next(err) }
		if (!user) { return res.send(401) }

		var id
		Order.count(function (err, count) {
			if(err) { return next(err); }
			id = 'O' + (count+1)
			
			var cart = req.body
			var order = new Order({
				id: id,
				useraccount: req.body.useraccount,
				username: req.body.username,
				phone: user.phone,
				order: req.body.order,
				cashtotal: req.body.cashtotal,
				mark: req.body.mark
			})
			order.save(function (err, order) {
				if(err){ return next(err) }
				websockets.broadcast('new_order', order)
				res.status(201).json(order)
			})
		})

		
	})
})

module.exports = router
