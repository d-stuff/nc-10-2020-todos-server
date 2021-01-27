const express = require('express');
const service = require('./todos-service');

const app = express();

app.get('/api/todos', async (req, res) => {
	const filters = {};
	if (req.query.isDone) {
		filters.isDone = req.query.isDone === 'true';
	}
	if (req.query.content) {
		filters.content = req.query.content;
	}

	const todos = await service.getTodos(filters);
	res.json(todos);
});

app.delete('/api/todos/:todoId', async (req, res) => {
	await service.removeTodo(Number(req.params.todoId));
	res.json({ message: 'Todo removed successfully' });
})


app.listen(3000, () => console.log('Listening on http://localhost:3000'));
