import asyncHandler from 'express-async-handler'
import Order from '../models/OrderModel.js'

const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        date,
        phoneNum,
        paymentMethod,
        itemPrice,
        taxPrice,
        totalPrice,
    } = req.body

    const order = new Order({
        orderItems,
        user: req.user._id,
        date,
        phoneNum,
        paymentMethod,
        itemPrice,
        taxPrice,
        totalPrice,
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
})

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user','name email')

    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})
export { addOrderItems,getOrderById}
// // const addOrderItems = asyncHandler(async (req, res) => {
// //     const {
// //         orderItems,
// //         paymentMethod,
// //         itemPrice,
// //         taxPrice,
// //         totalPrice,
// //         userId
// //     } = req.body

//     // const order = await Order.create({
//     //     orderItems,
//     //     paymentMethod,
//     //     itemPrice,
//     //     taxPrice,
//     //     totalPrice,
//     //     userId
//     // })
//     console.log("bawah")
//     if(order) {
//         res.status(201).json({
//             _id: order._id,
//             orderItems: order.orderItems,
//             paymentMethod: order.paymentMethod,
//             itemPrice: order.itemPrice,
//             taxPrice : order.taxPrice,
//             totalPrice: order.totalPrice,
//             userId : order.userId
//         })
//         console.log("Masuk")
//     }else{
//         res.status(400)
//         throw new Error('Invalid data')
//     }
//     // if (orderItems && orderItems.length === 0) {
//     //     res.status(400)
//     //     throw new Error('No order items')
//     //     return
//     // } else {
//     //     const order = new Order({
//     //         orderItems,
//     //         paymentMethod,
//     //         itemPrice,
//     //         taxPrice,
//     //         totalPrice,
//     //         userId
//     //     })
//     //     console.log(orderItems + paymentMethod + itemPrice + taxPrice + totalPrice + userId)
//     //     // const order1 = await Order.create({
//     //     //     totalPrice,
//     //     //     taxPrice,

//     //     // })
//     //     const createdOrder = await Order.create()
//     //     if(createdOrder){
//     //     res.status(201).json({

//     //     })
//     // }
//     // }
// })

