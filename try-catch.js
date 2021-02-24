let obj = {}

try {
	obj.a = 5;
	console.log('first line')

	obj.a = 6
	console.log('next line');
} catch (e) {
	console.log('error:', e.message);
} finally {
	console.log('finished', obj);
}

Promise.resolve(obj)
	.then(obj => {
		obj.run();
		return obj;
	})
	.catch((e) => {
		console.log('promise error:', e.message);
	})
	.finally(() => {
		console.log('promise finished');
	});
