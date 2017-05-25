var db = require('../db');
var position = db.Schema({
	useraccount: { type: String, required: true },
	latitude: {type: String, required: true },
	longitude: {type: String, required: true },
	moving: {type: String, required: true },
	date: { type: Date, default: Date.now }
})
module.exports = db.model('Position', position)