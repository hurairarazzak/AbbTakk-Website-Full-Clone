import express from "express";
import { adminLogin } from "../controllers/adminController.js";

const router = express.Router();

// Login route
router.post("/login", adminLogin);

export default router;
