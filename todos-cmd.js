require('./todo-model')

module.exports = function runCommand([ a, b, action, value ]) {

	console.log(action, value);

}
