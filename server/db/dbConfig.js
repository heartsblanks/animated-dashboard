// server/db/dbConfig.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to the database
const db = new sqlite3.Database(path.resolve(__dirname, 'database.db'));

module.exports = db;