import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
} from "./controllers/usersController.js";
import { validatedGmail } from "./middleware/validatedGmail.js";
import { validatedData } from "./middleware/validatedData.js";
import { onlyUser } from "./middleware/verifyToken.js";
import dotenv from "dotenv";
import { loginAdmin } from "./controllers/adminController.js";
import { onlyAdmin } from "./middleware/verifyTokenAdmin.js";

console.log("check nilai node env", process.env.NODE_ENV);

if (process.env.NODE_ENV == "production") {
  dotenv.config();
}

const app = express();
app.use(express.json());

app.post("/users", validatedGmail, validatedData, createUser);
app.get("/users", onlyUser, getUsers);
app.get("/users/:id", getUserById);
app.put("/users/:id", updateUser);
app.delete("/users/:id", onlyAdmin, deleteUser);
app.post("/login", login);
app.post("/login/admin", loginAdmin);

// Jalankan server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running di http://localhost:${port}`);
});
