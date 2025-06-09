const express = require("express");
const cors = require("cors")
const app = express();
const port = process.env.PORT || 10000;

const corsoptions = {

}

app.use(cors(corsoptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//wyslanie html do klienta
app.get("/", (req, res) => res.type('html').send(html));

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

//pobieranie html z pliku
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'app.html'), 'utf-8');

const { Pool } = require('pg');

// Połączenie z bazą
const pool = new Pool({
  connectionString: process.env.LINKINT,
  ssl: {
    rejectUnauthorized: false
  }
});


app.get('/get-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT * from ra');
    res.send(result.rows);
  } catch (err) {
    console.log('Tablica nie istnieje, tworze tablice')
    try{
      const result = await pool.query(`CREATE TABLE ra (
         id SERIAL PRIMARY KEY,
         nazwa TEXT NOT NULL,
         cena DOUBLE PRECISION NOT NULL,
         ilosc INTEGER NOT NULL
         );`)
      res.status(200).send("Tabela zostala stworzona");
    }catch(err){
    console.error('Błąd zapytania:', err);
    res.status(500).send('Błąd połączenia z bazą danych');
    }
  }
});


app.post('/add-db', async (req, res) => {
  const { nazwa, ilosc, cena } = req.body;
  if (!nazwa || !ilosc || !cena ) {
    return res.status(400).send('Brakuje danych: nazwa, ilosc lub cena ');
  }
    try{
      const result = await pool.query('INSERT INTO ra (nazwa, ilosc, cena) VALUES ($1, $2, $3)',
      [nazwa, ilosc, cena ])
      res.status(200).send("przedmiot zostal dodany");
    }catch(err){
    console.error('Błąd zapytania:', err);
    res.status(500).send('Błąd połączenia z bazą danych');
    }
});


app.put('/update-db', async (req, res) => {
  const { id } = req.query;
  const { nazwa, ilosc, cena } = req.body;

  if (!id || !nazwa || !ilosc || !cena) {
    return res.status(400).send('Brakuje danych: id, nazwa, ilosc lub cena');
  }

  try {
    const result = await pool.query(
      'UPDATE ra SET nazwa = $1, ilosc = $2, cena = $3 WHERE id = $4',
      [nazwa, ilosc, cena, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).send('Nie znaleziono rekordu o podanym ID');
    }

    res.status(200).send('Przedmiot został zaktualizowany');
  } catch (err) {
    console.error('Błąd zapytania:', err);
    res.status(500).send('Błąd połączenia z bazą danych');
  }
});



app.delete('/del-db', async (req, res) => {
  const id = req.query.id;
  if (!owner || !tytul || !zawartosc) {
    return res.status(400).send('Brakuje danych: tytul lub zawartosc');
  }
    try{
      const result = await pool.query('DELETE FROM todo WHERE id = $1', [id])
      if (result.rowCount === 0) {
      return res.status(404).send('Rekord nie znaleziony');
      }
      res.status(200).send("przedmiot zostal usuniety");
    }catch(err){
    console.error('Błąd zapytania:', err);
    res.status(500).send('Błąd połączenia z bazą danych');
    }
});