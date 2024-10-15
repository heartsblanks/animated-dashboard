// server/db/dbConfig.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Path to the database file inside the Docker container
const db = new sqlite3.Database(path.resolve('/app/database.db'));

module.exports = db;