require('../file-db')
const Todo = require('../models/todo');

function addTodo(todo) {
	const newTodo = new Todo(todo);
	return newTodo.save();
}

function getTodos(filters = {}) {
	const query = {};
	if ('isDone' in filters) {
		query.isDone = filters.isDone;
	}
	if ('content' in filters) {
		query.content = new RegExp(filters.content, 'i');
	}
	if ('user' in filters) {
		query.user = filters.user;
	}

	return Todo.find(query);
}

function getTodo(todoId, userId) {
	return Todo.findOne({ _id: todoId, user: userId });
}

module.exports = {
	addTodo,
	getTodos,
	getTodo
}
