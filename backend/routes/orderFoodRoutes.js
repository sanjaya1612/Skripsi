import express from "express";
const router = express.Router()
import {
    addFoodItems,
    getFoodById,
    updateFoodToPaid,
    updateFoodTodelivered,
    getMyFoods,
    getFoods
} from '../controllers/orderFoodController.js'
import { protect, admin } from "../middleware/authMiddleware.js";

router.route('/').post(protect, addFoodItems).get(protect, admin, getFoods)
router.route('/myfoods').get(protect, getMyFoods)
router.route('/:id').get(protect, getFoodById)
router.route('/:id/pay').put(protect, updateFoodToPaid)
router.route('/:id/deliver').put(protect, admin, updateFoodTodelivered)


export default router 