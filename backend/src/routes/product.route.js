import express from 'express';
import isAuth from '../middlewares/auth.js';
import { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';

const router = express.Router();

router.post('/', isAuth, createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.put('/:id', isAuth, updateProduct);
router.delete('/:id', isAuth, deleteProduct);

export default router;
