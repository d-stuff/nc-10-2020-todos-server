require('../file-db')
const { getData, setData } = require('../file-db');

const TODOS_PATH = 'todos.json';

async function addTodo(todo) {
	const todos = await getData(TODOS_PATH);
	const newTodoId = todos[todos.length - 1].id + 1;
	const newTodo = { ...todo, id: newTodoId };
	todos.push(newTodo);
	await setData(TODOS_PATH, todos);

	return newTodo;
}

async function removeTodo(todoId) {
	const todos = await getData(TODOS_PATH);
	const filteredTodos = todos.filter(todo => todo.id !== todoId);
	await setData(TODOS_PATH, filteredTodos);
}

async function updateTodo(todoId, changes = {}) {
	const todos = await getData(TODOS_PATH);

	const todo = todos.find(todo => todo.id === todoId);
	Object.assign(todo, changes);

	await setData(TODOS_PATH, todos);

	return todo;
}

async function getTodos(filters = {}) {
	const todos = await getData(TODOS_PATH);

	return todos.filter(todo => {
		let result = true;
		if ('isDone' in filters) {
			result = todo.isDone === filters.isDone;
		}
		if (result && 'content' in filters) {
			result = new RegExp(filters.content, 'i').test(todo.content);
		}
		if (result && 'id' in filters) {
			result = todo.id === filters.id;
		}
		if (result && 'userId' in filters) {
			result = todo.userId === filters.userId;
		}

		return result;
	});
}

module.exports = {
	addTodo,
	removeTodo,
	updateTodo,
	getTodos
}
