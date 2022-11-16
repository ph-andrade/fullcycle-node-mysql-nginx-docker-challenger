const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

let connection;

async function createConnection() {
  if (connection) return;
  connection = await mysql.createConnection(config);
}

async function insertOnDatabase(name) {
  await createConnection();
  await connection.execute(`INSERT INTO people (name) VALUES ('${name}')`);
}

async function getAllPeople() {
  await createConnection();
  const [ rows ] = await connection.execute('SELECT * FROM people');
  return rows;
}

app.get('/', async (req, res) => {
  const name = req.query?.name || 'Fulano';
  await insertOnDatabase(name);

  const people = await getAllPeople();
  let htmlListPeople = '';
  people.forEach(person => htmlListPeople = htmlListPeople + `<li>${person.name}</li>`)

  res.send(`<h1>Full Cycle Rocks!</h1><p>You can add a different name when you send it on query params. Example: "http://localhost:3000/?name=AnotherName"</p><ul>${htmlListPeople}</ul>`)
});

app.listen(port, () => {
  console.log('Rodando na porta ' + port);
})
