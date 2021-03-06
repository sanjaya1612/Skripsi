import asyncHandler from 'express-async-handler'
import Gallery from '../models/galleryModel.js'

const getGalleries = asyncHandler (async (req, res) => {
    const keyword = req.query.keyword ? {
        location: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    const galleries = await Gallery.find({ ...keyword })

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

const deleteGallery = asyncHandler(async (req, res) => {
    const gallery = await Gallery.findById(req.params.id)
    if (gallery) {
        await gallery.remove()
        res.json({ message: 'Product removed' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const updateGallery = asyncHandler(async (req, res) => {
    
    const {
        name,  
        image, 
        location, 
        description, 
    } = req.body

    const gallery = await Gallery.findById(req.params.id)

    if(gallery) {
        gallery.name = name
        gallery.image = image
        gallery.location = location
        gallery.description = description
        
        const updatedGallery = await gallery.save()
        res.json(updatedGallery)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }

})

const createGallery = asyncHandler(async (req, res) => {
    const gallery = new Gallery({
        name: 'Sample Name',
        user: req.user._id,
        image: '/images/sample.png',
        location: 'Sample City, Sample Province, Indonesia',
        numReviews: 0,
        description: 'Sample description',
    })

    const createdGallery = await gallery.save()
    res.status(201).json(createdGallery)
})

const getTopGallery = asyncHandler(async (req, res) => {
    const galleries = await Gallery.find({}).sort({ rating: -1 }).limit(3)

    res.json(galleries)
})

export {
    getGalleries, 
    getGalleryById, 
    createGalleryReview, 
    deleteGallery, 
    updateGallery, 
    createGallery,
    getTopGallery
}