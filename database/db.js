import sqlite3 from "sqlite3";
import { open } from "sqlite";

// buka koneksi database
export const db = await open({
  filename: "./database/users.db",
  driver: sqlite3.Database,
});

// buat tabel kalau belum ada
await db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    role VARCHAR NOT NULL

  )
`);

// await db.exec(`
//   ALTER TABLE users
// ADD COLUMN role VARCHAR(100)  NULL
// `);


console.log("Database SQLite siap digunakan");
