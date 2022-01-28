import asyncHandler from 'express-async-handler'
import Gallery from '../models/galleryModel.js'

const getGalleries = asyncHandler (async (req, res) => {
    const galleries = await Gallery.find({})

    res.json(galleries)
})

const getGalleryById = asyncHandler(async (req, res) => {
    const gallery = await Gallery.findById(req.params.id)
    if (gallery) { 
        res.json(gallery)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const createGalleryReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    const gallery = await Gallery.findById(req.params.id)

    if (gallery) {
        const alreadyReviewd = gallery.reviews.find(r => r.user.toString()
            === req.user._id.toString())
        if (alreadyReviewd) {
            res.status(400)
            throw new Error('Already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        gallery.reviews.push(review)

        gallery.numReviews = gallery.reviews.length

        gallery.rating = gallery.reviews.reduce((acc, item) => item.rating + acc, 0) / gallery.reviews.length

        await gallery.save()
        res.status(201).json({ message: 'review added' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

export {getGalleries, getGalleryById, createGalleryReview}