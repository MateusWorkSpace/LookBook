const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function openDb() {
  return open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });
}

async function initializeDb(db) {
  const userSchema = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      whatsappNumber TEXT NOT NULL
    );
  `;

  const lookbookSchema = `
    CREATE TABLE IF NOT EXISTS lookbooks (
      id TEXT PRIMARY KEY NOT NULL,
      userId INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      createdAt TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  const itemsSchema = `
    CREATE TABLE IF NOT EXISTS lookbook_items (
      id TEXT PRIMARY KEY NOT NULL,
      lookbookId TEXT NOT NULL,
      imageUrl TEXT NOT NULL,
      name TEXT,
      price TEXT,
      FOREIGN KEY (lookbookId) REFERENCES lookbooks(id) ON DELETE CASCADE
    );
  `;

  await db.exec(userSchema);
  await db.exec(lookbookSchema);
  await db.exec(itemsSchema);
  console.log("Database initialized successfully.");
}

module.exports = { openDb, initializeDb };