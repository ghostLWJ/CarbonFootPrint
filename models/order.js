var db = require('../db');
var order = db.Schema({
	id: { type: String, required: true, unique: true },
	useraccount: { type: String, required: true},
	username: { type: String, required: true},
	order: {type: Object, required: true},
	cashtotal: {type: Number, required: true},
	phone: {type: String, required: true},
	mark: {type: String, required: false},
	isCheckout: {type: Boolean, default: false},
	date: { type: Date, default: Date.now }
})
module.exports = db.model('Order', order)