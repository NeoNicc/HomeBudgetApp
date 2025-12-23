require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Read CA file safely so the server doesn't crash if the file is missing.
let sslOption;
try {
    const ca = fs.readFileSync('./ca.pem');
    sslOption = { rejectUnauthorized: true, ca };
} catch (err) {
    console.warn('ca.pem not found or unreadable — continuing without CA file:', err.message);
    sslOption = undefined;
}

const db = mysql.createConnection ({
    host: process.env.DB_HOST,
    port: 24986,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ...(sslOption ? { ssl: sslOption } : {})
});

db.connect(err => {
    if (err) {
        console.error('CONNECTION ERROR:', err.message);
        return;
    }
    console.log('connected to aiven MySQL');
    db.query('SELECT VERSION()', (err, rows) => {
        if (err) console.log('Query Error:', err);
        else console.log('database version:', rows[0]);
    });
});


app.post('/add-receipt', (req, res) => {
    const { description, cost, category, location, date } = req.body;
    const sql = 'INSERT INTO RECEIPTENTRY (DESCRIPTION, COST, CATEGORY, LOCATION, RECEIPT_DATE) VALUES (?, ?, ?, ?, ?)';

    db.query(sql, [description, cost, category, location, date], (err, result) => {
        if (err) {
            console.error('DATABASE ERROR:', err);
            return res.status(500).send(err);
        }
        res.send({ message: 'Data saved successfully!' });
    });
});

app.get('/get-item', (req, res) => {
    const sql = 'SELECT DESCRIPTION, COST, CATEGORY, LOCATION, RECEIPT_DATE FROM RECEIPTENTRY ORDER BY CATEGORY';

    db.query(sql, (err, results) => {
        if (err) {
            console.error("error fetching receipt items:", err);
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Health check route to confirm the server is reachable.
app.get('/', (req, res) => res.send('Server is up'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));