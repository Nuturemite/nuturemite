import express from 'express';
import isAuth from '../middlewares/auth.js';
import { createCategory, getAllCategories, getCategory, updateCategory, deleteCategory } from '../controllers/category.controller.js';

const router = express.Router();

router.post('/', isAuth, createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategory);
router.put('/:id', isAuth, updateCategory);
router.delete('/:id', isAuth, deleteCategory);

export default router;
