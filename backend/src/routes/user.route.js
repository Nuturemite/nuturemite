import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/user.controller.js';
import isAuth from '../middlewares/auth.js';

const router = express.Router();

router.put('/profile', isAuth, updateUserProfile);
router.get('/me', isAuth, getUserProfile);

export default router;
