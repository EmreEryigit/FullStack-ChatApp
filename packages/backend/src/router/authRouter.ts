import express from "express";
import validateForm from "../controller/validateForm";
const router = express.Router();
import {
    attemptLogin,
    handleLogin,
    register,
} from "../controller/authController";
import { rateLimiter } from "../controller/rateLimiter";

declare module "express-session" {
    export interface SessionData {
        user: { [key: string]: any };
    }
}

router.get("/login", handleLogin);
router.post("/login", validateForm, rateLimiter(30, 5), attemptLogin);
router.post("/register", validateForm, rateLimiter(60, 3),register);

export default router;
