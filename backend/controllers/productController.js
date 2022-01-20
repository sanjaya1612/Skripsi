import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import { protect, admin } from "../middleware/authMiddleware.js";

const getProducts = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    const products = await Product.find({...keyword})
    res.json(products)
})

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({ message: 'Product removed' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample Name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.png',
        category: 'Sample category',
        destination: 'Sample destination',
        city: 'Sample city',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        category,
        destination,
        city,
        countInStock } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.category = category
        product.destination = destination
        product.city = city
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Activity not found')
    }

})

const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id)

    if (product) {
        const alreadyReviewd = product.reviews.find(r => r.user.toString()
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

        product.reviews.push(review)

        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save()
        res.status(201).json({ message: 'review added' })
    } else {
        res.status(404)
        throw new Error('Activity not found')
    }
})

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview
}