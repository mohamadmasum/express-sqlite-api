import { Router } from "express";
import { loginUser } from "../controllers/loginController";
import { createUser, createUserAdmin, deleteUser, getUser, updateUser } from "../controllers/usersController";
import { verifikasiUser } from "../middleware/verifikasiUser";

const router = new Router();

router.post("/login", loginUser)
router.get("/users", getUser)
router.post("/users/create", createUser)
router.post("/users/createadmin", createUserAdmin)
router.put("/users/:id", verifikasiUser, updateUser);
router.delete("/users/:id", deleteUser)

export default router;