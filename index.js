import express from "express";
import dotenv from "dotenv";
import { sqlite } from "./database/config.js";
import { createUser, createUserAdmin, updateUser } from "./controllers/usersController.js";
import { verifikasiUser } from "./middleware/verifikasiUser.js";

if (process.env.NODE_ENV == "production") {
  dotenv.config();
}

const app = express();
app.use(express.json());

app.post("/users/create", createUser)
app.post("/users/createadmin", createUserAdmin)
app.put("/users/:id", verifikasiUser,updateUser);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running di http://localhost:${port}`);
});
