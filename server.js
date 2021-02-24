const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const todosRouter = require('./routes/todos');
const { checkUserHeaders, checkExistingUser } = require('./middlewares/auth');
const { connect } = require('./models');

connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todos')
	.then(() => console.log('MONGODB is connected'))
	.catch(() => {
		console.log('MONGODB is not connected');
		process.exit(1);
	});

const app = express();

// middleware example:
app.use(morgan('combined'));
app.use(cors());
app.use(checkUserHeaders);
app.use(checkExistingUser);

app.use(todosRouter);

app.listen(process.env.PORT || 3001, () => console.log('Listening on http://localhost:3001'));
