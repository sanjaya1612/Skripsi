import express from "express";
const router = express.Router()
import {addFoodItems, getFoodById } from '../controllers/orderFoodController.js'
import { protect } from "../middleware/authMiddleware.js";

router.route('/').post(protect, addFoodItems)
router.route('/:id').get(protect, getFoodById)


export default router 