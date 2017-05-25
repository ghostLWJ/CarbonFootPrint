var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/carbonfootprint', function () {
	console.log('mongodb connected');
});
module.exports = mongoose;