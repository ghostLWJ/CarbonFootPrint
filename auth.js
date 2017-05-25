var jwt = require('jwt-simple')
var config = require('./config')

module.exports = function (req, res, next) {
	if(req.headers['authorization']){
		req.auth = jwt.decode(req.headers['authorization'], config.secret)
	}
	next()
}