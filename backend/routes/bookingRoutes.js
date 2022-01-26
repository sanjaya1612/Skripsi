import express from "express";
const router = express.Router()
import {addBookingItems, getBookingById, updateBookingToPaid} from '../controllers/bookingController.js'
import { protect } from "../middleware/authMiddleware.js";

router.route('/').post(protect, addBookingItems)
router.route('/:id').get(protect, getBookingById)
router.route('/:id/pay').put(protect, updateBookingToPaid) 

export default router