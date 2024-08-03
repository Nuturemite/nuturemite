import express from 'express';
import isAuth from '../middlewares/auth.js';
import {getCurrentUser, login, register, registerVendor} from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/vendor/register',registerVendor);
router.get('/me', isAuth, getCurrentUser);

export default router;

