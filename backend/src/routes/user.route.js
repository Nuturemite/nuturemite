import express from 'express';
import { getUserProfile, updateUserProfile,getAllUsers, updateUser } from '../controllers/user.controller.js';
import isAuth from '../middlewares/auth.js';

const router = express.Router();

router.put('/profile', isAuth, updateUserProfile);
router.get('/me', isAuth, getUserProfile);
router.get('/', getAllUsers);
router.put('/:id', isAuth, updateUser);
export default router;
