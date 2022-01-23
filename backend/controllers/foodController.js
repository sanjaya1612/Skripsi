import asyncHandler from 'express-async-handler'
import Food from '../models/foodModel.js'

const getFoods = asyncHandler(async (req, res) => {
    const pageSize = 12
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const count = await Food.countDocuments({ ...keyword })
    const foods = await Food.find({ ...keyword }).limit(pageSize).skip(pageSize * (page -1))
    res.json({ foods, page, pages: Math.ceil(count / pageSize) })
})

const getFoodById = asyncHandler(async (req, res) => {
    const food = await Food.findById(req.params.id)
    if (food) {
        res.json(food)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const deleteFood = asyncHandler(async (req, res) => {
    const food = await Food.findById(req.params.id)
    if (food) {
        await food.remove()
        res.json({ message: 'Food removed' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const createFood = asyncHandler(async (req, res) => {
    const food = new Food({
        name: 'Sample Name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.png',
        province: 'Sample province',
        city: 'Sample city',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
        details: 'Sample destination',
    })

    const createdFood = await food.save()
    res.status(201).json(createdFood)
})

const updateFood = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        province,
        city,
        countInStock,
        details
    } = req.body

    const food = await Food.findById(req.params.id)

    if (food) {
        food.name = name
        food.price = price
        food.description = description
        food.image = image
        food.province = province
        food.city = city
        food.countInStock = countInStock
        food.details = details

        const updatedFood = await food.save()
        res.status(201).json(updatedFood)
    } else {
        res.status(404)
        throw new Error('Food not found') 
    }

})

const createFoodReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    const food = await Food.findById(req.params.id)

    if (food) {
        const alreadyReviewed = food.reviews.find(r => r.user.toString() === req.user._id.toString())
        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        food.reviews.push(review)

        food.numReviews = food.reviews.length

        food.rating = 
        food.reviews.reduce((acc, item) => item.rating + acc, 0) / food.reviews.length

        await food.save()
        res.status(201).json({ message: 'review added' })
    } else {
        res.status(404)
        throw new Error('Food Not Found')
    }
})

const getTopFoods = asyncHandler(async (req, res) => {
    const foods = await Food.find({}).sort({ rating: -1}).limit(4)

    res.json(foods)
})

export {
    getFoods,
    getFoodById,
    createFoodReview,
    deleteFood,
    createFood,
    updateFood,
    getTopFoods
}