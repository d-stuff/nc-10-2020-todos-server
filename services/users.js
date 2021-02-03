require('../file-db')
const { getData, setData } = require('../file-db');

const USERS_PATH = 'users.json';

async function addUser(user) {
	const users = await getData(USERS_PATH);
	const newUserId = users[users.length - 1].id + 1;
	const newUser = { ...user, id: newUserId };
	users.push(newUser);
	await setData(USERS_PATH, users);
	return newUser;
}

async function removeUser(userId) {
	const users = await getData(USERS_PATH);
	const filteredUsers = users.filter(user => user.id !== userId);
	await setData(USERS_PATH, filteredUsers);
}

async function updateUser(userId, changes = {}) {
	const users = await getData(USERS_PATH);

	const user = users.find(user => user.id === userId);
	Object.assign(user, changes);

	await setData(USERS_PATH, users);

	return user;
}

async function getUser(userId) {
	const users = await getData(USERS_PATH);
	return users.find(user => user.id === userId);
}

module.exports = {
	addUser,
	removeUser,
	updateUser,
	getUser
}
