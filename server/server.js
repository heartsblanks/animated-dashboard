// server/server.js
const express = require('express');
const db = require('./db/dbConfig');
const cors = require('cors');
const app = express();

app.use(cors());

// Endpoint to fetch all PAP entries
app.get('/api/paps', (req, res) => {
    db.all('SELECT pap_name FROM PAPS', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows.map(row => row.pap_name));
    });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});