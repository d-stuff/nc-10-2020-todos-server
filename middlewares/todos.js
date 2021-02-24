const { getTodo } = require('../services/todos');

const checkTodoPermissions = async (req, res, next) => {
	const todo = await getTodo(req.params.todoId, req.user._id);
	if (todo) {
		req.todo = todo;
		next();
	} else {
		res.status(403).json({ message: 'you do not have permissions to this operation' })
	}
}

module.exports = { checkTodoPermissions }
