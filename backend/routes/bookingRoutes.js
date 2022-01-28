import express from "express";
const router = express.Router()
import {addBookingItems, getBookingById, getMyBookings, updateBookingToPaid} from '../controllers/bookingController.js'
import { protect } from "../middleware/authMiddleware.js";

router.route('/').post(protect, addBookingItems)
router.route('/mybookings').get(protect, getMyBookings)
router.route('/:id').get(protect, getBookingById)
router.route('/:id/pay').put(protect, updateBookingToPaid)  

export default router