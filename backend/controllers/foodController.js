import asyncHandler from 'express-async-handler'
import Food from '../models/foodModel.js'

const getFoods = asyncHandler( async (req, res) => {
    const foods = await Food.find({})
    res.json(foods)
})

const getFoodById = asyncHandler( async (req, res) => {
    const food = await Food.findById(req.params.id)
    if(food){
        res.json(food)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})

export {
    getFoods,
    getFoodById
}