var db = require('../db');
var menu = db.Schema({
	id: { type: String, required: true, unique: true },
	name: { type: String, required: true},
	price: { type: String, required: true},
	imgsrc: {type: String, required: true},
	date: { type: Date, default: Date.now },
	quantity: {type: Number, default: 0}
})
module.exports = db.model('Menu', menu)