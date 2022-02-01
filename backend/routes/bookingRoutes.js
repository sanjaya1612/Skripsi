import express from "express";
const router = express.Router()
import {addBookingItems, getBookingById, getBookings, getMyBookings, updateBookingToPaid} from '../controllers/bookingController.js'
import { protect, admin } from "../middleware/authMiddleware.js";

router.route('/').post(protect, addBookingItems).get(protect, admin, getBookings)
router.route('/mybookings').get(protect, getMyBookings)
router.route('/:id').get(protect, getBookingById)
router.route('/:id/pay').put(protect, updateBookingToPaid)   

export default router