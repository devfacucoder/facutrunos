import { Router } from "express";
import * as ctrlAuth from "../controllers/auth.ctrl.js"
const authRoutes = Router();
authRoutes.post("/login",ctrlAuth.login)

export default authRoutes;
