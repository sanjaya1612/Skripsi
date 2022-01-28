import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


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
        name: 'sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.png',
        category: 'sample category',
        destination: 'sample',
        city: 'sample',
        itinerary1: '',
        itinerary2: '',
        itinerary3: '',
        itinerary4: '',
        itinerary5: '',
        countInStock: 0,
        numReviews: 0,
        description: 'sample'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        itinerary1,
        itinerary2,
        itinerary3,
        itinerary4,
        itinerary5,
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
        product.itinerary1 = itinerary1
        product.itinerary2 = itinerary2
        product.itinerary3 = itinerary3
        product.itinerary4 = itinerary4
        product.itinerary5 = itinerary5
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

const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1}).limit(4)

    res.json(products)
})

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts
}