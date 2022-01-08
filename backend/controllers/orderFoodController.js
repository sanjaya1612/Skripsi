import asyncHandler from 'express-async-handler'
import OrderFood from '../models/orderFoodModel.js'

const addFoodItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
        return
    } else {
        const orderFood = new OrderFood({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createdFoodOrder = await orderFood.save()

        res.status(201).json(createdFoodOrder)
    }
})

const getFoodById = asyncHandler(async (req, res) => {
    const order = await OrderFood.findById(req.params.id).populate('user', 'name email')
    if(order){
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Food not found')
    }
})

export { addFoodItems, getFoodById}