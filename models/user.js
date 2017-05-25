var db = require('../db')
var user = db.Schema({
	username: { type: String, required: true },
	useraccount: { type: String, required: true, unique: true},
	password: { type: String, required: true, select: false },
	sex: {type: String, required: true, select: false },
	phone: {type: String, required: true, select: false},
	email: { type: String, required: true, select: false },
	address: { type: String, required: true, select: false},
	born: {type: Date, required: true, select: false},
	point: {type: Number, required:true, default: 0},
	auth:{type: String, required:true ,default:"user" },
	date: { type: Date, default: Date.now }
})
module.exports = db.model('User', user)
