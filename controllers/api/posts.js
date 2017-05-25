var Post = require('../../models/post');
var router = require('express').Router();
var websockets = require('../../websockets');

router.get('/', function (req, res, next) {
	Post.find(function (err, posts) {
		if (err) { return next(err); }
		res.json(posts);
	});
});

router.post('/', function (req, res, next) {
	// console.log('post received!');
	// console.log(req.body.username);
	// console.log(req.body.body);
	// res.send(201);
	var post = new Post({ body: req.body.body })
	post.username = req.body.username
	post.save(function (err, post) {
		if (err) { return next(err) }
		websockets.broadcast('new_post', post)
		res.status(201).json(post)
	})
})

module.exports = router;