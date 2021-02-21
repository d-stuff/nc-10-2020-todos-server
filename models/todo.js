const { Schema, model } = require('mongoose');

const ObjectId = Schema.ObjectId;
const TodoSchema = new Schema({
	content: {
		type: String,
		required: true
	},
	isDone: {
		type: Boolean,
		default: () => false
	},
	user: {
		type: ObjectId,
		ref: 'user',
	},
	created: {
		type: Date,
		default: Date.now
	},
	updated: Date
});

const Todo = model('Todo', TodoSchema);

module.exports = Todo;
