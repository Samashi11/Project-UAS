import express from "express";
import { createTaskAdmin, deleteTask, getTaskById, getTasks, updateTaskAdmin, updateTaskUser } from "../controllers/TaskController.js";

const router = express.Router();

router.get('/task',getTasks);
router.get('/task/:id',getTaskById);
router.post('/task',createTaskAdmin);
// router.patch('/task/:id',updateTaskUser);
router.patch('/task/edit/:id',updateTaskAdmin);
router.delete('/task/:id',deleteTask);

export default router;
