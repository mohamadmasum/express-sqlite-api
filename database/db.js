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
    email TEXT NOT NULL
  )
`);

console.log("Database SQLite siap digunakan");
