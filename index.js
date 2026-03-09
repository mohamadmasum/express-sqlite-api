import express from "express";
import dotenv from "dotenv";
import { sqlite } from "./database/config.js";
import { createUser, createUserAdmin, deleteUser, getUser, updateUser } from "./controllers/usersController.js";
import { verifikasiUser } from "./middleware/verifikasiUser.js";
import { loginUser } from "./controllers/loginController.js";

if (process.env.NODE_ENV == "production") {
  dotenv.config();
}

const app = express();
app.use(express.json());
// app.use(verifikasiUser);

app.post("/login", loginUser)
app.get("/users", getUser)
app.post("/users/create", createUser)
app.post("/users/createadmin", createUserAdmin)
app.put("/users/:id", verifikasiUser, updateUser);
app.delete("/users/:id", deleteUser)

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running di http://localhost:${port}`);
});
