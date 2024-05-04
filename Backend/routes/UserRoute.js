import express from "express";
import { createUser, deleteUser, getUserById, getUserByRole, getUsers, updateUser, userLogin } from "../controllers/UserController.js";


const router = express.Router();

router.get('/users',getUsers);
router.get('/users/:id',getUserById);
router.get('/users/role/:role',getUserByRole);
router.post('/users',createUser);
router.patch('/users/:id',updateUser);
router.delete('/users/:id',deleteUser);
router.post('/login',userLogin);


export default router;