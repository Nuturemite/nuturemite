import express from 'express';
import isAuth  from '../middlewares/auth.js';
import { createBrand, getAllBrands, getBrand, updateBrand, deleteBrand } from '../controllers/brand.controller.js';

const router = express.Router();

router.post('/', isAuth, createBrand);
router.get('/', getAllBrands);
router.get('/:id', getBrand);
router.put('/:id', isAuth, updateBrand);
router.delete('/:id', isAuth, deleteBrand);

export default router;
