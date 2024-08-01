import Database from 'better-sqlite3';

class DatabaseManager {
  constructor() {
    this.db = new Database('my-database.db', { verbose: console.log });
    this.initialize();
  }

  initialize() {
    // Create a sample table if it doesn't exist
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
      );
    `);
  }

  getAllUsers() {
    return this.db.prepare('SELECT * FROM users').all();
  }

  getUserById(id) {
    return this.db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  }

  createUser(name, email) {
    const insert = this.db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
    return insert.run(name, email);
  }

  updateUser(id, name, email) {
    const update = this.db.prepare('UPDATE users SET name = ?, email = ? WHERE id = ?');
    return update.run(name, email, id);
  }

  deleteUser(id) {
    const deleteUser = this.db.prepare('DELETE FROM users WHERE id = ?');
    return deleteUser.run(id);
  }
}

export default new DatabaseManager();
