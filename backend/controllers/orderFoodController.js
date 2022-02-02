import asyncHandler from 'express-async-handler'
import OrderFood from '../models/orderFoodModel.js'

const addFoodItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        fullName,
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
            fullName,
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
    const order = await OrderFood.findById(req.params.id).populate('user','name email')

    if(order){
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Food not found')
    }
})

const updateFoodToPaid = asyncHandler(async (req, res) => {
    const order = await OrderFood.findById(req.params.id)

    if(order){
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updatedFoodOrder = await order.save()

        res.json(updatedFoodOrder)
    } else {
        res.status(404)
        throw new Error('Food not found')
    }
})

const updateFoodTodelivered = asyncHandler(async (req, res) => {
    const order = await OrderFood.findById(req.params.id)

    if(order){
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedFoodOrder = await order.save()

        res.json(updatedFoodOrder)
    } else {
        res.status(404)
        throw new Error('Food not found')
    }
})

const getMyFoods = asyncHandler(async (req, res) => {
    const orders = await OrderFood.find({ user: req.user._id})
    res.json(orders)
})

const getFoods = asyncHandler(async (req, res) => {
    const keydate = req.query.keydate ? {
        fullName: {
            $regex: req.query.keydate,
            $options: 'i'
        }
    } : {}
    const orders = await OrderFood.find({ ...keydate }).populate('user', 'id name')
    res.json(orders)
    console.log(keydate)
})
export { addFoodItems, getFoodById, updateFoodToPaid, getMyFoods, getFoods, updateFoodTodelivered}