const User = require('../models/user');

function getUser(userId) {
	return User.findById(userId)
}

module.exports = {
	getUser
}
