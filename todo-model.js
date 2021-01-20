require('./file-db')
const { getData, setData } = require('./file-db');

const TODOS_PATH = 'todos.json';

async function addTodo(todo) {
	const todos = await getData(TODOS_PATH);
	todos.push(todo);
	await setData(TODOS_PATH, todos);
}

async function removeTodo(todoId) {
	const todos = await getData(TODOS_PATH);
	const filteredTodos = todos.filter(todo => todo.id !== todoId);
	await setData(TODOS_PATH, filteredTodos);
}


module.exports = {
	addTodo,
	removeTodo
}
