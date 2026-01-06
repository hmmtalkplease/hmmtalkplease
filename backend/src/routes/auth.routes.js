import express from "express";

import {
  userRegister,
  userLogin,
  listenerRegister,
  listenerLogin,
  logout
} from "../controllers/auth.controller.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();

// USER
router.post("/user/register", userRegister);
router.post("/user/login", userLogin);

// LISTENER
router.post("/listener/register", listenerRegister);
router.post("/listener/login", listenerLogin);

// LOGOUT
router.post("/logout", auth, logout);

export default router;
