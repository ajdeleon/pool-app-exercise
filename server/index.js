const sqlite3 = require('sqlite3').verbose();
const express = require('express')
const cors = require('cors')

const app = express()
const port = 4000

let corsURL = 'http://localhost:3000'
if (process.env.NODE_ENV === 'production') {
  corsURL = 'https://ajdeleon.xyz'
}
const corsOptions = { origin: corsURL}
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

app.patch('/player', (req, res) => {
  const { name } = req.body
  const sql = `UPDATE players
               SET wins = wins + 1
               WHERE name = ?`

  db.run(sql, [name], (err) => {
    if (err) {
      return console.error(err.message)
    }
    res.send(this)
  })
})

app.delete('/player', (req, res) => {
  const { name } = req.body
  const sql = `DELETE from players WHERE name = ?`
  db.run(sql, [name], (err) => {
    if (err) {
      return console.error(err.message)
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

app.delete('/players', (req, res) => {
  db.run(`DELETE from players`, (err) => {
    if (err) {
      return console.error(err.message)
    }
    res.send('All deleted')
  })
})

app.listen(port, () => console.log(`Express listening on port ${port}`))
