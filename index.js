import express from "express";
import { db } from "./database/db.js";

const app = express();
app.use(express.json());


app.get("/", (req, res) => {
  res.json({
    message: "Hello, REST API!",
    status: "success"
  });
});


/**
 * CREATE User
 * POST /users
 */

app.post("/users", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: "name dan email wajib di isi",
    });
  }

  const result = await db.run(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email]
  );

  res.status(201).json({
    message: "User berhasil dibuat",
    data: {
      id: result.lastID,
      name,
      email,
    },
  });
});


/**
 * READ Semua User
 * GET /users
 */
app.get("/users", async (req, res) =>{
  const users = await db.all("SELECT * FROM users");

  res.json({
    data: users,
  });
});

/**
 * READ User by ID
 * GET /users/:id
 */

app.get("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const user = await db.get(
    "SELECT * FROM users WHERE id = ?",
    [id]
  );

  if (!user) {
    return res.status(404).json({
      message: "User tidak ditemukan",
    });
  }

  res.json({
    data: user,
  });
});

/**
 * UPDATE User
 * PUT /users/:id
 */

app.put("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  const user = await db.get(
    "SELECT * FROM users WHERE id = ?",
    [id]
  );

  if (!user) {
    return res.status(404).json({
      message: "User tidak ditemukan",
    });
  }

  const updatedName = name ?? user.name;
  const updatedEmail = email ?? user.email;

  await db.run(
    "UPDATE users SET name = ?, email = ? WHERE id = ?",
    [updatedName, updatedEmail, id]
  );

  res.json({
    message: "User berhasil diupdate",
    data: {
      id,
      name: updatedName,
      email: updatedEmail,
    },
  });
});

/**
 * DELETE User
 * DELETE /users/:id
 */

app.delete("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const result = await db.run(
    "DELETE FROM users WHERE id = ?",
    [id]
  );

  if (result.changes === 0) {
    return res.status(404).json({
      message: "User tidak ditemukan",
    });
  }

  res.json({
    message: "User berhasil dihapus",
  });
});

// Jalankan server

const PORT = 3000;
app.listen(PORT, () =>{
  console.log(`Server running di http://localhost:${PORT}`);
});