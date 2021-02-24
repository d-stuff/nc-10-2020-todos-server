const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
	username: String,
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		validate: [
			(email = '') => {
				return email.includes('@');
			},
			'email is not a valid email address'
		],
	},
	password: String,
	firstName: String,
	lastName: String,
	bio: String,
	created: Date
});

const User = model('User', UserSchema);

module.exports = User;
