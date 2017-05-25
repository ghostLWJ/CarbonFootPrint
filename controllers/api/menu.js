var router = require('express').Router()
var Menu = require('../../models/menu')
var fs = require('fs')
var multer = require('multer')

router.get('/', function (req, res, next) {
	Menu.find(function (err, menu) {
		if (err) { return next(err); }
		res.json(menu);
	});
});


router.post('/', function (req, res, next) {
	var path = req.files.image.path
  	var name = req.files.image.name

	var id
	Menu.count(function (err, count) {
		if(err) { return next(err); }
		id = 'A' + (count+1)

		fs.renameSync(path, './img/' + id + '.jpg')

		var menu = new Menu({
			id : id,
			name: req.body.name,
			price: req.body.price,
			imgsrc: id
		})
		menu.save(function (err) {
			if (err){ return next(err) }
			res.redirect(302, '/edit')
		})

	})
})

module.exports = router