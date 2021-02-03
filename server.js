const express = require('express');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const service = require('./services/todos');
const { checkUserHeaders, checkExistingUser } = require('./middlewares/auth');

const app = express();

// middleware example:
app.use(checkUserHeaders);
app.use(checkExistingUser);

app.get('/api/todos', async (req, res) => {
	const filters = {
		userId: req.user.id
	};
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
});

app.post('/api/todos', jsonParser, async (req, res) => {
	const newTodo = await service.addTodo(req.body);
	res.json(newTodo);
});

app.put('/api/todos/:todoId', jsonParser, async (req, res) => {
	const updatedTodo = await service.updateTodo(Number(req.params.todoId), req.body);
	res.json(updatedTodo);
});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));
