const sqlite3 = require('sqlite3').verbose();
const express = require('express')
const cors = require('cors')

const app = express()
const port = 4000


const corsOptions = { origin: 'http://localhost:3000' }
app.use(cors(corsOptions))
app.use(express.json())
 
let db = new sqlite3.Database('./db/pool.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

db.run('CREATE TABLE IF NOT EXISTS players(name TEXT, wins INTEGER)')

app.post('/player', (req, res) => {
  const { name } = req.body
  const sql = `INSERT INTO players(name, wins) VALUES (?, ?)`
  db.run(sql, [name, 0], (err) => {
    if (err) {
      return console.log(err)
    }
    res.send(this)
    })
})

app.get('/players', (req, res) => {
  const sql = `SELECT * FROM players`
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message)
    }

    return res.send(rows)
  })
})

app.listen(port, () => console.log(`Express listening on port ${port}`))