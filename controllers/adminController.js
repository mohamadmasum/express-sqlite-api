import jwt from "jsonwebtoken";
import { db } from "../database/db.js";



export async function loginAdmin(req, res) {
  const { username, password, role } = req.body;
  console.log("check username: ", username);
  console.log("check password: ", password);
  console.log("check role: ", role);
  const users = await db.get(
      `SELECT * FROM users WHERE username = ? AND password = ? AND role = ?`,
      [username, password, role]
    );

  if (username != users.username) {
    return res.json("username tidak sesuai");
  }

  if (password != users.password) {
    return res.json("password role tidak sesuai");
  }

  if (role != users.role) {
    return res.json("role tidak sesuai");
  }

  const dataToken = { username, role: "admin" };
  const token = jwt.sign(dataToken, process.env.BNI_SECRET, {
    expiresIn: "1h",
  });
  return res.json({
    token: token,
  });
}
