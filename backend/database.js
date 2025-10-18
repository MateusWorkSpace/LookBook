const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function openDb() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      whatsappNumber TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      stripe_customer_id TEXT,
      subscription_status TEXT DEFAULT 'free'
    );

    CREATE TABLE IF NOT EXISTS lookbooks (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      createdAt TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS lookbook_items (
      id TEXT PRIMARY KEY,
      lookbook_id TEXT NOT NULL,
      imageUrl TEXT NOT NULL,
      name TEXT NOT NULL,
      price TEXT,
      FOREIGN KEY (lookbook_id) REFERENCES lookbooks(id) ON DELETE CASCADE
    );
  `);

  return db;
}

module.exports = { openDb };
