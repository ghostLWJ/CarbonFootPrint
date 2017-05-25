var config = require('../../config')
var jwt = require('jwt-simple')

module.exports = function (req, res, next) {
	if (!req.headers['authorization']) {
		return res.redirect('/')
	}
	try{
		var auth = jwt.decode(req.headers['authorization'], config.secret)
		if(auth.exp <= Date.now()){
			res.end('Access token has expired', 400);
		}
	}catch(err){
		return next()
	}
	next()
}