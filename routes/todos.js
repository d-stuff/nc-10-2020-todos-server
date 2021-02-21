const { Router } = require('express');
const service = require('../services/todos');
const bodyParser = require('body-parser');
const { checkTodoPermissions } = require('../middlewares/todos');

const jsonParser = bodyParser.json();
const todosRouter = Router();

todosRouter.get('/api/todos', async (req, res) => {
	const filters = {
		user: req.user._id
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

todosRouter.delete('/api/todos/:todoId', checkTodoPermissions, async (req, res) => {
	await service.removeTodo(req.todo.id);
	res.json({ message: 'Todo removed successfully' });
});

todosRouter.post('/api/todos', jsonParser, async (req, res) => {
	const newTodo = await service.addTodo({ ...req.body, user: req.user._id });
	res.json(newTodo);
});

todosRouter.put('/api/todos/:todoId', checkTodoPermissions, jsonParser, async (req, res) => {
	const updatedTodo = await service.updateTodo(req.todo.id, { ...req.body, userId: req.user.id });
	res.json(updatedTodo);
});

module.exports = todosRouter;
