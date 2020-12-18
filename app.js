const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const todoRoutes = require('./routes');

app.use(bodyParser.json());
app.use('/todo', todoRoutes);
app.listen(3000, () => {
    console.log('Go to http://localhost:3000/');
});