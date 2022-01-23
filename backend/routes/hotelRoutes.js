import express from "express";
const router = express.Router()
import { createHotel, createHotelReview, deleteHotel, getHotelById, getHotels, updateHotel } from '../controllers/hotelController.js'
import { protect, admin } from "../middleware/authMiddleware.js";

router.route('/').get(getHotels).post(protect, admin, createHotel)
router.route('/:id/reviews').post(protect, createHotelReview)
router.route('/:id').get(getHotelById).delete(protect, admin, deleteHotel).put(protect, admin, updateHotel)

export default router