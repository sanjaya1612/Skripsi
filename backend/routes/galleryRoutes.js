import express from "express";
const router = express.Router()
import { createGallery, createGalleryReview, deleteGallery, getGalleries, getGalleryById, updateGallery } from '../controllers/galleryController.js'
import { protect, admin } from "../middleware/authMiddleware.js";

router.route('/').get(getGalleries).post(protect, admin, createGallery)
router.route('/:id/reviews').post(protect, createGalleryReview)
router.route('/:id').get(getGalleryById).delete(protect, admin, deleteGallery).put(protect, admin, updateGallery)  
 
export default router 