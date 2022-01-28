import express from "express";
const router = express.Router()
import { createGalleryReview, getGalleries, getGalleryById } from '../controllers/galleryController.js'
import { protect, admin } from "../middleware/authMiddleware.js";

router.route('/').get(getGalleries)
router.route('/:id/reviews').post(protect, createGalleryReview)
router.route('/:id').get(getGalleryById) 

export default router 