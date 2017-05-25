var Position = require('../../models/position');
var router = require('express').Router();

router.get('/:useraccount', function (req, res, next) {
	Position.find({useraccount: req.params.useraccount}).exec(function (err, positions) {
		if (err) { return next(err) }
		if (!positions) { return res.send(401) }
			res.send(positions)
	})
});

module.exports = router;