const usersService = require('../services/users');

const checkUserHeaders = (req, res, next) => {
	if (req.headers.userId) {
		req.userId = Number(req.headers.userId);
		next();
	} else {
		res.status(401).json({ message: 'please provide user header' });
	}
}

const checkExistingUser = async (req, res, next) => {
	req.user = await usersService.getUser(req.userId);
	if (req.user) {
		next();
	} else {
		res.status(401).json({ message: 'User is not recognized' });
	}
}

module.exports = {
	checkUserHeaders,
	checkExistingUser
}
