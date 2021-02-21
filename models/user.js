const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
	username: String,
	password: String,
	firstName: String,
	lastName: String,
	bio: String,
	created: Date
});

const User = model('User', UserSchema);

module.exports = User;
