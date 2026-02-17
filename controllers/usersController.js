import { db } from "../database/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// console.log("CHECK SECRET KEY DARI CONTROLLER ", process.env.BNI_SECRET);

export async function getUsers(req, res) {
  const users = await db.all("SELECT id, name, email FROM users");

  res.json({
    data: users,
  });
}

// READ user by Id

export async function getUserById(req, res) {
  const id = parseInt(req.params.id);

  const user = await db.get("SELECT * FROM users WHERE id = ?", [id]);

  if (!user) {
    return res.status(404).json({
      message: "User tidak ditemukan",
    });
  }

  res.json({
    data: user,
  });
}

//CREATE user

export async function createUser(req, res) {

  const {name, email, username, password, role } = req.body;

  const result = await db.run("INSERT INTO users (name, email, username, password, role) VALUES (?, ?, ?, ?, ?)", [
    name,
    email,
    username,
    password,
    role
  ]);

  res.status(201).json({
    message: "User berhasil dibuat",
    data: {
      id: result.lastID,
      name,
      email,
    },
  });
}

//UPDATE user

export async function updateUser(req, res) {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  const user = await db.get("SELECT * FROM users WHERE id = ?", [id]);
  if (!user) {
    return res.status(404).json({
      message: "User tidak ditemukan",
    });
  }
  const updatedName = name ?? user.name;
  const updatedEmail = email ?? user.email;

  await db.run("UPDATE users SET name = ?, email = ? WHERE id = ?", [
    updatedName,
    updatedEmail,
    id,
  ]);
  res.json({
    message: "User berhasil diupdate",
    data: {
      id,
      name: updatedName,
      email: updatedEmail,
    },
  });
}

// DELETE user

export async function deleteUser(req, res) {
  const id = parseInt(req.params.id);

  const result = await db.run("DELETE FROM users WHERE id = ?", [id]);

  if (result.changes === 0) {
    return res.status(404).json({
      message: "User tidak ditemukan",
    });
  }
  res.json({
    message: "User berhasil dihapus",
  });
}

export async function login(req, res) {
  const { username, password } = req.body;

  if (!username && !password) {
    return res.json("Username dan password wajib diisi");
  }

  const users = await db.get(
    `SELECT * FROM users WHERE username = ? AND password = ?`,
    [username, password]
  );
  
  console.log("CHECK USERS", JSON.stringify(users, null, 3));

  if (username == users.username && password == users.password) {

    const dataToken = { user: users.username, role: users.role }; //payload

    const token = jwt.sign(dataToken, process.env.BNI_SECRET, {
      expiresIn: "1h",
    });
    return res.json({
      token: token,
    });
  } else {
    return res.json("username dan password salah");
  }
}
