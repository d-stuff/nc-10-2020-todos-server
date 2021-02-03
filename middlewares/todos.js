const { getTodo } = require('../services/todos');

const checkTodoPermissions = async (req, res, next) => {
	const todo = await getTodo(Number(req.params.todoId));
	if (todo && todo.userId === req.user.id) {
		req.todo = todo;
		next();
	} else {
		res.status(403).json({ message: 'you do not have permissions to this operation' })
	}
}

module.exports = { checkTodoPermissions }
