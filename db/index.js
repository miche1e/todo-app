const { Client } = require('pg');
const client = new Client({
    connectionString: 'postgresql://localhost/todo_database'
});

client.connect();

module.exports = client;