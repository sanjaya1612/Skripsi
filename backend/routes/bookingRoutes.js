import express from "express";
const router = express.Router()
import {addBookingItems} from '../controllers/bookingController.js'
import { protect } from "../middleware/authMiddleware.js";

router.route('/').post(protect, addBookingItems)

export default router