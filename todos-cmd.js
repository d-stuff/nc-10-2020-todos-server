const service = require('./services/todos');

module.exports = function runCommand([ _, __, action, value = '', extraValue ]) {
	switch (action) {
		case 'get':
			printFilteredTodos(value);
			break;
		case 'delete':
			deleteTodo(value);
			break;
		case 'add':
			addTodo(value, extraValue);
			break;
		case 'done':
			setTodoDone(value, true);
			break;
		case 'undone':
			setTodoDone(value, false);
			break;
	}
}

async function printFilteredTodos(filterString) {
	const filters = {};
	if (filterString.includes('done')) {
		filters.isDone = true;
	}
	if (filterString.includes('open')) {
		filters.isDone = false;
	}
	if (!('isDone' in filters) && filterString) {
		filters.content = filterString
	}

	const todos = await service.getTodos(filters);

	console.table(todos);
}

async function deleteTodo(id) {
	await service.removeTodo(Number(id));
	console.log("Item deleted successfully!");
}

async function addTodo(content, extra) {
	const newTodo = await service.addTodo({ content, isDone: extra === 'done' });

	console.table([ newTodo ]);
}

async function setTodoDone(id, isDone) {
	const updatedTodo = await service.updateTodo(Number(id), { isDone });
	console.table([ updatedTodo ]);
}
